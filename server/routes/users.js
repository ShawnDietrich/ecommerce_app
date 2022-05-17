var express = require('express')
var router = express.Router()

module.exports = (app) => {
  app.use('/users', router)

  //get user information
  router.get('/:userId', async (req, res, next) => {
    try {
      const { id } = req.params
      const response = "" //get user by id from database
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  //update user information
  router.put('/:userId', async (req, res, next) => {
    const {id} = req.params
    const data = req.body
    const response =""//update user data by id
    res.status(200).send(response)
  })
}
