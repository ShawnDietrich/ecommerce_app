import './App.css'
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavHeader from './Pages/Components/nav/nav'
import Products from './Pages/products/products'
import Cart from './Pages/cart/cart'
import { useDispatch, useSelector } from 'react-redux'
import Services from './api/apiCalls'
import { initCart, addToCart, loadProducts } from './api/state'
import AddProduct from './Pages/addProduct/addProduct'
import Login from './Pages/login/login'
import Home from './Pages/Home/home'

function App() {
  //setup reducer and state
  const { products, cart } = useSelector((state) => state.userState)
  const dispatch = useDispatch()
  const ProdServInst = new Services()

  //Setup session storage only runs once
  useEffect(() => {
    const isNew = sessionStorage.getItem('isNew')
    if (isNew !== 'true') {
      sessionStorage.setItem('isNew', true)
      sessionStorage.setItem('cartData', JSON.stringify([]))
      sessionStorage.setItem('session', '')
    }
  }, [])

  //effect to load in all products from database
  useEffect(() => {
    async function fetchProducts() {
      const response = await ProdServInst.getAllProducts()
      dispatch(loadProducts(response))
    }
    function loadCart() {
      const cartData = JSON.parse(sessionStorage.getItem('cartData'))
      if (cartData.length > 0 && cart.length === 0) {
        dispatch(initCart(cartData))
      }
    }
    loadCart()
    fetchProducts()
  }, [])

  //loading the session storage from state
  useEffect(() => {
    if (cart.length > 0) {

    }
  }, [cart])

  const handleAddToCart = (item) => {
    //console.log(item)
    const foundItem = cart.find(element => element.id === item.id)
    if(!foundItem){
       dispatch(addToCart(item))
    }
  }


  return (
    <Router>
      <NavHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={<Products products={products} onClick={handleAddToCart} />}
        />
        <Route path="/checkout" element={<Cart />} />
        <Route path="/addprod" element={<AddProduct />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
