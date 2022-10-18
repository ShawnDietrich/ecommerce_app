const express = require('express')
const router = express.Router()
const AuthService = require('../services/AuthService')
const AuthServiceInstance = new AuthService()
const bcrypt = require('bcryptjs')
const UserModel = require('../models/user')

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

        //Time delay to prevent spaming
        const timeout = (delay = 500) => {
          return new Promise(res => setTimeout(res, delay))
        }

        await timeout(2000)

        if(req.isAuthenticated()){
          console.log(req.session.id)
          const storedRes = await AuthServiceInstance.storeSession(req.sessionID)
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

  //Logout endpoint
  router.delete('/logout', async (req, res) => {
    try{
      //console.log(req.body)
      console.log(req.session.id)
      const userToken = req.body.UserToken
      const response = await new UserModel().logOutSession(userToken)
      if(response) {
        res.status(201).send("Logged Out")
      }
    }catch(err){
      res.status(403).send("Failed")
    }
  })
}
