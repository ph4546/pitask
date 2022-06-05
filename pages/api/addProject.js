import { initEndPoint, query } from '/lib/api-helpers'

export default async function handler(request, response) {
  await initEndPoint(request, response, async (userId, { projectName, projectDescription }) => {
    const { insertId } = await query(`
      INSERT Project(ID_Client, Project_name, Project_description) VALUES (?, ?, ?);`,
      [userId, projectName, projectDescription])
    return { ok: { projectId: insertId } }
  })
}