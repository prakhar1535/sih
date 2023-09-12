import React from 'react'
import About from './pages/About'
import UpperNavbar from './components/uppernavbar'
import Background from './components/background'
import Sidenavbar from './components/sidenavbar'
import './App.css'


function App() {
  return (
    <div>
    
    <Background/>
      <UpperNavbar />

      <div className='grid grid-cols-3 '>
      <Sidenavbar/>
    
      <About/>

      </div>      

</div>
  )
}

export default App

