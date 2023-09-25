import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowRight, Bold, Pointer } from "lucide-react";
import { Coins } from "lucide-react";
import { Eye } from "lucide-react";
import { Check } from "lucide-react";
import { Ban } from "lucide-react";
import { Clock } from "lucide-react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { studentState } from "../../store/student/Student";
import { useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";

const StudentHome = () => {
  const navigate = useNavigate();
  const[loading,setloading]=useState(false)
  const studentDetails = useRecoilState(studentState)[0];
  const setstudentDetails = useSetRecoilState(studentState);

  const studentMeRouteHandler = async () => {
   setloading(true)
    const response = await fetch("http://localhost:3000/student/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setloading(false)
    // console.log(studentDetails, "from stundet home before set");
    // console.log(data, "from stundet me");
    // console.log(data.classesJoined, "from stundet meeeeeeeee");
   //  setstudentDetails(data);
    setstudentDetails((prevUserDetails) => ({
      _id:data._id,
      classesJoined: data.classesJoined,
      collegeDetails: {
        collegeId:data.collegeDetails.collegeId,
        courseEnrolled:data.collegeDetails.courseEnrolled,
        enrollmentNumber:data.collegeDetails.enrollmentNumber

      },
      email: data.email,
      name: data.name,
      password: data.password,
      projectsUploaded: data.projectsUploaded,
    }));
    // console.log(studentDetails, "from stundet home after set");
  };
  useEffect(() => {
    studentMeRouteHandler();
  }, []);

  return (
   
   <>
   {loading && <CircularProgress style={{position:'absolute',top:'50%'}}/>}
    {!loading && <div>
      <Home_div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ">
          <div>
            <Credit>
              <div
                style={{
                  margin: "0.75rem",
                  fontWeight: "Bold",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1.875rem",
                }}
              >
                Credits Earned <ArrowRight style={{ display: "inline" }} />
              </div>

              <div
                style={{
                  fontSize: "3.125rem",
                  padding: "10px",
                  margin: "2rem",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  color: "#005EAC",
                }}
              >
                <center>
                  545{" "}
                  <Coins
                    color="#DAB34E"
                    size={48}
                    style={{ display: "inline" }}
                  />
                </center>
              </div>
            </Credit>
          </div>
          <div>
            <Views>
              <div
                style={{
                  margin: "0.75rem",
                  fontWeight: "Bold",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1.875rem",
                }}
              >
                Project Views <ArrowRight style={{ display: "inline" }} />
              </div>

              <div
                style={{
                  fontSize: "3.125rem",
                  padding: "10px",
                  margin: "2rem",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  color: "#005EAC",
                }}
              >
                <center>
                  1.3k{" "}
                  <Eye
                    color="#DAB34E"
                    size={48}
                    style={{ display: "inline" }}
                  />
                </center>
              </div>
            </Views>
          </div>
          <div>
            <Submitted>
              <center>
                <div
                  style={{
                    margin: "0.75rem",
                    fontWeight: "Bold",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "1.35rem",
                  }}
                >
                  Projects Submitted{" "}
                  <ArrowRight style={{ display: "inline" }} />
                </div>
              </center>
              <div
                style={{
                  fontSize: "3.125rem",
                  padding: "10px",
                  margin: "2rem",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  color: "#005EAC",
                }}
              >
                <center>
                  {studentDetails.projectsUploaded? studentDetails.projectsUploaded.length:0}
                  {/* {studentDetails.projectsUploaded.length}{" "} */}
                  <Check
                    color="#4AFF3A"
                    size={48}
                    style={{ display: "inline" }}
                  />
                </center>
              </div>

              <center>
                {" "}
                <div
                  style={{
                    // position: "relative",
                    // width: "100%",
                    backgroundColor: "#4AFF3A",
                    borderRadius: " 0 0px 10px 10px",
                    height: "15px",
                    marginBottom: "1px",
                    width: "98%",
                  }}
                ></div>
              </center>
            </Submitted>
          </div>
          <div>
            <Issues>
              <center>
                <div
                  style={{
                    margin: "0.75rem",
                    fontWeight: "Bold",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "1.35rem",
                  }}
                >
                  Classes Joined <ArrowRight style={{ display: "inline" }} />
                </div>
                <div
                  style={{
                    fontSize: "3.125rem",
                    padding: "10px",
                    margin: "2rem",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                    color: "#005EAC",
                  }}
                >
                  <center> {studentDetails.classesJoined.length} </center>
                </div>
              </center>

              <center>
                {" "}
                <div
                  style={{
                    // position: "relative",
                    // width: "100%",
                    backgroundColor: "#FF3A3A",
                    borderRadius: " 0 0px 10px 10px",
                    height: "15px",
                    marginBottom: "1px",
                    width: "98%",
                  }}
                ></div>
              </center>
            </Issues>
          </div>
          <div>
            <Pending onClick={() => navigate("/student/joinClass")}>
              <center>
                <div
                  style={{
                    margin: "0.75rem",
                    fontWeight: "Bold",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "1.35rem",
                  }}
                >
                  Join A Class <ArrowRight style={{ display: "inline" }} />
                </div>
              </center>

              <center>
                {" "}
                <div
                  style={{
                    // position: "relative",
                    // width: "100%",
                    backgroundColor: "#FFAE36",
                    borderRadius: " 0 0px 10px 10px",
                    height: "15px",
                    marginBottom: "1px",
                    width: "98%",
                  }}
                ></div>
              </center>
            </Pending>
            <Pending style={{position: "absolute",
                    bottom: "5.5rem",
                    right: "18rem",height:'35px'}} onClick={() => navigate("/student/uploadProject")}>
              <center>
                <div
                  style={{
                    
                    marginLeft: "0.75rem",
                    fontWeight: "Bold",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "1.35rem",
                  }}
                >
                  Upload Project <ArrowRight style={{ display: "inline" }} />
                </div>
              </center>

              <center>
                {" "}
                <div
                  style={{
                    backgroundColor: "#FFAE36",
                    borderRadius: " 0 0px 10px 10px",
                    height: "15px",
                    marginBottom: "1px",
                    width: "98%",
                  }}
                ></div>
              </center>
            </Pending>
          </div>
        </div>
      </Home_div>
    </div>}
    
    </>
  );
};

export default StudentHome;

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
