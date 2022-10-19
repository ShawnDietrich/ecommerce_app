const express = require("express");
const router = express.Router();
const AuthService = require("../services/AuthService");
const AuthServiceInstance = new AuthService();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user");



// Registration Endpoint
router.post("/register", async (req, res, next) => {
  try {
    const data = req.body;
    bcrypt.hash(data.password, 12, async (err, hashPassword) => {
      const response = await AuthServiceInstance.register({
        email: data.username,
        password: hashPassword,
      });
      res.status(200).send(response);
    });
  } catch (err) {
    next(err);
  }
});

// Login Endpoint
router.post("/login", async (req, res, next) => {
  try {
    const email = req.body.username;
    const password = req.body.password;
    //delay to prevent spamming
    await TimeOut(1500);
    if (email && password) {
      const result = await AuthServiceInstance.login({ email, password });
      if (result) {
        req.session.loggedin = true;
        console.log(req.session)
        res.status(200).redirect('/addProduct');
      } else {
        res.status(400).send("Incorrect Password");
      }
    } else {
      console.log("Missing Email or Password")
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//Logout endpoint
router.delete("/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.status(201).send("Logged Out");
  } catch (err) {
    res.status(403).send("Failed");
  }
});
module.exports = router;

//Time delay to prevent spamming
const TimeOut = (delay = 500) => {
  return new Promise((res) => setTimeout(res, delay));
};
