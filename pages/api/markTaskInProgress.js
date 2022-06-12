import { initEndPoint, query } from '/lib/api-helpers'
import { checkTaskStatusIsChangeableByExecutor } from '/lib/api-database-helpers'

export default initEndPoint(async (userId, { taskId }) => {
  if (userId == undefined) {
    return { error: 'userNotLoggedIn' }
  }

  if (!await checkTaskStatusIsChangeableByExecutor(taskId, userId)) {
    return { error: 'userDoesNotHavePermissionToChangeTaskStatus' }
  }

  await query(`
    UPDATE Task SET ID_Status = 2 WHERE ID_Task = ?;`,
    [taskId])
  return { ok: {} }
})