import { initEndPoint, query } from '/lib/api-helpers'

export default async function handler(request, response) {
  await initEndPoint(request, response, async (userId, { email, password }) => {
    const results = await query(`
      SELECT ID_Client AS userId FROM Client WHERE Email = ? AND Password = ? LIMIT 1;`,
      [email, password])
    if (results.length < 1) {
      return { error: 'emailOrPasswordIsIncorrect' }
    }
    const enteredUserId = results[0].userId

    return { ok: {} }
  })
}