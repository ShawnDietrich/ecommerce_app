const { createNextState } = require('@reduxjs/toolkit')
var express = require('express')
var router = express.Router()

module.exports = (app) => {
  app.use('/cart', router)

  //get all items in cart
  router.get('/', async (req, res, next) => {
    try {
      //get user id from session
      const { id } = req.user
      const response = ""//call database query to return all items in the cart
      //
      //send status to the frontend
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  //Add items
  router.post('/', async (req, res, next) => {
    try {
      //get user id from session
      const { id } = req.user
      const response = ""//add item to cart table
      //
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })
}
