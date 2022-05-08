import React from 'react'
import Cards from './cards'
import Card from './cards'

import { productsArray } from './tempDB'
//Add server call when loaded to populate the cards



//Use ( ) instead of { } for the arrow function in the .map
//This will render the Cards component using { } will not render Cards
const Products = () => {
  return (
    <>
      {productsArray.map((product, index) => (
        <Cards
        className={product.prodName}
        key={index}
        product={product}
        />
      ))}
    </>
  )
}

export default Products
