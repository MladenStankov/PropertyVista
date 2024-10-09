import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EmailVerify from './pages/EmailVerify'
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './pages/Register'

const App = () => {
  const hideHeaderFooter = ['/register']
  return (
    <BrowserRouter>
      {!hideHeaderFooter.includes(location.pathname) && <Header />}

        <main>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/verify-email/:token' element={<EmailVerify />}/>
            <Route path='register' element={<Register/>}/>
          </Routes>
        </main>

        {!hideHeaderFooter.includes(location.pathname) && <Footer />}
    </BrowserRouter>
  )
}

export default App
