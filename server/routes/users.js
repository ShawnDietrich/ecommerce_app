var express = require('express')
var router = express.Router()
const UserService = require('../services/userService')
const userService = new UserService()

module.exports = (app) => {
  app.use('/users', router)

  //default route
  router.get('/', (req, res, next) => {
    res.status(204).send('Missing User ID')
  })

  //get user information
  router.get('/:userId', async (req, res, next) => {
    try {
      const {userId} = req.params
      const response = await userService.get(userId) //get user by id from database
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  //update user information
  router.put('/:userId', async (req, res, next) => {
    const { userId } = req.params
    const data = req.body
    try {
      const response = await userService.update({ id: userId, ...data })
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })
}
