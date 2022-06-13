import { query } from '/lib/api-helpers'

export async function checkUserIsOwner(projectId, userId) {
  const results = await query(`
    SELECT 1 FROM Project WHERE ID_Project = ? AND ID_Client = ? LIMIT 1;`,
    [projectId, userId])
  return results.length > 0
}

export async function checkUserIsAdmin(projectId, userId) {
  const results = await query(`
    SELECT 1 FROM Team WHERE ID_Project = ? AND ID_Client = ? AND ID_Role = 1 LIMIT 1;`,
    [projectId, userId])
  return results.length > 0
}

export async function checkUserIsExecutor(projectId, userId) {
  const results = await query(`
    SELECT 1 FROM Team WHERE ID_Project = ? AND ID_Client = ? AND ID_Role = 2 LIMIT 1;`,
    [projectId, userId])
  return results.length > 0
}

export async function checkUserHasAlreadyBeenInvited(projectId, userId) {
  if (await checkUserIsOwner(projectId, userId))
    return true;

  const results = await query(`
    SELECT 1 FROM Team WHERE ID_Project = ? AND ID_Client = ? LIMIT 1;`,
    [projectId, userId])
  return results.length > 0
}

export async function checkAdminIsExist(projectId) {
  const results = await query(`
    SELECT COUNT(*) count FROM Team WHERE ID_Project = ? AND ID_Role = 1;`,
    [projectId])
  return results[0].count > 0
}

export async function checkTaskStatusIsChangeableByExecutor(taskId, userId) {
  const results = await query(`
    SELECT 1 FROM Task WHERE ID_Task = ? AND ID_Customer = ? AND ID_Status BETWEEN 1 AND 3 LIMIT 1;`,
    [taskId, userId])
  return results.length > 0
}

// This result is nullable
export async function getTaskProject(taskId) {
  const results = await query(`
    SELECT ID_Project AS projectId FROM Task WHERE ID_Task = ?;`,
    [taskId])
  if (results.length == 0)
    return null;

  return results[0].projectId
}

export async function checkTaskDecisionIsChangeableByExecutor(taskId, userId) {
  const results = await query(`
    SELECT 1 FROM Task WHERE ID_Task = ? AND ID_Customer = ? AND ID_Status BETWEEN 1 AND 2 LIMIT 1;`,
    [taskId, userId])
  return results.length > 0
}

export async function checkUserIsRegistered(email) {
  const results = await query(`
    SELECT 1 AS id FROM Client WHERE Email=? LIMIT 1;`,
    [email])
  return results.length > 0
}