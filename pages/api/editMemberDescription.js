import { initEndPoint, query } from '/lib/api-helpers'
import { checkUserIsOwner, checkUserIsAdmin } from '/lib/api-database-helpers'

export default async function handler(request, response) {
  await initEndPoint(request, response, async (userId, { projectId, memberId, memberDescription }) => {
    if (!(await checkUserIsOwner(projectId, userId) || await checkUserIsAdmin(projectId, userId) || userId == memberId)) {
      return { error: 'userDoesNotHavePermissionToChangeThisMemberDescription' }
    }

    await query(`
      UPDATE Team SET Description = ? WHERE ID_Project = ? AND ID_Client = ?;`,
      [memberDescription, projectId, memberId])
    return { ok: {} }
  })
}