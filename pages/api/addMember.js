import { initEndPoint, query } from '/lib/api-helpers'
import {
  checkUserIsOwner, checkUserIsAdmin, checkUserHasAlreadyBeenInvited, checkAdminIsExist
} from '/lib/api-database-helpers'

export default initEndPoint(async (userId, { projectId, email, addedUserIsAdmin }) => {
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

  const addedUserId = await getUserId(email)
  if (addedUserId == null) {
    return { error: 'userWithThisEmailNotFound' }
  }

  if (addedUserIsAdmin && await checkAdminIsExist(projectId)) {
    return { error: 'onlyOneAdminAllowed' }
  }

  if (userId == addedUserId || await checkUserHasAlreadyBeenInvited(projectId, addedUserId)) {
    return { error: 'newMemberHasAlreadyBeenAdded' }
  }

  await query(`
    INSERT INTO Team(ID_Project, ID_Client, ID_Role) VALUES(?, ?, ?);`,
    [projectId, addedUserId, addedUserIsAdmin ? 1 : 2])
  return { ok: {} }
})


// Return is nullable
async function getUserId(email) {
  const results = await query(`
    SELECT ID_Client AS userId FROM Client WHERE email = ? LIMIT 1;`,
    [email])
  if (results.length < 1) {
    return null
  }
  return results[0].userId
}