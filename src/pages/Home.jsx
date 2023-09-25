import React from 'react'
import { ArrowRight, Bold, Pointer } from "lucide-react";
import { Coins } from "lucide-react";
import { Eye } from "lucide-react";
import { Check } from "lucide-react";
import { Ban } from "lucide-react";
import { Clock} from "lucide-react";
import styled from "styled-components";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

const Home = () => {
   const navigate=useNavigate()
    return (
        <div>
           Welcome toStudy Sync 
           <Button onClick={()=>{navigate("/student/login")}} variant='contained'>Continue As Stundent?</Button>
           <Button onClick={()=>{navigate("/teacher/login")}} variant='contained'>Continue As Teacher?</Button>
           
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

export default Home
