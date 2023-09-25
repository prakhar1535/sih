import React, { useEffect } from 'react';
import { User } from 'lucide-react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { teacherstate } from '../../store/Teacher';
import { studentState } from '../../store/student/Student';

export default function Uppernavbar({user}) {
let teacherState=useRecoilState(teacherstate)[0]
const studentDetails=useRecoilState(studentState)[0]
const setStudentDetails=useSetRecoilState(studentState)
// console.log(teacherState,'from upper');
// let loggedInStatus=useRecoilState(teacherstate)[0].isLoggedIn
// console.log(loggedInStatus,'from uppper ');

const setTeacherDetails=useSetRecoilState(teacherstate)

const meRouteHandlerForStudent=async()=>{
  // console.log('me route');
  let response= await fetch("http://localhost:3000/student/me",{
    method:"GET" ,
    headers:{Authorization:`Bearer ${localStorage.getItem("token")}`,
    "Content-Type":"application/json"
  }
  })
  if(response.ok){
    let data= await response.json()
    // console.log('data from uppernav');
    // console.log(data);
    // console.log(data.email,data.password,data.college.name);
    setStudentDetails((prevUserDetails) => ({
      ...prevUserDetails,
      _id:data._id,
      name: data.name,
      email: data.email,
      password: data.password,
      collegeDetails: {
          enrollmentNumber: data.collegeDetails.enrollmentNumber,
          collegeId: data.collegeDetails.collegeId,
          courseEnrolled: data.collegeDetails.courseEnrolled
      },
      classesJoined:data.classesJoined,
      projectsUploaded:data.projectsUploaded,
      isLoggedIn: true,
    
    }));
  
    // console.log('from detch in upper');
    // console.log(studentDetails);
  }
}
const meRouteHandlerForTeacher=async()=>{
  // console.log('me route');
  let response= await fetch("http://localhost:3000/teacher/me",{
    method:"GET" ,
    headers:{Authorization:`Bearer ${localStorage.getItem("token")}`,
    "Content-Type":"application/json"
  }
  })
  if(response.ok){
    let data= await response.json()
    // console.log('data from uppernav');
    // console.log(data);
    // console.log(data.email,data.password,data.college.name);
    setTeacherDetails((prevUserDetails) => ({
      ...prevUserDetails,
      _id:data._id,
      isLoggedIn:true,
      email:data.email,
      password:data.password,
      name:data.name,
      college:data.college.name,
      classes:data.classes,
      projectsRecieved:data.projectsRecieved
      ,
    }));
  
    // console.log('from detch in upper');
    // console.log(teacherState);
  }
}
if(!user.loggedInAsStudent){
  useEffect(()=>{
  
    // console.log('from useeff in upper');
    meRouteHandlerForTeacher()
  
 
},[])
  
}
else{
  useEffect(()=>{
  
    // console.log('from useeff in upper');
    meRouteHandlerForStudent()
  
 
},[])

}

const Details = [
  {
    id: 1,
    Rollno: "02614804922",
    Name: "Prakhar Sharma",
    College: "Maharaja Agrasen of institute of technology"
  },
  {
    id: 2,
    Rollno: "02714804922",
    Name: "Saksham Sharma",
    College: "Maharaja Agrasen of institute of technology"
  },
  {
    id: 3,
    Rollno: "02814804922",
    Name: "Shlok Sharma",
    College: "Maharaja Agrasen of institute of technology"
  },
]

const NewDetails = Details.filter((student) => student.id === 1);

  return (
    <div className="navbar"
    style={{ backgroundColor: '#E4F0FF'}}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a>Item 1</a></li>
            <li>
              <a>Parent</a>
              <ul className="p-5">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
      </div>
      <div className="navbar-start hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex-nowrap">
          <li tabIndex={2}>
            <details>
              <summary><User color="black" size={20} />Profile</summary>
              <ul className="p-2">
              <li className='w-40 text-red-500 font-bold'>{teacherState.name}</li>
                <li className='w-40 text-red-500 font-bold'><a >Sign out</a></li>
                <li><a>Settings</a></li>
              </ul>
            </details>
          </li>
          {NewDetails.map((student, index) => (
            <li key={index}>
              <a>{student.Rollno}</a>
            </li>
          ))}
           <li>{teacherState.college}</li>

        </ul>
      </div> 
      
    
    </div>
  );
}
