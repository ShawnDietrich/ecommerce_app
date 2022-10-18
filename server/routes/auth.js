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
    const { email, password } = req.body;
    //delay to prevent spamming
    await TimeOut(2000);
    if (email && password) {
      const result = await AuthServiceInstance.login({ email, password });
      if (result) {
        req.session.loggedin = true;
        res.status(200).send({ session: req.sessionID });
      } else {
        res.status(400).send("Incorrect Password");
      }
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
