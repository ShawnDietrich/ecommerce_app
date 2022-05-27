import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Cards = (props) => {
  const { id, name, description, price, picLocation } = props.product
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
            <Button variant="outline-dark" onClick={props.onClick} id={id}>
              Add To Cart
            </Button>
          </Card.Body>
        </Card>
      </Col>
    
  )
}

export default Cards
