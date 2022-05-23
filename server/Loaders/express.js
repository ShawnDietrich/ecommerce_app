const express = require('express')
const cors = require('cors')
const session = require('express-session')
require('dotenv').config()
const SESSION_SECRET = process.env.SESSION_SECRET

module.exports = (app) => {
  //setup middlewares
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.set('trust proxy', 1)

  //create session
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 3600,
      },
    }),
  )

  return app
}
