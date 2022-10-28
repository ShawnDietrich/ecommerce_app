const express = require("express");
const router = express.Router();
const Middleware = require('../helper/middleware')
const middleware = new Middleware()
const Services = require('../services/productsservice')
const Product = require("../helper/product")


//check all paths for logged in and csrf 
router.all('/*', middleware.csrfMiddleware, (req, res, next) => {
    req.session.loggedin ? next() : res.status(400).redirect('/auth/login')
})


router.get('/', async (req, res) => {
    const csrfToken = req.csrfToken();
    //get product names
    const products = await new Services().get()
    if (req.session.editProduct === undefined) {
        req.session.editProduct = new Product().product
    }
    //console.log(req.session.editProduct)
    res.status(200).render('add_product', {
        csrfToken: csrfToken,
        products: products,
        editProduct: req.session.editProduct,
    })
})

router.post('/edit', async (req, res) => {
    //console.log(req.body)
    const product = await new Services().getProduct(req.body.id)
    if (product) {
        req.session.editProduct = product;
        res.status(200).redirect("/addProduct")
    } else {
        console.log("No Product found")
        //add alert
        res.status(403).redirect("/addProduct")
    }
})

router.post('/update', async (req, res) => {
    const { name, description, price, picLocation } = req.body
    const result = await new Services().update({id: req.session.editProduct.id, name, description, price, picLocation})
    if(result){
        console.log("Product Updated")
        req.session.editProduct = new Product().product
        res.status(201).redirect('/addProduct')
    }else{
        console.log("Product did not update")
        res.status(401).redirect('/addProduct')
    }
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
