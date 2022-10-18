const createError = require('http-errors')
const cartModel = require('../models/cartmodel')
const cartModelInstance = new cartModel()

/**
 * Collection of methods for adding, removing, reporting
 * items in the cart table
 */
module.exports = class CartService {
  async get() {
    try {
      //get all products
      const products = await cartModelInstance.getAllProducts()
      return products
    } catch (err) {
      throw err
    }
  }

  //add product
  async add(data) {
    try {
      //add product to database
      const result = await cartModelInstance.addProduct(data)
      return result
    } catch (err) {
      throw err
    }
  }

  async delete(id) {
    try {
      //Check for existing product
      const checkResult = await cartModelInstance.getProdById(id)
      if (checkResult) {
        //remove from cart
        const result = await cartModelInstance.removeProduct(id)
        return result
      }
    } catch (err) {
      throw err
    }
  }

  async update(data) {
    try {
      //Check for existing product
      const checkResult = await cartModelInstance.getProdById(data.id)
      if (checkResult) {
        //remove from cart
        const result = await cartModelInstance.updateProduct(data)
        return result
      }
      return "Product does not exisit"
    } catch (err) {
      throw err
    }
  }
}
