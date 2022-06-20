import React from 'react'
import { DropdownButton, Button, FormControl, InputGroup, Form, Dropdown, ButtonGroup } from 'react-bootstrap'
import './addProduct.css'
import Services from '../../api/apiCalls'
import CloudinaryUploadWidget from './cloudinary'
import { useDispatch, useSelector } from 'react-redux'
import { addProductURL, clearNewProduct, newProductLoad } from '../../api/state'
import { useState } from 'react'


//create an instance of the product api class
const ProdServInst = new Services()

const AddProduct = (props) => {
  //Form data to send to api
  const { products, newProduct } = useSelector((state) => state.userState)
  const dispatch = useDispatch()
  const [update, setUpdate] = useState(false)
  const [validateMsg, setValidateMsg] = useState(false)



  //format data for api
  const formatData = (e) => {
    //add to state as form is filled out
    dispatch(
      newProductLoad({
        id: newProduct.id,
        name: e.target.form[0].value,
        description: e.target.form[1].value,
        price: Number(document.getElementsByClassName("price")[0].value),
      }),
    )
  }

  //send picture to cloudinary
  const handleStorePic = (url) => {
    dispatch(addProductURL(url))
  }

  //collect data and send to database / cloud storage
  const handleSubmit = async (e) => {
    const userToken = sessionStorage.getItem("session")
    let response = {}
    
    //validate inputs
    
    if(!checkValid()) return

    if (!update) {
      response = await ProdServInst.addProduct({ newProduct, UserToken: userToken })
    } else {
      //console.log("updating")
      response = await ProdServInst.updateProduct({ newProduct, userToken: userToken })
    }
    console.log(response)
    if (response.status) {
      dispatch(clearNewProduct())
    } else {
      sessionStorage.setItem("session", '')
    }
    document.location.reload()
  }

  const handleSelect = (e) => {
    //find the product selected
    const selectedProd = products.find(element => element.id === Number(e))
    //update the state
    dispatch(newProductLoad(selectedProd))
    dispatch(addProductURL(selectedProd.picLocation))
    //populate the input form
    document.getElementsByClassName('name')[0].value = selectedProd.name
    document.getElementsByClassName('desc')[0].value = selectedProd.description
    document.getElementsByClassName('price')[0].value = selectedProd.price.slice(1, selectedProd.price.length)
    //set state flag
    setUpdate(true)
  }

  const handleDelete = async () => {
    await ProdServInst.deleteProduct({ id: newProduct.id, UserToken: sessionStorage.getItem("session") })
    //console.log(response)
    dispatch(clearNewProduct())
    document.location.reload()
  }

  const checkValid = () => {
    setValidateMsg(true)
    if(newProduct.title !== '' && newProduct.description !== '' && newProduct.price > 0 && typeof newProduct.price === 'number'){
      setValidateMsg(false)
      return true
    }else {
      return false
    }
  }

  return (
    <>
      <div className="productForm">
        <CloudinaryUploadWidget storePic={handleStorePic} />
        <DropdownButton id='dropdown-variants-primary' title='Select Product' className='selectButton' as={ButtonGroup} onSelect={handleSelect}>
          {products.length > 0 &&
            products.map((product, index) => (
              <Dropdown.Item key={index} eventKey={product.id}>{product.name}</Dropdown.Item>
            ))}
        </DropdownButton>
        <Form onChange={formatData} validated={validateMsg}>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label >Product Title (max 25 characters)</Form.Label>
            <InputGroup hasValidation>
              <Form.Control className='name' type="name" placeholder="Name of Item" maxLength='25' required />
              <Form.Control.Feedback type='invalid'>Give your product a title</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Product Description (max 60 characters)</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                className='desc'
                type="description"
                placeholder="Describe the Product"
                maxLength='60'
                required
              />
              <Form.Control.Feedback type='invalid'>Give your product a description</Form.Control.Feedback>
            </InputGroup>

          </Form.Group>
          <Form.Label>Item Price</Form.Label>
          <InputGroup className="mb-3" hasValidation>
            <InputGroup.Text>$</InputGroup.Text>
            <FormControl className='price' type='number' aria-label="Product Price" required/>
            <InputGroup.Text>.00</InputGroup.Text>
            <Form.Control.Feedback type='invalid'>Give your product a price</Form.Control.Feedback>
          </InputGroup>
          
          <Button
            variant="danger"
            onClick={handleDelete}
            className="submitButton"
            disabled={!update}
          >
            Delete Product
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="submitButton"
          >
            Submit
          </Button>
        </Form>
        <div className='picPrev'>
          <img src={newProduct.picLocation} className="picPrev" alt='Product to add' />
        </div>

      </div>
    </>
  )
}

export default AddProduct
