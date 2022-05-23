const createError = require('http-errors')
const productsModels = require('../models/productsmodel')
const productModelInstance = new productsModels()

/**
 * Collection of methods for adding, remove, reporting
 * items in the products table
 * called from routes
 */
module.exports = class ProductService {
  async get() {
    try {
      //get all products
      //console.log('running service')
      const products = await productModelInstance.getAllProducts()
      return products
    } catch (err) {
      throw err
    }
  }

  //add product 
  async add(data) {
    try {
      //add product to database
      console.log('Service started.  Calling query to database')
      const result = await productModelInstance.addProduct(data)
      return result
    } catch (err) {
      throw err
    }
  }

  async update(data) {
    try {
      //check for existing product
      const checkResult = await productModelInstance.getProdByID(data.id)
      if (checkResult) {
        //update product
        const result = await productModelInstance.updateProduct(data)
        return result
      }
      return "Product doesn't exisit"
    } catch (err) {
      throw err
    }
  }
}
