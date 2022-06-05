import { initEndPoint, query } from '/lib/api-helpers'
import { checkUserIsOwner, checkUserIsAdmin, checkUserIsExecutor } from '/lib/api-database-helpers'

export default async function handler(request, response) {
  await initEndPoint(request, response, async (userId, { projectId }) => {
    const userIsOwner = await checkUserIsOwner(projectId, userId)
    const userIsAdmin = await checkUserIsAdmin(projectId, userId)
    const userIsExecutor = await checkUserIsExecutor(projectId, userId)

    if (!(userIsOwner || userIsAdmin || userIsExecutor)) {
      return { error: 'userDoesNotHavePermissionToOpenThisProject' }
    }

    return {
      ok: {
        owner: await getProjectOwner(projectId),
        admin: await getProjectAdmin(projectId),
        executors: await getProjectExecutors(projectId)
      }
    }
  })
}

async function getProjectOwner(projectId) {
  return await query(`
      SELECT
        Project.ID_Client AS id,
        Client.NameLog AS name,
        Team.Description AS description,
        '/profilePurple.svg' AS avatar
      FROM Project
        JOIN Client ON Client.ID_Client = Project.ID_Client
        JOIN Team ON Team.ID_Client = Project.ID_Client
      WHERE Project.ID_Project = ?;`,
    [projectId])
}

async function getProjectAdmin(projectId) {
  return await query(`
    SELECT
      Team.ID_Client AS id,
      Client.NameLog AS name,
      Team.Description AS description,
      '/profilePurple.svg' AS avatar
    FROM Team
      JOIN Client ON Client.ID_Client = Team.ID_Client
    WHERE Team.ID_Project = ? AND Team.ID_Role = 1;`,
    [projectId])
}

async function getProjectExecutors(projectId) {
  return await query(`
    SELECT
      Team.ID_Client AS id,
      Client.NameLog AS name,
      Team.Description AS description,
      '/profilePurple.svg' AS avatar
    FROM Team
      JOIN Client ON Client.ID_Client = Team.ID_Client
    WHERE Team.ID_Project = ? AND Team.ID_Role = 2;`,
    [projectId])
}