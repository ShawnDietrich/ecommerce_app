import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import icon from '../../../images/bowl.png' //<a href="https://www.flaticon.com/free-icons/clay" title="clay icons">Clay icons created by Eucalyp - Flaticon</a>
 let addProdvis = false
const NavHeader = () => {
 
  useEffect(() => {
    const userEmail = sessionStorage.getItem("userEmail")
    if(userEmail !== null){
      addProdvis = true
    }
    
  })
  return (
    <Navbar bg="dark" variant='dark' expand="lg" sticky='top'>
      <Container fluid> 
        <Navbar.Brand >
            <img src={icon}
            width="30"
            height="30"
            className='d-inline-block align-top'
            alt='Icon'
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href='/checkout'>Checkout</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            {addProdvis &&
            <Nav.Link href="/addprod" >Add Product</Nav.Link>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavHeader
