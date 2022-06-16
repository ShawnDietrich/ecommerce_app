var express = require('express')
const UserModel = require('../models/user')
const ProductModel = require('../models/productsmodel')
var router = express.Router()
const productService = require('../services/productsservice')
const prodServiceInstance = new productService()
//build response object
let resStatus = {status: false, message: ''}


module.exports = (app) => {
  //map route to router
  app.use('/inventory', router)

  //post middleware
  const checkSession = ('/', async (req, res, next) => {
    const UserToken = req.body.UserToken
    //console.log(req.body)
    try {
      //call database looking for session
      const response = await new UserModel().getSession(UserToken)
      if (response) {
        //session found continue to next endpoint
        console.log("user ok")
        next()
      } else {
        resStatus = {status: false, message: "Access Denied"}
        res.status(203).send(resStatus)
      }
    } catch (err) {
      throw new Error(err)
    }
  })

  const checkProdID = ('/', async (req, res, next) => {
    const id = req.body.id
    try{
      const response = await new ProductModel().getProdByID(id)
      if(response){
        next()
      }
    }catch(err) {
      throw new Error(err)
    }
  })

  //Get all products from database
  router.get('/', async (req, res, next) => {
    try {
      //console.log(req.isAuthenticated())
      const response = await prodServiceInstance.get()
      //console.log(req.session.passport)
      res.status(200).send(response)
    } catch (err) {
      next(err)
    }
  })

  //remove product from database
  router.delete('/', checkSession, async (req, res, next) => {
    try {
      const id = req.body.id
      const result = await new ProductModel().deleteProduct(id)   
      res.status(200).send('product Removed')
    } catch (err) {
      next(err)
    }
  })
  

  //add product to database
  router.post('/', checkSession, async (req, res, next) => {
    try {
      //checkSession middleware ensure user has permission
      //gather information about product
      //console.log("Recived product.  Calling service")
      const  product  = req.body.newProduct
      product.id = Math.floor(Math.random()*10000) 
      //send product to database
      const response = await prodServiceInstance.add(product)

      if (response) {
        resStatus = {status: true, message: `Added ${response.name}`}
        res.status(201).send(resStatus)
      } else {
        resStatus = {status: false, message: "Add Product Failed"}
        res.status(401).send(resStatus)
      }

    } catch (err) {
      next(err)
    }
  })

  //update product in database
  router.put('/',  async (req, res, next) => {
    try {
      //gather infor about product
      
      const product = req.body.newProduct
      //console.log(product)
      const response = await prodServiceInstance.update(product)
      if(response) {
        resStatus = {status: true, Message: `Updated ${response.name}`}
      res.status(201).send(resStatus)
      }else {
        resStatus = {status: false, message: "Update Product Failed"}
      }
      
    } catch (err) {
      next(err)
    }
  })
}
