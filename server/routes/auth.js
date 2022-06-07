const express = require('express')
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
      bcrypt.hash(data.password, 12, async (err, hashPassword) => {
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

        //console.log(req.session.passport)
        //console.log(req.user)
        /*
        const { username, password } = req.body
        const response = await AuthServiceInstance.login({
          email: username,
          password,
        })
        */

        //Time delay to prevent spaming
        const timeout = (delay = 500) => {
          return new Promise(res => setTimeout(res, delay))
        }

        await timeout(3000)

        if(req.isAuthenticated()){

          res.status(200).send({session: req.sessionID})
        }else {
          
          res.status(403).send("Invalid Email or Password")
        }
        


      } catch (err) {
        console.log(err)
        next(err)
      }
    },
  )
}
