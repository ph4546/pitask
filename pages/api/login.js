import { initEndPoint, query } from '/lib/api-helpers'

export default initEndPoint(async (userId, { email, password }, session) => {
  const results = await query(`
    SELECT ID_Client AS userId FROM Client WHERE Email = ? AND Password = ? LIMIT 1;`,
    [email, password])
  if (results.length < 1) {
    return { error: 'emailOrPasswordIsIncorrect' }
  }
  const enteredUserId = results[0].userId

  session.user = {
    id: enteredUserId
  }
  await session.save()

  return { ok: { userId: enteredUserId } }
})