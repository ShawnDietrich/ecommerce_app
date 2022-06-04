const express = require('express')
const passport = require('../loaders/passport')
const router = express.Router()
const AuthService = require('../services/AuthService')
const AuthServiceInstance = new AuthService()
const bcrypt = require('bcryptjs')

module.exports = (app, passport) => {
  app.use('/auth', router)

  // Registration Endpoint
  router.post('/register', async (req, res, next) => {
    try {
      const data = req.body
      bcrypt.hash(data.password, 17, async(err, hashPassword) => {
        const response = await AuthServiceInstance.register({
          email: data.username,
          password: hashPassword
        })
        res.status(200).send(response)
      })
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
        //console.log(`Loging in user ${username}`)
        const response = await AuthServiceInstance.login({
          email: username,
          password,
        })
        const {id, email} = response
        res.status(200).send(response.email)
      } catch (err) {
        next(err)
      }
    },
  )
}
