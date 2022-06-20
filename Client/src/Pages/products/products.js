

import React, { useEffect, useState } from 'react'
import { CardGroup, Row, Alert } from 'react-bootstrap'
import Cards from '../Components/cards/cards'
import './products.css'

const Products = (props) => {
  const products = props.products
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
  //Add server call when loaded to populate the cards

  //Use ( ) instead of { } for the arrow function in the .map
  //This will render the Cards component using { } will not render Cards
  return (
    <div className='background'>
      <div className="products">
        <Alert key={'success'} variant={'success'} show={addOrder}>
          Product Has Been Added To Your Order
        </Alert>
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
