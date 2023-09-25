import { Button, Card, TextField, Typography , CircularProgress} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { teacherstate } from '../../store/Teacher'
import { loadingState } from '../../store/Loading'
import { UserAs } from '../../store/UserAs'

const TeacherLogin = () => {
    let navigate=useNavigate()
    const setUserAs=useSetRecoilState(UserAs)
    
    let teacherDetails= useRecoilState(teacherstate)[0]
    let loading= useRecoilState(loadingState)[0]
    let setloading=useSetRecoilState(loadingState)
    
    // console.log(teacherDetails ,'from teacherlogin...teacher details');
    // console.log(loading,'from teacherdetails..loading');
    
    let setteacherdetails=useSetRecoilState(teacherstate)
  
    
    // console.log('from signin ')
    useEffect(()=>{
      setUserAs({loggedInAsStudent:false})
      },[])
  
    const nameChangeHandler = (e) => {
        setteacherdetails((prevUserDetails) => ({
            ...prevUserDetails,
            name: e.target.value,
          }));
    };
    
  
    const passChangeHandler = (e) => {
        setteacherdetails((prevUserDetails) => ({
            ...prevUserDetails,
            password: e.target.value,
          }));
    };
    const emailChangeHandler = (e) => {
        setteacherdetails((prevUserDetails) => ({
            ...prevUserDetails,
            email: e.target.value,
          }));
    };
  
    const signinHandler = async () => {
      console.log('Signup Handler Called');
      // console.log(teacherDetails.email,teacherDetails.password,teacherDetails.name);

  if(teacherDetails.email.length>0&&teacherDetails.email.includes('@') &&teacherDetails.password.length>0){
    try {
        let response;
        setloading({isLoading:true})
        const teacherdetail= {
            name:teacherDetails.name,
            email:teacherDetails.email,
            password:teacherDetails.password
        }
       
          response = await fetch('http://localhost:3000/teacher/login', {
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                },
                body:JSON.stringify(teacherDetails)
          });
          if(!response.ok){
            throw new Error("Teacher Does Not Exists")
            
        }
  
        const data = await response.json();
        // console.log(data);
        localStorage.setItem('token', data.token);
        setTimeout(() => {
            setloading({isLoading:false})
            setteacherdetails((prevUserDetails) => ({
                ...prevUserDetails,
                isLoggedIn:true,
                college:data.college.name

            
              }));
            navigate("/teacher/home")
        }, 2000);
      } catch (error) {
        console.error('Error during signup:', error);
        setloading({loading:false})
        // Handle error scenarios or show error message to the user.
      }
    }else{
        let errorMessage = '';

    if (teacherDetails.email.length === 0) {
      errorMessage = 'Please enter a valid email.';
    } else if (!teacherDetails.email.includes('@')) {
      errorMessage = 'Invalid email format.';
    } else if (teacherDetails.password.length === 0) {
      errorMessage = 'Please enter a password.';
    }

    alert(errorMessage);
    }
   
    

  }
  return (
    <>

    <Typography variant='h6' style={{display:'flex',justifyContent:'center',marginTop:'7.5rem'}}>Welcome to StudySync SignUp Below</Typography>
    <Card
  style={{
    height: '50vh', // Remove fixed height
    width: '30vw',   // Adjust the card's width as needed
    // marginTop:'-', // Center horizontally
    padding: '1rem 1.5rem',
    display: 'flex', // Use flex display
    flexDirection: 'column', // Stack elements vertically
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
  }}
>
      <TextField  onChange={nameChangeHandler} fullWidth id="outlined-basic" label="Name" variant="outlined"style={{margin:'1.5rem 0'}} />
      <TextField onChange={emailChangeHandler} fullWidth id="outlined-basic" label="email" variant="outlined" />
      <TextField onChange={passChangeHandler} fullWidth id="outlined-basic" label="Password" variant="outlined" />
<div style={{display:'flex', gap:'2rem',alignItems:'center'}}>

      <Typography variant='subtitle2' style={{marginTop:'1rem'}}>Not a Teacher?</Typography>
      <Button style={{marginTop:'.7rem'}} onClick={()=>{navigate("/teacher/signup")}} size='small' variant='contained'>Sign Up</Button>
</div>
  
    
      <Button onClick={signinHandler} variant="contained" size='medium'style={{margin:'1rem 0'}}>
        {loading.isLoading? <CircularProgress size={24} color="inherit" /> :'Sign In'}
      </Button>
      
    </Card>
   
    </>
  )
}

export default TeacherLogin
