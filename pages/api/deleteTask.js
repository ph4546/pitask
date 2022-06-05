import { initEndPoint, query } from '/lib/api-helpers'
import { checkUserIsOwner, checkUserIsAdmin, getTaskProject } from '/lib/api-database-helpers'

export default async function handler(request, response) {
  await initEndPoint(request, response, async (userId, { taskId }) => {
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
}