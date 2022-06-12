import React, { useEffect, useState } from 'react'
import { ButtonGroup, Col, Dropdown, DropdownButton, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './cards.css'
const Cards = (props) => {
  const { id, name, description, price, picLocation } = props.product
  const [qty, setQty] = useState(0)
  //update varaible if quanty changes
  const qtyUpdate = (e) => {
    setQty(e.target.value)
  }

  return (

    <Col>
      <Card border="dark" style={{ width: '18rem' }}>
        <Card.Img variant="top" src={picLocation} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description}
            <br />
            {`${price}`}
          </Card.Text>
          <div className='qtyOrder'>
            <Form.Control className='qty' onChange={qtyUpdate} type='quantity' placeholder='Qty'  />
            <Button className='orderBtn' variant="outline-dark"
              onClick={props.onClick} id={id}
              qty={qty}>
              Add To Order
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>

  )
}

export default Cards
