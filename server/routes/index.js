var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hello world");
});

router.get('/', (req,res, next) => {
  res.send("something")
})

module.exports = router;
