import './App.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavHeader from './Pages/Components/nav/nav'
import Header from './Pages/Components/header/header'
import Products from './Pages/products/products'
import Cart from './Pages/cart/cart'
import { useDispatch, useSelector } from 'react-redux'
import Services from './api/apiCalls'
import { loadCart, loadProducts } from './api/state'
import AddProduct from './Pages/addProduct/addProduct'
import Login from './Pages/login/login'

function App() {
   //setup reducer and state
   const {products, cart} = useSelector((state) => state.userState)
   const dispatch = useDispatch()
   const ProdServInst = new Services()
 
   //effect to load in all products from database
   useEffect(() => {
    async function fetchProducts() {
      //console.log('getting products')
      const response = await ProdServInst.getAllProducts()
      //console.log(response)
      dispatch(loadProducts(response))
    }
    fetchProducts()
  }, [])

   const handleAddToCart = async (item) => {
      //add item to cart state
      await dispatch(loadCart(item))
      sessionStorage.setItem("cartData", JSON.stringify(cart))
   }

   const loadCartData = (data) => [
     dispatch(loadCart(data))
   ]

  return (
    <Router>
      <NavHeader />
      <Routes>
        <Route path='/' element={<Header />}/>
        <Route path="/products" element={<Products products={products} onClick = {handleAddToCart}/>} />
        <Route path="/checkout" element={<Cart onLoad={loadCartData}/>} />
        <Route path="/addprod" element={<AddProduct/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
