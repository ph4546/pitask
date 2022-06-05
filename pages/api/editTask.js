import { initEndPoint, query } from '/lib/api-helpers'
import { checkUserIsAdmin, getTaskProject } from '/lib/api-database-helpers'

// taskName, taskDescription, deadline, executorId is nullable
export default async function handler(request, response) {
  await initEndPoint(request, response, async (userId, { taskId, taskName, taskDescription, deadline, executorId }) => {
    const projectId = await getTaskProject(taskId)
    if (projectId == null) {
      return { error: 'taskIsNotExist' }
    }

    if (!await checkUserIsAdmin(projectId, userId)) {
      return { error: 'userDoesNotHavePermissionToChangeTaskAttributes' }
    }

    const values = [
      ['Task_txt', taskName],
      ['Comment', taskDescription],
      ['Data_over', deadline],
      ['ID_Customer', executorId]]
      .filter(([attr, x]) => x != null)
    const sqlConditions = values
      .map(([attr, x]) => `${attr} = ?`)
      .join(', ')
    const sqlParams = values
      .map(([attr, x]) => x)
      .concat([projectId])

    await query(`
      UPDATE Task SET ${sqlConditions} WHERE ID_Project = ?;`,
      sqlParams)
    return { ok: {} }
  })
}