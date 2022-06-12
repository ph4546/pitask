import { initEndPoint, query } from '/lib/api-helpers'

export default initEndPoint(async (userId, { projectName, projectDescription }) => {
  if (userId == undefined) {
    return { error: 'userNotLoggedIn' }
  }

  const { insertId } = await query(`
    INSERT Project(ID_Client, Project_name, Project_description) VALUES (?, ?, ?);`,
    [userId, projectName, projectDescription])
  return { ok: { projectId: insertId } }
})