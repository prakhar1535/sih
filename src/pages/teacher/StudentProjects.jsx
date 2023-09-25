import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material';

const StudentProjects = () => {
  const[loading,setloading]=useState(false)
  const navigate=useNavigate()
  const [student, setStudent] = useState(null);
  const studentId = useParams();
  

  const studentDetailsFetchHandler = async (id) => {
    // console.log('fetch initiated in stuidentprojectss');
    setloading(true)
    try {
      const response = await fetch(`http://localhost:3000/teacher/allClasses/student/${id}`, {
        method: 'GET',
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (!response.ok) {
        throw new Error('Student not found');
      }

      const data = await response.json();
      // console.log('fetch done in projectssssudnet');
      setStudent(data.student);
      setloading(false)
    } catch (error) {
      console.error('Error fetching student details:', error);
      setloading(false)
    }
  };

  useEffect(() => {
    studentDetailsFetchHandler(studentId.studentId);
  }, []);

  const handleReview = (projectId) => {
   navigate(`/teacher/allClasses/${studentId.classId}/student/${studentId.studentId}/${projectId}`)
  };

  return (
    <>{loading?<CircularProgress size={24} style={{position:'absolute',top:"50%",left:'50%'}} color="inherit" />:  <div>
    {student && (
      <Grid  style={{marginLeft:'-4rem',marginTop:'1rem',height:'80vh',overflowY:'scroll'}} container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">
            {student.name}'s Projects ({student.projectsUploaded.length})
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {student.projectsUploaded.length > 0 ? (
            <List>
              {student.projectsUploaded.map((project) => (
                <div key={project._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={project.title}
                   
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleReview(project._id)}
                    >
                      Review
                    </Button>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          ) : (
            <Typography variant="h6">No Projects Uploaded By {student.name}</Typography>
          )}
        </Grid>
      </Grid>
    )}
  </div> }
  
    </>
  );
  
};

export default StudentProjects;
