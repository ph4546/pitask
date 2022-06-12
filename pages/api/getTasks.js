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

  const sqlExecutorCondition = userIsExecutor ? `AND ID_Customer = ?` : ``

  const newTasks = await query(`
      SELECT ID_Task AS id, Task_txt AS name, Data_over AS deadline
      FROM Task
      WHERE (ID_Project = ? ${sqlExecutorCondition} AND ID_Status = 1);`,
    userIsExecutor ? [projectId, userId] : [projectId])

  const inProgressTasks = await query(`
      SELECT ID_Task AS id, Task_txt AS name, Data_over AS deadline
      FROM Task
      WHERE (ID_Project = ? ${sqlExecutorCondition} AND ID_Status = 2);`,
    userIsExecutor ? [projectId, userId] : [projectId])

  const completedTasks = await query(`
      SELECT ID_Task AS id, Task_txt AS name, Data_over AS deadline
      FROM Task
      WHERE (ID_Project = ? ${sqlExecutorCondition} AND ID_Status = 3);`,
    userIsExecutor ? [projectId, userId] : [projectId])

  return { ok: { newTasks, inProgressTasks, completedTasks } }
})