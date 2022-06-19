import React, { useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './cards.css'
const Cards = (props) => {
  const { id, name, description, price, picLocation } = props.product
  const [qty, setQty] = useState(0)
  const [btnDisable, setBtnDisable] = useState(true)
  //update varaible if quanty changes
  const qtyUpdate = (e) => {
    setQty(e.target.value)
    setBtnDisable(false)
  }

  return (

    <Col >
      <Card border="dark" style={{ width: '20rem', margin: '1em auto', height: '630px' }}>
        <Card.Img variant="top" src={picLocation} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description} </Card.Text>
        </Card.Body>
        <Card.Text className='cardPrice'>{`${price}`}</Card.Text>
        <div className='qtyOrder'>
          <Form.Control className='qty' onChange={qtyUpdate} type='quantity' placeholder='Qty' />
          <Button className='orderBtn' variant="outline-dark"
            onClick={props.onClick} id={id}
            qty={qty}
            disabled={btnDisable}>
            Add To Order
          </Button>
        </div>

      </Card>
    </Col>

  )
}

export default Cards
