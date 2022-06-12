import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '/lib/session'
require('dotenv').config()
const mysql = require('mysql2/promise')


/// Example of api handler:
/// ```
/// import { initEndPoint, query } from '/lib/api-helpers'
/// export default initEndPoint(async (userId, { a, b }) => {
///   var data = await query('SELECT ? AS number, ? AS string;', [a, b])
///   return { ok: data }
///   // return { error: 'errorNameForFrontend' }
/// })
/// ```
/// where `a` and `b` are parameters sent from the frontend.
export function initEndPoint(callback) {
  return withIronSessionApiRoute(async (request, response) => {
    if (request.method !== 'POST') {
      return response.status(405).json({ msg: 'Method must be POST' });
    }
    var results;
    try {
      const userId = typeof request.session.user == typeof undefined ? undefined : request.session.user.id
      results = await callback(userId, request.body, request.session)
    } catch {
      return response.status(400).json({ msg: 'Fatal error' })
    }
    response.status(200).send(results)
  }, sessionOptions)
}


export async function query(sql, params) {
  const connection = await mysql.createConnection(process.env.DATABASE_URL)
  var [results, fields] = await connection.execute(sql, params)
  return results
}