
import { CardGroup, Row } from 'react-bootstrap'
import Cards from '../Components/cards/cards'
import './products.css'

const Products = (props) => {
  const products = props.products

  //event handler for adding products to cart
  const handleAddCart = (e) => {
    e.preventDefault()
    const id = Number(e.target.id)
    products.map((product) => {
      if (product.id === id) {
        props.onClick(product)
      }
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
