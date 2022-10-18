var express = require("express");
const UserModel = require("../models/user");
const ProductModel = require("../models/productsmodel");
var router = express.Router();
const productService = require("../services/productsservice");
const prodServiceInstance = new productService();
const Middleware = require("../helper/middleware");
const middleware = new Middleware();
//build response object
let resStatus = { status: false, message: "" };

const checkProdID =
  ("/",
  async (req, res, next) => {
    const id = req.body.id;
    try {
      const response = await new ProductModel().getProdByID(id);
      if (response) {
        next();
      }
    } catch (err) {
      throw new Error(err);
    }
  });

router.get("/getID", async (req, res, next) => {
  const { id } = req.query;
  let status = { query: "failed", status: 0 };

  const response = await new ProductModel().getProdByID(id);
  status.query = "Complete";
  if (response !== undefined) {
    status.status = 1;
  }

  res.status(200).send(status);
});

//Get all products from database
router.get("/", async (req, res, next) => {
  try {
    const response = await prodServiceInstance.get();
    //console.log(req.session.passport)
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

//remove product from database
router.delete("/", async (req, res, next) => {
  console.log(req.session)
  try {
    if (req.session.isloggedin) {
      const id = req.body.id;
      //const result = await new ProductModel().deleteProduct(id);
      res.status(200).send("product Removed");
    }else{
      console.log("not logged in")
    }
  } catch (err) {
    next(err);
  }
});

//add product to database
router.post("/", async (req, res, next) => {
  try {
    //checkSession middleware ensure user has permission
    //gather information about product
    //console.log("Recived product.  Calling service")
    const product = req.body.newProduct;
    //send product to database
    const response = await prodServiceInstance.add(product);

    if (response) {
      resStatus = { status: true, message: `Added ${response.name}` };
      res.status(201).send(resStatus);
    } else {
      resStatus = { status: false, message: "Add Product Failed" };
      res.status(401).send(resStatus);
    }
  } catch (err) {
    next(err);
  }
});

//update product in database
router.put("/", async (req, res, next) => {
  try {
    //gather infor about product

    const product = req.body.newProduct;
    //console.log(product)
    const response = await prodServiceInstance.update(product);
    if (response) {
      resStatus = { status: true, Message: `Updated ${response.name}` };
      res.status(201).send(resStatus);
    } else {
      resStatus = { status: false, message: "Update Product Failed" };
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
