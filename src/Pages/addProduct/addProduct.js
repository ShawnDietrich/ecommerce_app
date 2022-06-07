import React from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import './addProduct.css'
import Services from '../../api/apiCalls'
import CloudinaryUploadWidget from './cloudinary'
import { useDispatch, useSelector } from 'react-redux'
import { addProductURL, clearNewProduct, newProductLoad } from '../../api/state'

//create an instance of the product api class
const ProdServInst = new Services()

const AddProduct = (props) => {
  //Form data to send to api
  const { newProduct } = useSelector((state) => state.userState)
  const dispatch = useDispatch()

  //format data for api
  const formatData = (e) => {
    dispatch(
      newProductLoad({
        name: e.target.form[0].value,
        description: e.target.form[1].value,
        price: Number(e.target.value),
      }),
    )
  }


  //send picture to cloudinary
  const handleStorePic = (url) => {
     dispatch(addProductURL(url))
    //console.log(data);
  }

  //collect data and send to database / cloud storage
  const handleSubmit = async (e) => {
    const userToken = sessionStorage.getItem("user")
    await ProdServInst.addProduct({newProduct, user: userToken})
    dispatch(clearNewProduct())
    
  }
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
        <div className='picPrev'>
          <img src={newProduct.picLocation} className="picPrev" alt='Product to add'/>
        </div>
        
      </div>
    </>
  )
}

export default AddProduct
