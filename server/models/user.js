const db = require('../../database')
const pgp = require('pg-promise')()

//modules that will query the database
//called from services

module.exports = class UserModel {
  async create(data) {
    try {
      //format query
      const query = pgp.helpers.insert(data, null, 'users') + 'RETURNING *'
      //query to create user in database
      const result = await db.query(query)

      //check that the insert was complete
      if (result) {
        return result.rows[0]
      }
      return null
    } catch (err) {
      throw new Error(err)
    }
  }

  async update(data) {
    try {
      //set format for query
      const query = pgp.helpers.update(data, null, 'users') + 'RETURNING *'

      //query to update user
      const result = await db.query(query)
      if (result) {
        return result.rows[0]
      }
      return null
    } catch (err) {
      throw new Error(err)
    }
  }

  async findByEmail(email) {
    try {
      // format statement
      const query = 'SELECT * FROM users WHERE email = $1'
      const values = [email] // <- not sure why the []
      //query to find user by email
      const result = await db.query(query, values)
      if (result) {
        return result.rows[0]
      }
      return null
    } catch (err) {
      throw new Error(err)
    }
  }

  async findById(id) {
    try {
      const query = 'SELECT * FROM users WHERE id = $1'
      const id = [id]
      const result = await db.query(query, values)
      if (result) {
        return result.rows[0]
      }
      return null
    }catch (err) {
      
    }
  }
}
