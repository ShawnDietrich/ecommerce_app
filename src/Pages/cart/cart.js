import Button from 'react-bootstrap/Button'
import React from 'react'
import './cart.css'

const Cart = (props) => {
  //load items from session storage
  const cart = JSON.parse(sessionStorage.getItem('cartData'))

  const handleClear = () => {
    sessionStorage.setItem("cartData", JSON.stringify([]))
    window.location.reload()
  }

  if (cart.length > 0) {
    //present cart items in a list
    const listCart = cart.map((item, index) => (
      <li key={index}>
        {item.name} {item.price}
      </li>
    ))
    return (
      <>
        <div className="cartObjects">
          <h2>Cart Contents</h2>
          <ul className="items">{listCart}</ul>
        </div>
        <div className="btnClear">
          <Button variant="primary" size="large" onClick={handleClear}>
            Clear Cart
          </Button>
        </div>
      </>
    )
  } else {
    return (
      <>
        <h1>No Products Added</h1>
      </>
    )
  }
}

export default Cart
