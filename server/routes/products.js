var express = require('express')
var router = express.Router()
const productService = require('../services/productsservice')
const prodServiceInstance = new productService()

module.exports = (app) => {
  //map route to router
  app.use('/products', router)

  //Get all products from database
  router.get('/', async (req, res, next) => {
    try {
      //console.log('Getting all products')
      const response = await prodServiceInstance.get()
      //console.log(response)
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  /*remove product from database
  router.delete('/:id', async (res, req, next) => {
    try {
      const { id } = req.params
      const response = 
    
      res.status(200).send('product Removed')
    } catch (err) {
      next(err)
    }
  })
  */

  //add product to database
  router.post('/', async (req, res, next) => {
    try {
      //gather infor about product
      console.log("Recived product.  Calling service")
      const product = req.body
      
      const response = await prodServiceInstance.add(product)
      res.status(201).send(response)
    } catch (err) {
      next(err)
    }
  })

  //update product in database
  router.put('/:prodId', async (req, res, next) => {
    try {
      //gather infor about product
      const {prodId} = req.params
      const product = req.body
      const response = await prodServiceInstance.update({id: prodId, ...product})
      res.status(201).send(response)
    } catch (err) {
      next(err)
    }
  })
}
