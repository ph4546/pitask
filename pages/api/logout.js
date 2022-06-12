import { withSessionRoute, initEndPoint } from '/lib/api-helpers'

export default initEndPoint(async (userId, { }, session) => {
  session.destroy()
  return { ok: {} }
})