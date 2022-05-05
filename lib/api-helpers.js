require('dotenv').config()
const mysql = require('mysql2') // может убрать приравнивание и вызывать модуль mysql2 напрямую?

try {  
  const connection = mysql.createConnection(process.env.DATABASE_URL)
} catch {

}

export function executeData(request, response, callback) {
  response.status(200).json(callback(request.body))
}

export function executeDataBase(request, response, callback) {  
  if(request.method !== 'POST') {
    return response.status(405).json({ msg: 'Method must be POST' });
  }  
  const [ query, params ] = callback(request.body)
  connection.execute(
    query,
    params,
    function(error, results, fields) {
      if(fields == undefined) {
        // For insert and update queries
        response.status(200).send({})
      } else {
        // For select queries
        response.status(200).send(results)
      }
    }
  )
}