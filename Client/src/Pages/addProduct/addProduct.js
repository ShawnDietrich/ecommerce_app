import React from 'react'
import { DropdownButton, Button, FormControl, InputGroup, Form, Dropdown, ButtonGroup } from 'react-bootstrap'
import './addProduct.css'
import Services from '../../api/apiCalls'
import CloudinaryUploadWidget from './cloudinary'
import { useDispatch, useSelector } from 'react-redux'
import { addProductURL, clearNewProduct, newProductLoad, updateProduct } from '../../api/state'
import { useState } from 'react'


//create an instance of the product api class
const ProdServInst = new Services()

const AddProduct = (props) => {
  //Form data to send to api
  const { products, newProduct } = useSelector((state) => state.userState)
  const dispatch = useDispatch()
  const [update, setUpdate] = useState(false)

  //format data for api
  const formatData = (e) => {
    
    dispatch(
      newProductLoad({
        id: newProduct.id,
        name: e.target.form[0].value,
        description: e.target.form[1].value,
        price: Number(document.getElementsByClassName("price")[0].value),
        //price: e.target.value
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
    if(!update){
       response = await ProdServInst.addProduct({ newProduct, UserToken: userToken })
    }else {
      //console.log("updating")
       response = await ProdServInst.updateProduct({newProduct, userToken: userToken})
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
    document.getElementsByClassName('price')[0].value = selectedProd.price.slice(1,selectedProd.price.length)
    //set state flag
    setUpdate(true)
  }

  const handleDelete = async () => {
    const response = await ProdServInst.deleteProduct({id: newProduct.id, UserToken: sessionStorage.getItem("session")})
    //console.log(response)
    dispatch(clearNewProduct())
    document.location.reload()
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
        <Form onChange={formatData}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Product Title</Form.Label>
            <Form.Control className='name' type="name" placeholder="Name of Item" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              className='desc'
              type="description"
              placeholder="Describe the Product"
            />
          </Form.Group>
          <Form.Label>Item Price</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <FormControl className='price' aria-label="Product Price" />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
          <Button 
          variant= "danger"
          onClick= {handleDelete}
          className = "submitButton"
          disabled= {!update}
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
