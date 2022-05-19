var express = require('express')
var router = express.Router()

module.exports = (app) => {
  //map route to router
  app.use('/products', router)

  //Get all products from database
  router.get('/', async (req, res, next) => {
    try {
      const response = ""//get result from database
      console.log("get products")
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  //remove product from database
  router.delete('/:id', async (res, req, next) => {
    try {
      const { id } = req.params
      const response = ""//remove from database call
    
      res.status(200).send('product Removed')
    } catch (err) {
      next(err)
    }
  })

  //Update product from database
  router.post('/', async (req, res, next) => {
    try {
      //gather infor about product
      const { product } = req.body
      const response = ""//send product info to database
      res.status(201).send('product added')
    } catch (err) {
      next(err)
    }
  })
}
