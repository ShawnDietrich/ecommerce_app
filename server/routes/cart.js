const { createNextState } = require('@reduxjs/toolkit')
var express = require('express')
var router = express.Router()
const CartService = require('../services/cartservice')
const CartServiceInst = new CartService ()

module.exports = (app) => {
  app.use('/cart', router)

  //get all items in cart
  router.get('/', async (req, res, next) => {
    try {
      //get user id from session
      const response = await CartServiceInst.get();
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
      const data = req.body
      const response = await CartServiceInst.add(data)
      //
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  //Update
  router.put('/:cartId', async (req, res, next) => {
    try {
      const {cartId} = req.params
      const data = req.body 
      const response = await CartServiceInst.update({id: cartId, ...data})
      res.status(200).send(response)
    }catch (err) {
      next(err)
    }
  })

  //remove item
  router.delete('/:id', async (req, res, next) => {
    try {
      const {id} = req.params
      const response = await CartServiceInst.delete(id)
      res.status(200).send(response)
    }catch (err) {
      next(err)
    }
  })
}
