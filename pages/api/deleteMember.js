import { initEndPoint, query } from '/lib/api-helpers'
import { checkUserIsOwner, checkUserIsAdmin } from '/lib/api-database-helpers'

export default initEndPoint(async (userId, { projectId, deletedUserId }) => {
  if (userId == undefined) {
    return { error: 'userNotLoggedIn' }
  }

  if (!(await checkUserIsOwner(projectId, userId) || await checkUserIsAdmin(projectId, userId))) {
    return { error: 'userDoesNotHavePermissionToDeleteMembers' }
  }

  if (await checkUserIsOwner(projectId, deletedUserId)) {
    return { error: 'userCannotBeDeleted' }
  }

  await query(`
    DELETE FROM Team WHERE ID_Project = ? AND ID_Client = ?;`,
    [projectId, deletedUserId])
  return { ok: {} }
})