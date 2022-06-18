import React from 'react'
import { Container } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import ringIcon from '../../../images/wedding-rings.png' //<a href="https://www.flaticon.com/free-icons/wedding-rings" title="wedding rings icons">Wedding rings icons created by Freepik - Flaticon</a>
const NavHeader = () => {
 
  return (
    <Navbar bg="dark" variant='dark' expand="lg" sticky='top'>
      <Container fluid> 
        <Navbar.Brand >
            <img src={ringIcon}
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
            <Nav.Link href='/checkout'>Order</Nav.Link>
            <Nav.Link href="/login">Store Owner</Nav.Link>            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavHeader
