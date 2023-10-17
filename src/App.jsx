import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Images from './pages/Images'

const App = () => {
  return (
    <div className='lg:px-12 md:px-8 sm:px-4 xs:px-2 flex flex-col'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/images' element={<Images />}/>
        {/* <Route path='/search' element={<Home />}/> */}
      </Routes>
    </div>
  )
}

export default App
