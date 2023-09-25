import {
  Button,
  Card,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { teacherstate } from "../../store/Teacher";
import { loadingState } from "../../store/Loading";
import { studentState } from "../../store/student/Student";
import { UserAs } from "../../store/UserAs";


const StudentLogin = () => {
  
  let navigate = useNavigate();

  let studentDetails = useRecoilState(studentState)[0];
  // const userAs=useRecoilState(UserAs)[0]
  const setUserAs=useSetRecoilState(UserAs)
  let loading = useRecoilState(loadingState)[0];
  let setloading = useSetRecoilState(loadingState);
  // console.log(studentDetails, "from stundetnlogin...student details");
  // console.log(loading,'from teacherdetails..loading');

  let setstudentDetails = useSetRecoilState(studentState);

  // console.log('from signin ')
useEffect(()=>{
setUserAs({loggedInAsStudent:true})
},[])
  const nameChangeHandler = (e) => {
    setstudentDetails((prevUserDetails) => ({
      ...prevUserDetails,
      name: e.target.value,
    }));
  };

  const passChangeHandler = (e) => {
    setstudentDetails((prevUserDetails) => ({
      ...prevUserDetails,
      password: e.target.value,
    }));
  };
  const emailChangeHandler = (e) => {
    setstudentDetails((prevUserDetails) => ({
      ...prevUserDetails,
      email: e.target.value,
    }));
  };

  const signinHandler = async () => {
    // console.log("Signup Handler Called");
    // console.log(
    //   studentDetails.email,
    //   studentDetails.password,
    //   studentDetails.name
    // );

    if (
      studentDetails.email.length > 0 &&
      studentDetails.email.includes("@") &&
      studentDetails.password.length > 0
    ) {
      try {
        let response;
        setloading({ isLoading: true });
        const studentDetail = {
          name: studentDetails.name,
          email: studentDetails.email,
          password: studentDetails.password,
        };

        response = await fetch("http://localhost:3000/student/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studentDetail),
        });
        if (!response.ok) {
          throw new Error("Student Does Not Exists");
        }

        const data = await response.json();
        // console.log(data);
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          setloading({ isLoading: false });
          
const updatedCollegeDetails = {
    ...studentDetails.collegeDetails, 
    collegeId: data.college.name, 
  };
          setstudentDetails((prevUserDetails) => ({
            ...prevUserDetails,
            isLoggedIn: true,
            collegeDetails: updatedCollegeDetails  //we did this bcoz of immutability of nested recoil object in atoms, we update the complete nested obj
          }));
          // console.log(studentDetails, "after recieving data");
          navigate("/student/home");
        }, 2000);
      } catch (error) {
        console.error("Error during signup:", error);
        setloading({ loading: false });
        // Handle error scenarios or show error message to the user.
      }
    } else {
      let errorMessage = "";

      if (studentDetails.email.length === 0) {
        errorMessage = "Please enter a valid email.";
      } else if (!studentDetails.email.includes("@")) {
        errorMessage = "Invalid email format.";
      } else if (studentDetails.password.length === 0) {
        errorMessage = "Please enter a password.";
      }

      alert(errorMessage);
    }
  };
  return (
    <>
      <Typography
        variant="h6"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "7.5rem",
        }}
      >
        Welcome to StudySync SignUp Below
      </Typography>
      <Card
        style={{
          height: "50vh", // Remove fixed height
          width: "30vw", // Adjust the card's width as needed
          // marginTop:'-', // Center horizontally
          padding: "1rem 1.5rem",
          display: "flex", // Use flex display
          flexDirection: "column", // Stack elements vertically
          alignItems: "center", // Center content horizontally
          justifyContent: "center", // Center content vertically
        }}
      >
        <TextField
          onChange={nameChangeHandler}
          fullWidth
          id="outlined-basic"
          label="Name"
          variant="outlined"
          style={{ margin: "1.5rem 0" }}
        />
        <TextField
          onChange={emailChangeHandler}
          fullWidth
          id="outlined-basic"
          label="email"
          variant="outlined"
        />
        <TextField
          onChange={passChangeHandler}
          fullWidth
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Typography variant="subtitle2" style={{ marginTop: "1rem" }}>
            Not a student?
          </Typography>
          <Button
            style={{ marginTop: ".7rem" }}
            onClick={() => {
              navigate("/student/signup");
            }}
            size="small"
            variant="contained"
          >
            Sign Up
          </Button>
        </div>

        <Button
          onClick={signinHandler}
          variant="contained"
          size="medium"
          style={{ margin: "1rem 0" }}
        >
          {loading.isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sign In"
          )}
        </Button>
      </Card>
    </>
  );
};

export default StudentLogin;
