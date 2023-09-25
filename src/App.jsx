import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Uppernavbar  from './components/student/Uppernavbar';
// import Background from './components/student/background';
import Sidenavbar from './components/student/sidenavbar';
import './App.css';
import Homestudent from './pages/student/StudentHome';
import SubmitAssignment from './pages/student/UploadProject'
import Browseprojects from './pages/student/Browseprojects';
import Leaderboard from './pages/student/leaderboard';
import Analytics from './pages/student/Analytics';
import Collegeportal from './pages/student/Collegeportal';
import Settings from './pages/student/Settings';
import Home from './pages/Home';
import TeacherLogin from './pages/teacher/TeacherLogin'
import { RecoilRoot, useRecoilState } from 'recoil';

import TeacherHome from './pages/teacher/TeacherHome';
import AllClasses from './pages/teacher/AllClasses';
import Class from './pages/teacher/Class';
import TeacherSignup from './pages/teacher/TeacherSignup';
import StudentProjects from './pages/teacher/StudentProjects';
import StudentProject from './pages/teacher/StudentProject';
import StudentLogin from './pages/student/StudentLogin';
import StudentHome from './pages/student/StudentHome';
import JoinClass from './pages/student/JoinClass';
import UploadProject from './pages/student/UploadProject';
import { UserAs } from './store/UserAs';
function App() {

let flex_dir = null
let windowiwdth = window.screen.width
if(windowiwdth <= 768){
  flex_dir = "flex flex-col"
}
else{
  flex_dir = "flex"
}
const userAs=useRecoilState(UserAs)[0]
  return (
   

    
    <BrowserRouter>
      <div>
        {/* <Background /> */}
        <Uppernavbar user={userAs} />
        <div className={`${flex_dir}`}>
          <Sidenavbar user={userAs} />
          <div className='grid col-span-3 md:col-span-2 md:ml-[20rem]'>
            
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/teacher/login"element={<TeacherLogin/>}/>
              <Route path="/teacher/signup"element={<TeacherSignup/>}/>
              <Route path='/teacher/home'element={<TeacherHome/>}/>
              <Route path='/teacher/allClasses' element={<AllClasses/>}/>
              <Route path='/teacher/allClasses/:classId' element={<Class/>}/>
              <Route path='/teacher/allClasses/:classId/student/:studentId' element={<StudentProjects/>}/>
              <Route path='/teacher/allClasses/:classId/student/:studentId/:projectId' element={<StudentProject/>}/>
              <Route path='/student/login' element={<StudentLogin/>}/>
              <Route path='/student/home' element={<StudentHome/>}/>
              <Route path='/student/joinClass' element={<JoinClass/>}/>
              <Route path='/student/uploadProject' element={<UploadProject/>}/>

              {/* <Route path="/submit" element={<SubmitAssignment/>} />
              <Route path="/leaderboard" element={<Leaderboard/>} />
              <Route path="/projects" element={<Browseprojects/>} />
              <Route path="/analytics" element={<Analytics/>} />
              <Route path="/portal" element={<Collegeportal/>} />
              <Route path="/settings" element={<Settings/>} /> */}
              
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  
  );
}

export default App;
