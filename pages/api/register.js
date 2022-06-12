import { initEndPoint, query } from '/lib/api-helpers'
import { checkUserIsRegistered } from '/lib/api-database-helpers'

export default initEndPoint(async (userId, { email, password }) => {
  if (await checkUserIsRegistered()) {
    return { error: 'userAlreadyRegistered' }
  }

  const { insertId } = await query(`
    INSERT INTO Client(Email, Password) VALUES (?, ?);`,
    [email, password])
  return { ok: { userId: insertId } }
})