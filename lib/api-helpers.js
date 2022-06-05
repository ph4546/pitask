require('dotenv').config()
const mysql = require('mysql2/promise')


export function executeData(request, response, callback) {
  response.status(200).json(callback(request.body))
}


/// Example of api handler:
/// ```
/// await initEndPoint(request, response, async (userId, { a, b }) => {
///   var data = await query('SELECT ? AS number, ? AS string;', [a, b])
///   return { ok: data }
///   // return { error: 'errorNameForFrontend' }
/// })
/// ```
/// where `a` and `b` are parameters sent from the frontend.
export async function initEndPoint(request, response, callback) {
  if (request.method !== 'POST') {
    return response.status(405).json({ msg: 'Method must be POST' });
  }
  var results;
  try {
    results = await callback(1, request.body)
  } catch {
    return response.status(400).json({ msg: 'Fatal error' })
  }
  response.status(200).send(results)
}


export async function query(sql, params) {
  const connection = await mysql.createConnection(process.env.DATABASE_URL)
  var [results, fields] = await connection.execute(sql, params)
  return results
}