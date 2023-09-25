import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";

const JoinClass = () => {
  const [classToken, setClassToken] = useState("");
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [joinStatus, setJoinStatus] = useState(null); 

  const handleTokenChange = (event) => {
    setClassToken(event.target.value);
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleJoinClass = async () => {
    setLoading(true);

    try {
      setClassDetails(null);
      const response = await fetch("http://localhost:3000/student/getClass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ inviteToken: classToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch class details');
      }

      const data = await response.json();
      // console.log(data);
      setClassDetails(data.resClass);
    } catch (error) {
      setError("Class not found or an error occurred.");
      console.error('Error fetching class details:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinClassHandler = async () => {
    setLoading(true); // Set loading to true when the button is clicked
   
    try {
        const response = await fetch("http://localhost:3000/student/joinClass", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ inviteToken: classToken }),
          });
      setJoinStatus('success');
      // console.log('no response error');
      const data=await response.json()
      // console.log(data);
    } catch (error) {
        setJoinStatus('error')

      console.error('Error joining class:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Join a Class
      </Typography>
      <Box display="flex" style={{ marginLeft: '-15rem', marginTop: '3rem' }}>
        <Paper
          elevation={3}
          style={{ padding: "16px", marginRight: "16px", flex: "1" }}
        >
          <Typography variant="h6">Enter Class Token</Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Class Token"
            value={classToken}
            onChange={handleTokenChange}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
            onClick={handleJoinClass}
            disabled={loading} // Disable the button when loading
          >
            {loading ? <CircularProgress size={24} /> : "Get Class Details"}
          </Button>
        </Paper>

        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex="2"
            padding="16px"
          >
            <CircularProgress />
          </Box>
        ) : (
          classDetails ? (
            <Paper elevation={3} style={{ padding: "16px", flex: "2" }}>
              <Typography variant="h6">Class Details</Typography>
              <Typography>Class Name: {classDetails.nameOfClass}</Typography>
              <Typography>Teacher: {classDetails.teacher}</Typography>
              <Typography>Date Created: {classDetails.dateCreated}</Typography>
              <Button variant="contained" onClick={joinClassHandler} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Join Class"}
              </Button>
              <Typography variant="h6" style={{ marginTop: "16px" }}>
                Students ({classDetails.students.length})
              </Typography>
              <ul>
                {classDetails.students.map((student, index) => (
                  <li key={index}>{student.name}</li>
                ))}
              </ul>
            </Paper>
          ) : null
        )}
      </Box>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    
      <Snackbar open={joinStatus === 'success'} autoHideDuration={6000}>
        <Alert severity="success">
          Class successfully joined!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default JoinClass;
