import React, { useState } from "react";
import styled from "styled-components";
import {
  TextField,
  Button,
  CircularProgress,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

const MainPortalContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background: linear-gradient(45deg, #f5f7fa, #e3e8ee);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchContainer = styled(Paper)`
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 600px;
`;

const SearchResultsContainerWrapper = styled.div`
  display: flex;
  overflow-x: auto; /* Add horizontal scrollbar */
  width: 100%;
`;

const SearchResultsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: nowrap; /* Prevent wrapping to new lines */
  margin-top: 20px;
`;

const NoProjectsMessage = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

const ProjectCard = styled(Card)`
  background: linear-gradient(45deg, #fff, #f0f0f0);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

function MainPortal() {
  const [keyword, setKeyword] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/portal/seeProject?keyword=${keyword}`,{
        method:'POST'
      });
      const data = await response.json();

      if (data && data.length > 0) {
        setProjects(data);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainPortalContainer style={{ marginLeft: '-20rem' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the Main Portal
      </Typography>
      <SearchContainer elevation={3}>
        <TextField
          label="Search for Projects"
          variant="outlined"
          fullWidth
          value={keyword}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </SearchContainer>
      {loading ? (
        <CircularProgress style={{ marginTop: "20px" }} />
      ) : (
        <SearchResultsContainerWrapper>
          {projects.length === 0 ? (
            <NoProjectsMessage>No projects found.</NoProjectsMessage>
          ) : (
            <SearchResultsContainer>
              {projects.map((project) => (
                <ProjectCard key={project._id}>
                  <CardContent>
                    <Typography variant="h6">{project.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {project.description}
                    </Typography>
                    <Typography variant="body2">
                      Tags: {project.tags.join(", ")}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View Project
                    </Button>
                  </CardActions>
                </ProjectCard>
              ))}
            </SearchResultsContainer>
          )}
        </SearchResultsContainerWrapper>
      )}
    </MainPortalContainer>
  );
}

export default MainPortal;
