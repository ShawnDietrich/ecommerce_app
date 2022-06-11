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
      //console.log('Service started.  Calling query to database')
      const result = await productModelInstance.addProduct(data)
      return result
    } catch (err) {
      throw err
    }
  }

  async update(data) {
    try {
      //check for existing product
      //console.log(data.id)
      const checkResult = await productModelInstance.getProdByID(Number(data.id))
      //console.log(checkResult)
      if (checkResult) {
        //create an object without the id
        const newProduct = {
          name: data.name,
          description: data.description,
          price: data.price,
          picLocation: data.picLocation
        }
        //update product
        const result = await productModelInstance.updateProduct(newProduct, data.id)
        return result
      }
      return "Product doesn't exisit"
    } catch (err) {
      throw err
    }
  }
}
