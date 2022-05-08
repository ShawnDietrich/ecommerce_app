import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavHeader from './Pages/Components/nav/nav'
import Header from './Pages/Components/header/header'
import Products from './Pages/products/products'
function App() {
  return (
      <Router>
        <NavHeader />
        <Routes>
          <Route path="/home" element = {<Header/>}/>
          <Route path='/products' element = {<Products/>} />
        </Routes>
      </Router>
  )
}

export default App
