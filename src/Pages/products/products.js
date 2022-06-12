

import { useEffect } from 'react'
import { CardGroup, Row } from 'react-bootstrap'
import Cards from '../Components/cards/cards'
import './products.css'

const Products = (props) => {
  const products = props.products
  let value = []

  useEffect(() => {
    for (let i = 0; i <= 10; i++) {
      value.push(i)   
    }
  }, [])



  //event handler for adding products to cart
  const handleAddCart = (e) => {
    e.preventDefault()
    const id = Number(e.target.id)
    const qty = Number(e.target.previousSibling.value)
    products.map(product => {
      if (product.id === id) {
        props.onClick({qty: qty, ...product})
        e.target.previousSibling.value = ''
      }
      return null
    })
  }
  //Add server call when loaded to populate the cards

  //Use ( ) instead of { } for the arrow function in the .map
  //This will render the Cards component using { } will not render Cards
  return (
    <>
      <div className="products">
        <CardGroup>
          <Row xs={10} md={10} className="g-4">
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
    </>
  )
}

export default Products
