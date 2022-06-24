

import React, { useEffect, useState } from 'react'
import { CardGroup, Row, Alert, Offcanvas, Card, Button } from 'react-bootstrap'
import Cards from '../Components/cards/cards'
import './products.css'

const Products = (props) => {
  const products = props.products
  const cart = props.cart
  let value = []
  const [addOrder, setAddOrder] = useState(false)

  useEffect(() => {
    for (let i = 0; i <= 10; i++) {
      value.push(i)
    }
  }, [])

  //timeout for success message
  useEffect(() => {
    setTimeout(() => {
      setAddOrder(false)
    }, 3000)
  }, [addOrder])


  //event handler for adding products to cart
  const handleAddCart = (e) => {
    e.preventDefault()
    //update state for message
    setAddOrder(true)
    //parse data for API call
    const id = Number(e.target.id)
    const qty = Number(e.target.previousSibling.value)
    products.map(product => {
      if (product.id === id) {
        props.onClick({ qty: qty, ...product })
        e.target.previousSibling.value = ''
      }
      return null
    })
  }

  const handleClose = () => setAddOrder(false)
  const handleShow = () => setAddOrder(true)

  //Use ( ) instead of { } for the arrow function in the .map
  //This will render the Cards component using { } will not render Cards
  return (
    <div className='background'>
      <div className="products">

        <Offcanvas show={addOrder} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Order List</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <CardGroup>
              <Row className='justify-content-center'>
                {cart.map((item, index) => (
                  <Card key={index}>
                    <Card.Body className='orderBody'>
                      <Card.Img variant='Left' src={item.picLocation} width='50px' border-radius='10%' />
                      <Card.Text>{item.name}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Row>
            </CardGroup>
          </Offcanvas.Body>
        </Offcanvas>

        <CardGroup>
          <Row className='justify-content-center'>
            {products.map((product, index) => (
              <Cards
                className={product.prodName}
                key={index}
                product={product}
                quantity={value}
                onClick={handleAddCart}
              />
            ))}
          </Row>
        </CardGroup>
         
      </div>
      
    </div>
  )
}

export default Products
