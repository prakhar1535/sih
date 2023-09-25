import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { teacherstate } from "../../store/Teacher";
import { loadingState } from "../../store/Loading";
import { UserAs } from "../../store/UserAs";

const TeacherSignup = () => {
  const [colleges, setcolleges] = useState([]);
  const [departments, setdepartments] = useState([]);
  let navigate = useNavigate();
  const [inputloading, setinputloading] = useState(false);
  let teacherDetails = useRecoilState(teacherstate)[0];
  let loading = useRecoilState(loadingState)[0];
  let setloading = useSetRecoilState(loadingState);
  const setUserAs=useSetRecoilState(UserAs)
  // console.log(teacherDetails ,'from teacherlogin...teacher details');
  // console.log(loading,'from teacherdetails..loading');

  let setteacherdetails = useSetRecoilState(teacherstate);
  useEffect(()=>{
    setUserAs({loggedInAsStudent:false})
    },[])
  // console.log('from signin ')

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
  const collegeChangeHandler = (e) => {
    setteacherdetails((prevUserDetails) => ({
      ...prevUserDetails,
      college: e.target.value,
    }));
  };
  const departmentChangeHandler = (e) => {
    setteacherdetails((prevUserDetails) => ({
      ...prevUserDetails,
      department: e.target.value,
    }));
  };
  const contactNumberChangeHandler = (e) => {
    setteacherdetails((prevUserDetails) => ({
      ...prevUserDetails,
      contactNumber: e.target.value,
    }));
  };

  const signupHandler = async () => {
    // console.log("Signup Handler Called");
    // console.log(teacherDetails.email,teacherDetails.password,teacherDetails.name);

    if (
      teacherDetails.email.length > 0 &&
      teacherDetails.email.includes("@") &&
      teacherDetails.password.length > 0
    ) {
      try {
        let response;
        setloading({ isLoading: true });
        const teacherdetail = {
          name: teacherDetails.name,
          password: teacherDetails.password,
          college: teacherDetails.college,
          email: teacherDetails.email,
          dept: teacherDetails.department,
          contactNumber: teacherDetails.contactNumber,
        };

        response = await fetch("http://localhost:3000/teacher/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teacherdetail),
        });
        if (!response.ok) {
          throw new Error("Teacher Does Not Exists");
        }

        const data = await response.json();
        // console.log(data);
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          setloading({ isLoading: false });
          // console.log("loading false done");
          setteacherdetails((prevUserDetails) => ({
            ...prevUserDetails,
            isLoggedIn: true,
          }));
          navigate("/teacher/home");
        }, 2000);
      } catch (error) {
        console.error("Error during signup:", error);
        setloading({ loading: false });
        // Handle error scenarios or show error message to the user.
      }
    } else {
      let errorMessage = "";

      if (teacherDetails.email.length === 0) {
        errorMessage = "Please enter a valid email.";
      } else if (!teacherDetails.email.includes("@")) {
        errorMessage = "Invalid email format.";
      } else if (teacherDetails.password.length === 0) {
        errorMessage = "Please enter a password.";
      }

      alert(errorMessage);
    }
  };
  const handleCollegeFocus = async () => {
    setinputloading(true);
    let response = await fetch("http://localhost:3000/allColleges");
    let data = await response.json();
    setTimeout(() => {
        
        setinputloading(false);
    }, 1500);
    setcolleges(data.colleges);
  };
  const handleDepartmentFocus = async () => {
    setinputloading(true);
    let response = await fetch("http://localhost:3000/alldepartments");
    let data = await response.json();
  
    setTimeout(() => {
        
        setinputloading(false);
    }, 1500);
    setdepartments(data.courses);
  };
  // console.log(teacherDetails);
  return (
    <>
      <Typography
        variant="h6"
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        Welcome to StudySync SignUp Below
      </Typography>
      <Card
        style={{
          height: "90vh",
          width: "40vw",
          marginLeft: "-5rem",
          padding: "1rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          onChange={nameChangeHandler}
          fullWidth
          id="outlined-basic"
          label="Name"
          variant="outlined"
          style={{ margin: ".6rem 0" }}
        />
        <TextField
          onChange={emailChangeHandler}
          fullWidth
          id="outlined-basic"
          label="email"
          variant="outlined"
          style={{ margin: ".6rem 0" }}
        />
        <TextField
          onChange={passChangeHandler}
          fullWidth
          id="outlined-basic"
          label="Password"
          variant="outlined"
          style={{ margin: ".6rem 0" }}
        />
        <FormControl fullWidth variant="outlined" style={{ margin: ".6rem 0" }}>
          <InputLabel>College</InputLabel>
          <Select
            onFocus={handleCollegeFocus}
            onChange={collegeChangeHandler}
            label="College"
          >
            {inputloading ? (
              <CircularProgress style={{marginLeft:'50%'}} size={24} color="inherit" />
            ) : (
              colleges.map((college) => (
                <MenuItem key={college._id} value={college._id}>
                  {college.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" style={{ margin: ".6rem 0" }}>
          <InputLabel>Department</InputLabel>
          <Select
            onFocus={handleDepartmentFocus}
            onChange={departmentChangeHandler}
            label="Department"
          >
            {inputloading ? (
              <CircularProgress style={{marginLeft:'50%'}} size={24} color="inherit" />
            ) : (
              departments.map((department) => (
                <MenuItem key={department._id} value={department._id}>
                  {department.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <TextField
          onChange={contactNumberChangeHandler}
          fullWidth
          id="outlined-basic"
          label="Contact Number"
          variant="outlined"
          style={{ margin: ".6rem 0" }}
        />
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Typography variant="subtitle2" style={{ marginTop: "1rem" }}>
            Not a Teacher?
          </Typography>
          <Button
            style={{ marginTop: ".7rem" }}
            onClick={() => {
              navigate("/teacher/login");
            }}
            size="small"
            variant="contained"
          >
            Sign In
          </Button>
        </div>

        <Button
          onClick={signupHandler}
          variant="contained"
          size="medium"
          style={{ margin: "1rem 0" }}
        >
          {loading.isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </Card>
    </>
  );
};

export default TeacherSignup;
