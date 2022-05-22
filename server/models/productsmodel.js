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
      console.log('quering database')
      const query = 'SELECT * FROM products'
      //query database
      const result = await db.query(query)

      //Check result
      if (result) return result.rows[0]
      return null
    } catch (err) {
      console.log(`Error ${err}`)
      throw new Error(err)
    }
  }

  //get product by id
  async getProdByID(id) {
    try {
      //setup query
      const query = 'SELECT * FROM products WHERE id = $1'
      const value = [id]
      const response = db.query(query, value)
      if (response) return (await response).rows[0]
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
  }

  //Add Product to database
  async addProduct(data) {
    try {
      //setup query
      console.log('adding product to database')
      const query = pgp.helpers.insert(data, null, table) + 'RETURNING *'
      //query database
      const result = await db.query(query)
      if (result) return result.rows[0]
      return null
    } catch (err) {
      console.log('error occured')
      throw err
    }
  }

  async updateProduct(data) {
    try {
      const query = pgp.helpers.update(data, null, table) + 'RETURNING *'
      const result = await db.query(query)
      if (result) return result.rows[0]
      return null
    } catch (err) {
      throw new Error(err)
    }
  }
}
