//mapping routers
const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users");
const productsRouter = require("../routes/products");
const cartRouter = require("../routes/cart");
//const authRouter = require("../routes/auth");

module.exports = async (app) => {
  //setup routers
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/products", productsRouter);
  app.use("/cart", cartRouter);
  //app.use("auth", authRouter);
};
