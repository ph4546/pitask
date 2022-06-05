import { initEndPoint, query } from '/lib/api-helpers'

export default async function handler(request, response) {
  await initEndPoint(request, response, async (userId, { searchText }) => {
    const results = await query(`
      SELECT
        Project.ID_Project AS projectId,
        Project.Project_name AS projectName
      FROM Project
      JOIN
        (SELECT ID_Project AS projectId FROM Team WHERE ID_Client = ? AND ID_Role BETWEEN 1 AND 2
        UNION
        SELECT ID_Project AS projectId FROM Project WHERE ID_Client = ?) AS availableProjects
        ON availableProjects.projectId = Project.ID_Project
      WHERE Project.Project_name LIKE CONCAT('%', ?, '%');`,
      [userId, userId, searchText])
    return {
      ok: { projects: results }
    }
  })
}