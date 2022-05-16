const express = require('express')
const router = express.Router()


/*
// Registration Endpoint
router.post('/register', async (req, res, next) => {
  try {
    const data = req.body

    const response = await AuthServiceInstance.register(data)
    res.status(200).send(response)
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
      const { username, password } = req.body

      const response = await AuthServiceInstance.login({
        email: username,
        password,
      })

      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  },
)

module.exports = router
*/
