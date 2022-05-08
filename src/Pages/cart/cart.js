import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadCart } from '../../api/state'
import Cards from '../Components/cards/cards'
import { CardGroup, Row } from 'react-bootstrap'

const Cart = () => {
  //define state
  const { cart } = useSelector((state) => state.userState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadCart())
  }, [])

  if (cart) {
    return (
      <CardGroup>
        <Row xs={1} md={2} className="g-4">
          {cart.map((item, index) => (
            <Cards className={item.prodName} key={index} product={item} />
          ))}
        </Row>
      </CardGroup>
    )
  } else {
    return <h1>No Products Added</h1>
  }
}

export default Cart
