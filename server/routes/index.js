const authRouter = require('./auth')
const cartRouter = require('./cart')
const productsRouter = require('./products')
const usersRouter = require('./users')

module.exports = (app, passport) => {
  //map routes to routers
  authRouter(app, passport)
  cartRouter(app)
  productsRouter(app)
  usersRouter(app)
}
