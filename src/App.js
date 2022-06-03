import './App.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavHeader from './Pages/Components/nav/nav'
import Header from './Pages/Components/header/header'
import Products from './Pages/products/products'
import Cart from './Pages/cart/cart'
import { useDispatch, useSelector } from 'react-redux'
import Services from './api/apiCalls'
import { initCart, loadCart, loadProducts } from './api/state'
import AddProduct from './Pages/addProduct/addProduct'
import Login from './Pages/login/login'

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
      sessionStorage.setItem('cartData', JSON.stringify(cart))
    }
  }, [cart])

  const handleAddToCart = async (item) => {
    dispatch(loadCart(item))
  }


  return (
    <Router>
      <NavHeader />
      <Routes>
        <Route path="/" element={<Header />} />
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
