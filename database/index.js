const { Pool } = require('pg')
const user = process.env.DBUSER
const password = process.env.PASSWORD
const host = process.env.DBHOST
const database = process.env.DBDATABASE
const port = process.env.DBPORT

//Define properites for database
const pool = new Pool({
  //user: user,
  //host: host,
  //database: database,
  //password: password,
  //port: port,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})


pool.connect()

//export query
module.exports = {
  query: (text, params) => pool.query(text, params),
}
