const express = require("express");
const router = express.Router();
const Middleware = require('../helper/middleware')
const middleware = new Middleware()
const Services = require('../services/productsservice')
//check all paths for logged in and csrf 
router.all('/*', middleware.csrfMiddleware, (req, res, next) => {
    req.session.loggedin ? next() : res.status(400).redirect('/auth/login')
})


router.get('/', async(req, res) => {
    const csrfToken = req.csrfToken();
    //get product names
    const products = await new Services().get()
    res.status(200).render('add_product', { 
        csrfToken: csrfToken,
        products: products
    })
})

router.get('/edit', async(req, res)=> {
    console.log(req.query)
    const csrfToken = req.csrfToken();
    //const product = await new Services().getProduct(req.query.id)
    res.status(200).render('add_product', {
        csrfToken: csrfToken,
        product: result
    })
})

router.post('/submit', async (req, res) => {
    //deconstruct the body object
    const { name, description, price, picLocation } = req.body
    const result = await new Services().add({ name, description, price, picLocation })
    if (result) {
        res.status(201).redirect('/addProduct')
    } else {
        res.status(400).redirect('/addProduct')
    }
})

module.exports = router;
