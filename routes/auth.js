var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
const dbInstance = require("../models/user")
const UserInst = new dbInstance()


/* GET login page */
router.get('/login', function (req, res, next) {
  console.log("logging in")
  if(req.session.loggedin) {
    res.redirect(`/addProduct`)
  }else {
    res.render('login', { loginFailed: false });
  }
  
});

//Login User
router.post('/Request', async function (req, res) {
  //delay to prevent spamming
  await TimeOut(2500)
  const email = req.body.email
  const password = req.body.password
  //console.log(email)
  if (email && password) {
    try {
      const result = await UserInst.findByEmail(email)
      if (result) {
        //User found set session data
        const passwordCheck = await bcrypt.compare(password, result.password)
        if (passwordCheck) {
          console.log("Password Check Complete")
          console.log(`user cred ${result.userCred}`)
          req.session.loggedin = true
          req.session.email = result.email

          res.status(200).redirect(`/addProduct`)
        } else {
          console.log('Incorrect Password')
          res.status(400).render('login', { loginFailed: true })
        }
      } else {
        console.log('email not found')
        res.status(200)
          .render('login', { loginFailed: true })
      }
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }

  }
})

router.post('/logout', function (req, res) {
  req.session.destroy();
  res.status(200).redirect('/')
})


//Time delay to prevent spamming
const TimeOut = (delay = 500) => {
  return new Promise(res => setTimeout(res, delay))
}


module.exports = router;
