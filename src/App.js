import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavHeader from './Pages/Components/nav/nav'
import Header from './Pages/Components/header/header'
import Products from './Pages/products/products'
import { useReducer } from 'react'
import UserStateContext, { initialState, stateReducer } from './api/state'
import Cart from './Pages/cart/cart'
function App() {
  return (
    <Router>
      <NavHeader />
      <Routes>
        <Route path="/home" element={<Header />} />
        <Route path="/products" element={<Products />} />
        <Route path="/checkout" element={<Cart />} />
      </Routes>
    </Router>
  )
}

export default App
