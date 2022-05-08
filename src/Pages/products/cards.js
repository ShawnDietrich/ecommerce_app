import React from 'react'

const Cards = (props) => {
  return (
    <>
      <ul >
        <li>
          <h1>{props.product.prodName}</h1>
        </li>
        <li>{props.product.desc}</li>
        <li>{props.product.price}</li>
      </ul>
    </>
  )
}

export default Cards
