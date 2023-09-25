import React, { useEffect } from 'react'
import { ArrowRight, Bold, Pointer } from "lucide-react";
import { Coins } from "lucide-react";
import { Eye } from "lucide-react";
import { Check } from "lucide-react";
import { Ban } from "lucide-react";
import { Clock} from "lucide-react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from 'recoil';
import { teacherstate } from '../../store/Teacher';
import { useNavigate } from 'react-router';



const TeacherHome = () => {
   const navigate=useNavigate()
   const teacherdetails=useRecoilState(teacherstate)[0];
   const setTeacherDetails=useSetRecoilState(teacherstate)
  //  console.log(teacherdetails ,'asdas');
   const meRouteHandler=async()=>{
      // console.log('me route for teacher');
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
        // console.log(teacherdetails,'sdasdawdasdasda');
      }
    }
    useEffect(()=>{
      
        meRouteHandler()
    },[])

  return (
    <div>
       <Home_div >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          <div>
          <Credit onClick={()=>navigate("/teacher/allClasses")}>
             <div 
             style={{margin: "0.75rem", 
             fontWeight: "Bold", 
             fontFamily: "Montserrat, sans-serif",
             fontSize: "1.875rem"
             }}>
                
             Classes Created <ArrowRight style={{display:"inline"}}/>
             
             </div>
             
             <div 
             style={{fontSize: "3.125rem", 
             padding: "10px" , 
             margin: "2rem", 
             fontFamily: "Montserrat, sans-serif",
             fontWeight: 500,
             color: "#005EAC"
             }}>
                <center>{teacherdetails.classes.length} <Coins color="#DAB34E" size={48} style={{display:"inline"}}/></center>
             </div>

             </Credit>
             </div>
             <div>
          <Views>
          <div 
             style={{margin: "0.75rem", 
             fontWeight: "Bold", 
             fontFamily: "Montserrat, sans-serif",
             fontSize: "1.875rem"
             }}>
                
             Projects Recieved <ArrowRight style={{display:"inline"}}/> 
             </div>

             <div 
             style={{fontSize: "3.125rem", 
             padding: "10px" , 
             margin: "2rem", 
             fontFamily: "Montserrat, sans-serif",
             fontWeight: 500,
             color: "#005EAC"
             }}>
                <center>{teacherdetails.projectsRecieved.length} <Eye color="#DAB34E" size={48} style={{display:"inline"}}/></center>
             </div>
             
             
          </Views>
          </div>
          <div>

          <Submitted>
          <center><div 
             style={{margin: "0.75rem", 
             fontWeight: "Bold", 
             fontFamily: "Montserrat, sans-serif",
             fontSize: "1.35rem"
             }}>
                
             Assigments <ArrowRight style={{display:"inline"}}/> 
             </div></center>
             <div 
             style={{fontSize: "3.125rem", 
             padding: "10px" , 
             margin: "2rem", 
             fontFamily: "Montserrat, sans-serif",
             fontWeight: 500,
             color: "#005EAC"
             }}>
                <center> 4/7 <Check color="#4AFF3A" size={48} style={{display:"inline"}}/></center>
                </div>

                <center> <div
  style={{
    // position: "relative",
    // width: "100%",
    backgroundColor: "#4AFF3A",
    borderRadius: " 0 0px 10px 10px",
    height: "15px",
    marginBottom: "1px",
    width: "98%",

  }}
></div></center>
             
             
          </Submitted>
          </div>
          <div>
          <Issues><center><div 
             style={{margin: "0.75rem", 
             fontWeight: "Bold", 
             fontFamily: "Montserrat, sans-serif",
             fontSize: "1.35rem"
             }}>
                
             Issues <ArrowRight style={{display:"inline"}}/> 
             </div>
             <div 
             style={{fontSize: "3.125rem", 
             padding: "10px" , 
             margin: "2rem", 
             fontFamily: "Montserrat, sans-serif",
             fontWeight: 500,
             color: "#005EAC"
             }}>
                <center> 1/7 <Ban color="#FF3A3A" size={48} style={{display:"inline"}}/></center>
                </div></center>

               <center> <div
  style={{
    // position: "relative",
    // width: "100%",
    backgroundColor: "#FF3A3A",
    borderRadius: " 0 0px 10px 10px",
    height: "15px",
    marginBottom: "1px",
    width: "98%",

  }}
></div></center>
             </Issues>
             </div>
             <div>
             <Pending>
             <center><div 
             style={{margin: "0.75rem", 
             fontWeight: "Bold", 
             fontFamily: "Montserrat, sans-serif",
             fontSize: "1.35rem"
             }}>
                
             Pending <ArrowRight style={{display:"inline"}}/> 
             </div>
             <div 
             style={{fontSize: "3.125rem", 
             padding: "10px" , 
             margin: "2rem", 
             fontFamily: "Montserrat, sans-serif",
             fontWeight: 500,
             color: "#005EAC"
             }}>
                <center> 2/7 <Clock color="#FFAE36" size={48} style={{display:"inline"}}/></center>
                </div></center>

               <center> <div
  style={{
    // position: "relative",
    // width: "100%",
    backgroundColor: "#FFAE36",
    borderRadius: " 0 0px 10px 10px",
    height: "15px",
    marginBottom: "1px",
    width: "98%",

  }}
></div></center>
             </Pending>
             </div>
             </div>
       </Home_div>
       
    </div>
 )
}



// STYLING USING STYLED COMPONENTS

const Home_div = styled.div`
 margin: 1rem;
 display: grid;
 
 grid-template-rows: repeat(3, auto); 
 grid-gap: 10px;
 z-index: 999;

 @media (max-width: 768px) {
    
    
  }
`;

const Credit = styled.div`
 background-color: white;
 border-radius: 1.2rem;
 box-shadow: 6px 11px 41px 0px rgba(0, 0, 0, 0.33);
 border: 1px solid black;
 cursor: pointer;
 
 

`;

const Views = styled.div`
background-color: white;
border-radius: 1.2rem;
box-shadow: 6px 11px 41px 0px rgba(0, 0, 0, 0.33);
border: 1px solid black;
cursor: pointer;

`;

const Pending = styled.div`
background-color: white;
border-radius: 1.2rem;
box-shadow: 6px 11px 41px 0px rgba(0, 0, 0, 0.33);
border: 1px solid black;
cursor: pointer;
`;

const Submitted = styled.div`
background-color: white;
border-radius: 1.2rem;
box-shadow: 6px 11px 41px 0px rgba(0, 0, 0, 0.33);
border: 1px solid black;
cursor: pointer;
`;

const Issues = styled.div`
background-color: white;
border-radius: 1.2rem;
box-shadow: 6px 11px 41px 0px rgba(0, 0, 0, 0.33);
border: 1px solid black;
cursor: pointer;
`;





export default TeacherHome
