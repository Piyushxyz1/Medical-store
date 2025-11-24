import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import { ToastContainer } from 'react-toastify';



function App() {

  return (
<div className='min-h-screen bg-base-200 transition-colors duration-300 ' >
<Navbar/>
<Routes>
  <Route path='/' element = {<HomePage/>}/>
  <Route path='/product/:id' element = {<ProductPage/>}/>
</Routes>
<ToastContainer position= "top-center"autoClose = {2000}/>
</div>
  )
}

export default App
