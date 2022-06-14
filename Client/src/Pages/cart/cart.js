import { Button, FormControl, InputGroup, Card } from 'react-bootstrap'
import React from 'react'
import './cart.css'
import { Form } from 'react-bootstrap'

const Cart = (props) => {
  //load items from session storage
  const cart = JSON.parse(sessionStorage.getItem('cartData'))
  let total = 0
  const handleClear = () => {
    sessionStorage.setItem("cartData", JSON.stringify([]))
    window.location.reload()
  }

  const handleQtyChange = (e) => {
    //update quantity
    //console.log(e)
    const index = e.target.id
    const newQty = e.target.value
    console.log(cart[index].qty)
    cart[index].qty = newQty
    //cart.forEach(item => item.id === e.target.id ? console.log(item.id) : console.log("not found"))
    //const index = cart.indexOf((item) => Number(item.id) === Number(e.target.id))
    //console.log(index)
  }

  if (cart.length > 0) {
    //present cart items in a list
    const listCart = cart.map((item, index) => (
      //<li key={index}>
      // <img className='thumbNail' src={item.picLocation}/> 
      //  {item.name} {item.price}
      //</li>
      <div className='card' key={index}>
        <Card.Body className='cartCardBody' key={index}>
          <Card.Img variant='Left' src={item.picLocation} width='50px' border-radius='10%' />
          <Card.Text className='cardText'>{item.name}</Card.Text>
          <Card.Text className='cardText'>{item.price}</Card.Text>
          <Form.Control className='cardQty' type='Qty' placeholder={item.qty} onChange={handleQtyChange} id={index}/>
        </Card.Body>
      </div>
    ))



    return (
      <>
        <div className="cartObjects">
          <h2>Cart Contents</h2>
          <Card className="items">{listCart}</Card>
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
      <>
        <h1>No Products Added</h1>
      </>
    )
  }
}

export default Cart