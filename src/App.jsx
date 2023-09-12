import React from 'react';
import UpperNavbar from './components/student/uppernavbar';
import Background from './components/student/background';
import Sidenavbar from './components/student/sidenavbar';
import './App.css';
import Homestudent from './pages/student/home';

function App() {
  return (
    <div>
      <Background />
      <UpperNavbar />
      <div className='grid grid-cols-3'>
        <Sidenavbar />
        <div className='col-span-3 md:col-span-2'> 
          <Homestudent />
        </div>
      </div>
    </div>
  );
}

export default App;
