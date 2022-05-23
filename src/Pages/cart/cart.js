import React, { useEffect } from 'react'
import './cart.css'

const Cart = (props) => {
  //load items from session storage
  const cart = JSON.parse(sessionStorage.getItem('cartData'))

  useEffect(() => {
    props.onLoad(cart)
  }, [])
  //present cart items in a list
  const listCart = cart.map((item, index) => (
    <li key={index}>{item.name} {item.price}</li>
  ))
  if (cart) {
    return (
      <>
        <div className="cartObjects">
            <h2>Cart Contents</h2>
            <ul className='items'>
               {listCart}
            </ul>
           
        </div>
      </>
    )
  } else {
    return <h1>No Products Added</h1>
  }
}

export default Cart
