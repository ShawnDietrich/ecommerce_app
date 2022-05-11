var express = require('express');
var router = express.Router();

/**
 * Get Cart Contents
 */
router.get('/', (req, res, next) => {
    res.send("this is a get cart call")
})

module.exports = router;