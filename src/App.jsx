import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import SignUp from './components/SignUp/SignUp'
import Login from './components/Login/Login'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './components/Home/Home'


function App() {


  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/home' element={<Home/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
