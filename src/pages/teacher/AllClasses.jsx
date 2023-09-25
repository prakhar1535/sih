import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';

import { useNavigate } from "react-router";
import ClassCard from "../../components/ClassCard";


const AllClasses = () => {
    const navigate=useNavigate()
    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );
      const card = (
        <React.Fragment>
       
        </React.Fragment>
      );
     
  const [classes, setclasses] = useState([]);
 
  const getClassesHandler = async () => {
    let response = await fetch("http://localhost:3000/teacher/getclasses", {
      method: "GET",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    });
    let data = await response.json();
    // console.log("data from getclassses", data);

    setclasses(data);
  };
  useEffect(() => {
    getClassesHandler();
  },[]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center',marginLeft:'-20rem' }}>
    {classes.map((classItem, index) => (
      <ClassCard key={index} Class={classItem}/>
    ))}
  </div>
  );
};

export default AllClasses;
