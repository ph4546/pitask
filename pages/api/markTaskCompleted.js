import { initEndPoint, query } from '/lib/api-helpers'
import { checkTaskStatusIsChangeableByExecutor } from '/lib/api-database-helpers'

export default async function handler(request, response) {
  await initEndPoint(request, response, async (userId, { taskId }) => {
    if (!await checkTaskStatusIsChangeableByExecutor(taskId, userId)) {
      return { error: 'userDoesNotHavePermissionToChangeTaskStatus' }
    }

    await query(`
      UPDATE Task SET ID_Status = 3 WHERE ID_Task = ?;`,
      [taskId])
    return { ok: {} }
  })
}