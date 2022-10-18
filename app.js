var createError = require("http-errors");
const express = require("express");
const session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require('cors')

require("dotenv").config();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(cors())

//don't convert body to json if url is destended for a webhook
app.use((req, res, next) => {
  req.originalUrl === "/register/payment"
    ? next()
    : express.json()(req, res, next);
});
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 4320000000,
      secure: "auto",
      httpOnly: true,
    },
  })
);

//Express Routes
app.use("/auth", require("./server/routes/auth"));
app.use("/cart", require("./server/routes/cart"));
app.use("/inventory", require("./server/routes/products"));
app.use("/users", require("./server/routes/users"));

//React routes
app.use("/", express.static("Client/build"));
app.use("/products", express.static("Client/build"));
app.use("/checkout", express.static("Client/build"));
app.use("/login", express.static("Client/build"));
app.use("/manifest.json", express.static("Client/build"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
