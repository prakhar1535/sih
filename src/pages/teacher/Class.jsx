import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/system';

const StyledDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  minHeight: '100vh',
  minWidth:"100vw",
  backgroundColor: '#f5f5f5', 
  marginLeft:'-25rem'
});

const StyledCard = styled(Card)({
  width: '60%', 
  

  minHeight: '400px',
 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft:"-5rem",
  marginBottom:"5rem",
  flexDirection: 'column',
  backgroundColor: '#ffffff', 
  boxShadow: '0px 3px 15px rgba(0,0,0,0.2)', 
});

const StyledTypography = styled(Typography)({
  marginBottom: '20px',
  fontSize: '24px', 
  fontWeight: 'bold',
});

const StyledTypography2 = styled(Typography)({
  fontSize: '20px', 
  fontWeight: 'bold',
});

const StyledListItem = styled(ListItem)({
   
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '10px',
  backgroundColor: '#f9f9f9', 
  borderRadius: '5px', 
  marginBottom: '10px',
});

const StyledTypography3 = styled(Typography)({
  marginTop: '20px',
  fontSize: '18px', 
});

const Class = () => {
    const classId = useParams();
    const [classInfo, setClassInfo] = useState(null);
  
    useEffect(() => {
      classViewHandler(classId.classId);
    }, []);
  
    const classViewHandler = async (id) => {
      let response = await fetch(`http://localhost:3000/teacher/getclasses/${id}`, {
        method: 'GET',
        headers: { authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      let data = await response.json();
      // console.log(data, 'from classview');
      setClassInfo(data.class);
    };
    const navigate=useNavigate()
    const handlestudentclickhandler=(id)=>{
      navigate(`/teacher/allClasses/${classInfo._id}/student/${id}`)
      

    }
  
    return (
      <StyledDiv>
        {classInfo && (
          <StyledCard variant="outlined">
            <CardContent>
              <StyledTypography variant="h5" component="div">
                Class Title: {classInfo.nameOfClass}
              </StyledTypography>
              <StyledTypography2 variant="h6" component="div">
                Students in this class: {classInfo.students.length}
              </StyledTypography2>
              <List style={{ overflowY:'scroll',height:'55vh'}}>
                {classInfo.students.map((student, index) => (
                  <StyledListItem onClick={()=>handlestudentclickhandler(student._id)} key={index}>
                    
                    <ListItemText primary="Email: " secondary={student.email} />
                    <ListItemText primary="Name: " secondary={student.name} />
                  </StyledListItem>
                ))}
              </List>
              <StyledTypography3 variant="h6" component="div">
                Invite Token: {classInfo.inviteTokens}
              </StyledTypography3>
            </CardContent>
          </StyledCard>
        )}
      </StyledDiv>
    );
  };
  
  export default Class;
  