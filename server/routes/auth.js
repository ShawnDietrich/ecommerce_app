const express = require('express')
const passport = require('../loaders/passport')
const router = express.Router()
const AuthService = require('../services/AuthService')
const AuthServiceInstance = new AuthService()

module.exports = (app, passport) => {
  app.use('/auth', router)

  // Registration Endpoint
  router.post('/register', async (req, res, next) => {
    try {
      const data = req.body
      //console.log(data)
      const response = await AuthServiceInstance.register(data)
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  // Login Endpoint
  router.post(
    '/login',
    passport.authenticate('local'),
    async (req, res, next) => {
      try {
        const { username, password } = req.body
        console.log(`Loging in user ${username}`)
        const response = await AuthServiceInstance.login({
          email: username,
          password,
        })
        const {id, email} = response
        res.status(200).send({id, email})
      } catch (err) {
        next(err)
      }
    },
  )
}
