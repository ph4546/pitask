import { initEndPoint, query } from '/lib/api-helpers'
import {
  checkTaskStatusIsChangeableByExecutor, checkTaskDecisionIsChangeableByExecutor
} from '/lib/api-database-helpers'

export default async function handler(request, response) {
  await initEndPoint(request, response, async (userId, { taskId, decision }) => {
    if (!await checkTaskStatusIsChangeableByExecutor(taskId, userId)) {
      return { error: 'userDoesNotHavePermissionToEditTaskDecision' }
    }

    if (!await checkTaskDecisionIsChangeableByExecutor(taskId, userId)) {
      return { error: 'userMustMarkTaskAsNewOrInProgressToEditTaskDecision' }
    }

    const decisionId = await getDecisionId(taskId, userId)
    if (decisionId == null) {
      const { insertId } = await query(`
        INSERT INTO Decision(ID_Task, TaskText) VALUES (?, ?);`,
        [taskId, decision])
      await query(`
        UPDATE Task SET ID_Decision = ? WHERE ID_Task = ? AND ID_Customer = ?;`,
        [insertId, taskId, userId])
    } else {
      await query(`
        UPDATE Decision SET TaskText = ? WHERE ID_Decision = ?;`,
        [decision, decisionId])
    }

    return { ok: {} }
  })
}

async function getDecisionId(taskId, userId) {
  const results = await query(`
    SELECT ID_Decision AS decisionId FROM Task WHERE ID_Task = ? AND ID_Customer = ? LIMIT 1;`,
    [taskId, userId])
  if (results.length < 1)
    return null
  return results[0].decisionId
}