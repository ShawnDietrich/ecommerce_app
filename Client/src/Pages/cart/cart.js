import { Button, FormControl, InputGroup, Card } from 'react-bootstrap'
import React from 'react'
import './cart.css'
import { Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { removeItem, updateCart } from '../../api/state'
import trashCan from '../../images/delete.png'

const Cart = (props) => {
  //load items from session storage
  const cart = JSON.parse(sessionStorage.getItem('cartData'))
  const dispatch = useDispatch()

  //clear cart
  const handleClear = () => {
    sessionStorage.setItem("cartData", JSON.stringify([]))
    window.location.reload()
  }

  //user changes quantity
  const handleQtyChange = (e) => {
    //update quantity
    const index = cart.findIndex(item => item.id === Number(e.target.id))
    const newQty = Number(e.target.value)
    if(index >= 0){
      dispatch(updateCart({qty: newQty, index: index}))
    }else window.alert("Item Not Found")
  }

  const handleRemove = (e) => {
    dispatch(removeItem({id: Number(e.target.id)}))

  }

  const handleTotal = () => {
   let total = 0
   cart.map(item => 
    total += Number(item.price.slice(1))
   )
   const strTotal = '$' + total.toString() 
   return strTotal
  }

  if (cart.length > 0) {
    //present cart items in a list
    const listCart = cart.map((item, index) => (
      <div className='card' key={index}>
        <Card.Body className='cartCardBody' key={index}>
          <Card.Img variant='Left' src={item.picLocation} width='50px' border-radius='10%' />
          <Card.Text className='cardText'>{item.name}</Card.Text>
          <Card.Text className='cardText'>{item.price}</Card.Text>
          <img src={trashCan} className='cardRemove' type='Button' width={"30px"} onClick={handleRemove} id={item.id} alt='Remove Item'></img>
          <Form.Control className='cardQty' type='Qty' placeholder={item.qty} onChange={handleQtyChange} id={item.id}/>
        </Card.Body>
      </div>
    ))



    return (
      <>
        <div className="cartObjects">
          
          <Card className="items">{listCart}</Card>
          <Card className='items'>
            <Card.Body className='cartCardBody'>
              <Card.Title className='totalTitle'>Total: </Card.Title>
              <Card.Text className='totalPrice'>{handleTotal()}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className='orderForm'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="Name" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="address" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address 2</Form.Label>
              <Form.Control type="address2" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="city" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control type="country" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <InputGroup>
              <InputGroup.Text>Notes:</InputGroup.Text>
              <FormControl as="textarea" aria-label="With textarea" />
            </InputGroup>

            <Button className='ctrlBtn' variant="primary" type="submit">
              Submit
            </Button>

            <Button className='ctrlBtn' variant="primary" size="large" onClick={handleClear}>
              Clear Cart
            </Button>
          </Form>
        </div>
      </>
    )
  } else {
    return (
      <div className='noProducts'>
        <h1>No Products Added</h1>
      </div>
    )
  }
}

export default Cart
