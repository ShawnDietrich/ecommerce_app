const db = require('../database')
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
      const values = [email]
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

  async findById(userid) {
    try {
      const query = 'SELECT * FROM users WHERE id = $1'
      const id = [userid]
      const result = await db.query(query, id)
      if (result) {
        return result.rows[0]
      }
      return null
    }catch (err) {

    }
  }

  async storeSession(data) {
    try {
      const query = pgp.helpers.insert(data, null, 'sessions') + 'RETURNING *'
      const result = await db.query(query)
      if(result.rowCount > 0){
        return result.rows[0]
      }
    }catch (err) {
      throw new Error(err)
    }
  }

  async getSession(sessionID) {
    try {
      const query = 'SELECT * FROM sessions WHERE "sessionID" = $1'
      
      const result = await db.query(query, [sessionID])
      if (result.rowCount > 0) {
        return true
      }else return false
    }catch (err) {
      
      throw new Error(err)
    }
  }

  async logOutSession(sessionID) {
    const query = 'DELETE FROM sessions WHERE "sessionID" = $1'
   try{
    const result = await db.query(query, [sessionID])
    return true
   }catch(err) {
    throw new Error(err)
   }
  }
}
