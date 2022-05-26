import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./addProduct.css";
import ProductServices from "../../api/products";
import CloudinaryUploadWidget from "./cloudinary";

//create an instance of the product api class
const ProdServInst = new ProductServices();

const AddProduct = (props) => {
  //Form data to send to api
  const data = {
    name: "",
    description: "",
    price: 0,
    picLocation: "",
  };
  //format data for api
  const formatData = (e) => {
    data.name = e.target.form[0].value
    data.description = e.target.form[1].value
    data.price = Number(e.target.value)
    console.log(data)
  };

  //send picture to cloudinary
  const handleStorePic = (url) => {
    data.picLocation = url
    console.log(data);
  };

  //collect data and send to database / cloud storage
  const handleSubmit = async (e) => {
    console.log(e);
    const response = await ProdServInst.addProduct(e.target);
    console.log(response);
  };
  return (
    <>
      <div className="productForm">
        <CloudinaryUploadWidget storePic={handleStorePic} />
        <Form onChange={formatData}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Product Title</Form.Label>
            <Form.Control type="name" placeholder="Name of Item" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="description"
              placeholder="Describe the Product"
            />
          </Form.Group>
          <Form.Label>Item Price</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <FormControl aria-label="Product Price" />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="submitButton"
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddProduct;
