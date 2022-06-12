import { initEndPoint, query } from '/lib/api-helpers'
import { checkUserIsOwner } from '/lib/api-database-helpers'

// projectName, projectDescription is nullable
export default initEndPoint(async (userId, { projectId, projectName, projectDescription }) => {
  if (userId == undefined) {
    return { error: 'userNotLoggedIn' }
  }

  if (!await checkUserIsOwner(projectId, userId)) {
    return { error: 'userDoesNotHavePermissionToChangeProjectAttributes' }
  }

  const values = [
    ['Project_name', projectName],
    ['Project_description', projectDescription]]
    .filter(([attr, x]) => x != null)
  const sqlConditions = values
    .map(([attr, x]) => `${attr} = ?`)
    .join(', ')
  const sqlParams = values
    .map(([attr, x]) => x)
    .concat([projectId, userId])

  await query(`
    UPDATE Project SET ${sqlConditions} WHERE ID_Project = ? AND ID_Client = ?;`,
    sqlParams)
  return { ok: {} }
})