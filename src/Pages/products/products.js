import React, { useContext, useEffect, useReducer } from 'react'
import { CardGroup, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import UserStateContext, { addToCart, loadProducts } from '../../api/state'
import Cards from '../Components/cards/cards'
import { cartArray, productsArray } from './tempDB'

const Products = () => {
  //setup reducer and state
  const { products, cart } = useSelector((state) => state.userState)
  const dispatch = useDispatch()

  //effect to load in all products from database
  useEffect(() => {
    dispatch(loadProducts(productsArray))
  }, [])

  //event handler for adding products to cart
  const handleAddCart = (e) => {
    e.preventDefault()
    const id = Number(e.target.id)
    //console.log(products)
    const item = products.map((item) => {
      if (item.id === id) {
        //call add to cart endpoint
      }
    })
  }
  //Add server call when loaded to populate the cards

  //Use ( ) instead of { } for the arrow function in the .map
  //This will render the Cards component using { } will not render Cards
  return (
    <>
      <CardGroup>
      <Row xs={10} md={10} className="g-4">
        {products.map((product, index) => (
          <Cards
            className={product.prodName}
            key={index}
            product={product}
            onClick={handleAddCart}
          />
        ))}
        </Row>
      </CardGroup>
    </>
  )
}

export default Products
