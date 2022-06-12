import { initEndPoint, query } from '/lib/api-helpers'
import { checkUserIsOwner, checkUserIsAdmin, getTaskProject } from '/lib/api-database-helpers'

export default initEndPoint(async (userId, { taskId }) => {
  if (userId == undefined) {
    return { error: 'userNotLoggedIn' }
  }

  const projectId = await getTaskProject(taskId)
  if (projectId == null) {
    return { error: 'taskIsNotExist' }
  }

  if (!(await checkUserIsOwner(projectId, userId) || await checkUserIsAdmin(projectId, userId))) {
    return { error: 'userDoesNotHavePermissionToDeleteTasks' }
  }

  await query(`
    DELETE FROM Task WHERE ID_Task = ?;`,
    [taskId])
  return { ok: {} }
})