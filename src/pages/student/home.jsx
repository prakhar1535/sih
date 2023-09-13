import React from "react";
import styled from "styled-components";
import { ArrowRight, Bold, Pointer } from "lucide-react";
import { Coins } from "lucide-react";
import { Eye } from "lucide-react";



const Home = () => {


   
   return (
      <div>
         <Home_div>
            <Credit>
               <div 
               style={{margin: "0.75rem", 
               fontWeight: "Bold", 
               fontFamily: "Montserrat, sans-serif",
               fontSize: "1.875rem"
               }}>
                  
               Credits Earned <ArrowRight style={{display:"inline"}}/>
               
               </div>
               
               <div 
               style={{fontSize: "3.125rem", 
               padding: "10px" , 
               margin: "2rem", 
               fontFamily: "Montserrat, sans-serif",
               fontWeight: 500,
               color: "#005EAC"
               }}>
                  <center>545 <Coins color="#DAB34E" size={48} style={{display:"inline"}}/></center>
               </div>

               </Credit>
            <Views>
            <div 
               style={{margin: "0.75rem", 
               fontWeight: "Bold", 
               fontFamily: "Montserrat, sans-serif",
               fontSize: "1.875rem"
               }}>
                  
               Project Views <ArrowRight style={{display:"inline"}}/> 
               </div>

               <div 
               style={{fontSize: "3.125rem", 
               padding: "10px" , 
               margin: "2rem", 
               fontFamily: "Montserrat, sans-serif",
               fontWeight: 500,
               color: "#005EAC"
               }}>
                  <center>1.3k <Eye color="#DAB34E" size={48} style={{display:"inline"}}/></center>
               </div>
               
               
            </Views>
            <Submitted>
            <div 
               style={{margin: "0.75rem", 
               fontWeight: "Bold", 
               fontFamily: "Montserrat, sans-serif",
               fontSize: "1.35rem"
               }}>
                  
               Assigment Submitted <ArrowRight style={{display:"inline"}}/> 
               </div>
            </Submitted>
            <Issues><div 
               style={{margin: "0.75rem", 
               fontWeight: "Bold", 
               fontFamily: "Montserrat, sans-serif",
               fontSize: "1.35rem"
               }}>
                  
               Issues <ArrowRight style={{display:"inline"}}/> 
               </div>
               </Issues>
            <Pending><div 
               style={{margin: "0.75rem", 
               fontWeight: "Bold", 
               fontFamily: "Montserrat, sans-serif",
               fontSize: "1.35rem"
               }}>
                  
               Pending Assigments <ArrowRight style={{display:"inline"}}/> 
               </div>
               </Pending>
         </Home_div>
      </div>
   )
}

export default Home;

// STYLING USING STYLED COMPONENTS

const Home_div = styled.div`
   margin: 1rem;
   display: grid;
   grid-template-columns: 1fr 1fr; 
   grid-template-rows: repeat(3, auto); 
   grid-gap: 10px;
   z-index: 999;

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