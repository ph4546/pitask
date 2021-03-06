import { initEndPoint, query } from '/lib/api-helpers'
import { checkUserIsAdmin, checkUserIsExecutor } from '/lib/api-database-helpers'

export default initEndPoint(async (userId, { projectId, taskName, taskDescription, deadline, executorId }) => {
  if (userId == undefined) {
    return { error: 'userNotLoggedIn' }
  }

  if (!await checkUserIsAdmin(projectId, userId)) {
    return { error: 'userDoesNotHavePermissionToAddTask' }
  }

  if (!await checkUserIsExecutor(projectId, executorId)) {
    return { error: 'executorIsNotMemberOfThisProject' }
  }

  const { insertId } = await query(`
    INSERT INTO Task(ID_Project, Task_txt, Comment, Data_over, ID_Customer) VALUES (?, ?, ?, ?, ?);`,
    [projectId, taskName, taskDescription, deadline, executorId])
  return { ok: { taskId: insertId } }
})