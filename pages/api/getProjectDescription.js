import { initEndPoint, query } from '/lib/api-helpers'
import { checkUserIsOwner, checkUserIsAdmin, checkUserIsExecutor } from '/lib/api-database-helpers'

export default initEndPoint(async (userId, { projectId }) => {
  if (userId == undefined) {
    return { error: 'userNotLoggedIn' }
  }

  const userIsOwner = await checkUserIsOwner(projectId, userId)
  const userIsAdmin = await checkUserIsAdmin(projectId, userId)
  const userIsExecutor = await checkUserIsExecutor(projectId, userId)

  if (!(userIsOwner || userIsAdmin || userIsExecutor)) {
    return { error: 'userDoesNotHavePermissionToOpenThisProject' }
  }

  const results = await query(`
    SELECT Project_description AS description FROM Project WHERE ID_Project = ?;`,
    [projectId])
  if (results.length < 1) {
    return { error: 'projectNotFound' }
  }
  return {
    ok: { description: results[0].description }
  }
})