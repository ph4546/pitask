import { initEndPoint, query } from '/lib/api-helpers'
import { checkUserIsOwner } from '/lib/api-database-helpers'

export default initEndPoint(async (userId, { projectId }) => {
  if (userId == undefined) {
    return { error: 'userNotLoggedIn' }
  }

  if (!await checkUserIsOwner(projectId, userId)) {
    return { error: 'userDoesNotHavePermissionToDeleteProject' }
  }

  await query(`
    DELETE FROM Project WHERE ID_Project = ?`,
    [projectId])
  return { ok: {} }
})