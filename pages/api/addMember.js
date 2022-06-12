import { initEndPoint } from '/lib/api-helpers'
import {
  checkUserIsOwner, checkUserIsAdmin, checkUserHasAlreadyBeenInvited, checkAdminIsNotUniqueness
} from '/lib/api-database-helpers'

export default initEndPoint(async (userId, { projectId, addedUserId, addedUserIsAdmin }) => {
  if (userId == undefined) {
    return { error: 'userNotLoggedIn' }
  }

  const userIsOwner = await checkUserIsOwner(projectId, userId)
  const userIsAdmin = await checkUserIsAdmin(projectId, userId)

  if (!(userIsOwner || userIsAdmin)) {
    return { error: 'userDoesNotHavePermissionToAddMembers' }
  }

  if (addedUserIsAdmin && !userIsOwner) {
    return { error: 'userDoesNotHavePermissionToAddAdmin' }
  }

  if (await checkUserHasAlreadyBeenInvited(projectId, addedUserId)) {
    return { error: 'newMemberHasAlreadyBeenAdded' }
  }

  if (addedUserIsAdmin && await checkAdminIsNotUniqueness(projectId)) {
    return { error: 'onlyOneAdminAllowed' }
  }

  await query(`
    INSERT INTO Team(ID_Project, ID_Client, ID_Role) VALUES(?, ?, ?);`,
    [projectId, addedUserId, addedUserIsAdmin ? 1 : 2])
  return { ok: {} }
})