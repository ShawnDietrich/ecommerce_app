import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Cards = (props) => {
  const { id, prodName, desc, price } = props.product
  return (
    
      <Col>
        <Card border="dark" style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{prodName}</Card.Title>
            <Card.Text>
              {desc}
              <br />
              {`$${price}`}
            </Card.Text>
            <Button variant="outline-dark" onClick={props.onClick}>
              Add To Cart
            </Button>
          </Card.Body>
        </Card>
      </Col>
    
  )
}

export default Cards
