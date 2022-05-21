const db = require('../../database')
const pgp = require('pg-promise')()
const table = 'products'
/**
 * Collection of methods to query the database
 * Called from the service
 */
module.exports = class ProductModel {
  //get all products from database
  async getAllProducts() {
    try {
      //setup query
      const query = 'SELECT * FROM products'
      //query database
      const result = await db.query(query)

      //Check result
      if (result) return result.rows[0]
      return null
    } catch (err) {
      throw new Error(err)
    }
  }

  //Add Product to database
  async addProduct(data) {
    try{
        //setup query
        const query = pgp.helpers.insert(data, null, table) + 'RETURNING *'
        //query database
        const result = db.query(query)
        if(result) return result.rows[0]
        return null
    }catch (err) {
        throw new Error(err)
    }
  }

  async updateProduct(data) {
      try {
          const query = pgp.helpers.update(data, null, table) + 'RETURNING *'
          const result = db.query(query)
          if (result) return result.rows[0]
          return null
      }catch(err) {
          throw new Error(err)
      }
  }
}
