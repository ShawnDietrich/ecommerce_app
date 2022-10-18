const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
    console.log("render add product page")
    res.status(200).render('add_product')
})

module.exports = router;
