var express = require('express')
const UserModel = require('../models/user')
var router = express.Router()
const productService = require('../services/productsservice')
const prodServiceInstance = new productService()

module.exports = (app, passport) => {
  //map route to router
  app.use('/products', router)

  //post middleware
  const checkSession = ('/', async (req, res, next) => {
    const UserToken = req.body.UserToken
    try {
      //call database looking for session
      const response = await new UserModel().getSession(UserToken)
      if (response) {
        //session found continue to next endpoint
        next()
      } else {
        res.status(401).send("Access Denied")
      }
    } catch (err) {
      throw new Error(err)
    }

  })

  //Get all products from database
  router.get('/', async (req, res, next) => {
    try {
      //console.log(req.isAuthenticated())
      const response = await prodServiceInstance.get()
      //console.log(req.session.passport)
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
  router.post('/', checkSession, async (req, res, next) => {
    try {
      //checkSession middleware ensure user has permission
      //gather information about product
      //console.log("Recived product.  Calling service")
      const { product } = req.body
      //send product to database
      const response = await prodServiceInstance.add(product)

      if (response) {

        res.status(201).send(response)
      } else {
        res.status(401).send("user not authenticated")
      }

    } catch (err) {
      next(err)
    }
  })

  //update product in database
  router.put('/:prodId', async (req, res, next) => {
    try {
      //gather infor about product
      const { prodId } = req.params
      const product = req.body
      const response = await prodServiceInstance.update({ id: prodId, ...product })
      res.status(201).send(response)
    } catch (err) {
      next(err)
    }
  })
}
