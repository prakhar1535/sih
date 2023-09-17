import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UpperNavbar from './components/student/uppernavbar';
import Background from './components/student/background';
import Sidenavbar from './components/student/sidenavbar';
import './App.css';
import Homestudent from './pages/student/home';
import SubmitAssignment from './pages/student/submitassignment'
import Browseprojects from './pages/student/Browseprojects';
import Leaderboard from './pages/student/leaderboard';
import Analytics from './pages/student/Analytics';
import Collegeportal from './pages/student/Collegeportal';
import Settings from './pages/student/Settings';

function App() {

let flex_dir = null
let windowiwdth = window.screen.width
if(windowiwdth <= 768){
  flex_dir = "flex flex-col"
}
else{
  flex_dir = "flex"
}

  return (
    <BrowserRouter>
      <div>
        <Background />
        <UpperNavbar />
        <div className={`${flex_dir}`}>
          <Sidenavbar />
          <div className='grid col-span-3 md:col-span-2 md:ml-[20rem]'>
            
            <Routes>
              <Route path="/" element={<Homestudent/>} />
              <Route path="/submit" element={<SubmitAssignment/>} />
              <Route path="/leaderboard" element={<Leaderboard/>} />
              <Route path="/projects" component={<Browseprojects/>} />
              <Route path="/analytics" component={<Analytics/>} />
              <Route path="/portal" component={<Collegeportal/>} />
              <Route path="/settings" component={<Settings/>} />
              
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
