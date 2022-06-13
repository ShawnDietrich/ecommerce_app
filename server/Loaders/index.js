const expressLoader = require('./express')
const passportLoader = require('./passport')
const routeLoader = require('../routes')

module.exports = async (app) => {
  
  //Load middleware for express app
  const expressApp = await expressLoader(app)

  //Load passport middleware
  const passport = await passportLoader(expressApp)

  //Load API routes
  await routeLoader(app, passport)

  //Error Handler
  app.use((err, req, res, next) => {
    const { message, status } = err
    
    return res.status(status).send({ message })
  })
}
