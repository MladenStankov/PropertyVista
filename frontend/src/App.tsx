import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EmailVerify from './pages/EmailVerify'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/verify-email/:token' element={<EmailVerify />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
