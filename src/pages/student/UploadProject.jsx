import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  TextField,
  Button,
  Input,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { studentState } from "../../store/student/Student";

const UploadProjectContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  display: inline-block;
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagChip = styled(Chip)`
  background-color: #007bff;
  color: #fff;
`;

function UploadProject() {
  const studentDetails = useRecoilState(studentState)[0];
  const setstudentDetails = useSetRecoilState(studentState);
  const [inputloading, setinputloading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    teacher: null,
    tags: [], 
  });
  const [file, setFile] = useState(null);

  const handleTitleChange = (e) => {
    setProjectDetails((prevProjectDetails) => ({
      ...prevProjectDetails,
      title: e.target.value,
    }));
  };

  const handledescriptionChange = (e) => {
    setProjectDetails((prevProjectDetails) => ({
      ...prevProjectDetails,
      description: e.target.value,
    }));
  };

  const handleTeacherChange = (e) => {
    setProjectDetails((prevProjectDetails) => ({
      ...prevProjectDetails,
      teacher: e.target.value,
    }));
  };

  const handleTagsChangeHandler = (e) => {
    
    const tags = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== ""); 
    setProjectDetails((prevProjectDetails) => ({
      ...prevProjectDetails,
      tags: tags,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleTeacherFocus = async () => {
    setinputloading(true);
    try {
      const response = await fetch("http://localhost:3000/allTeachers");
      const data = await response.json();
      setinputloading(false);
      setTeachers(data.teachers);
    } catch (error) {
      console.error("Error fetching teachers: ", error);
      setinputloading(false);
    }
  };

  const handleUpload = async () => {
    // console.log(projectDetails.tags);
    if (!projectDetails.title || !file) {
      alert("Please fill in all required fields.");
      return;
    }

    setinputloading(true);

    const formData = new FormData();
    formData.append("title", projectDetails.title);
    formData.append("description", projectDetails.description);
    formData.append("tags", projectDetails.tags);
    formData.append("content", file);

    try {
      const response = await fetch("http://localhost:3000/student/projects/upload", {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          teacher: projectDetails.teacher,
          student: studentDetails._id,
        },
        body: formData,
      });

      const data = await response.json();
      alert('project uploaded successfully')
      setinputloading(false);
      // console.log(data);
    } catch (error) {
      console.error("Error uploading project: ", error);
      setinputloading(false);
    }
  };
  const handleTagDelete = (index) => {
    const newTags = projectDetails.tags.filter((_, i) => i !== index);
    setProjectDetails((prevProjectDetails) => ({
      ...prevProjectDetails,
      tags: newTags,
    }));
  };
  
  return (
    <UploadProjectContainer>
      <h1>Upload Project</h1>
      <FormField>
        <TextField
          fullWidth
          label="Title"
          name="title"
          onChange={handleTitleChange}
          variant="outlined"
          required
        />
      </FormField>
      <FormField>
        <TextField
          fullWidth
          label="Description"
          name="description"
          onChange={handledescriptionChange}
          variant="outlined"
        />
      </FormField>
      <FormField>
        <TextField
          fullWidth
          label="Tags"
          name="Tags"
          onChange={handleTagsChangeHandler}
          variant="outlined"
        />
      </FormField>
      <TagsContainer>
        {projectDetails.tags.map((tag, index) => (
          <TagChip key={index} label={tag} onDelete={() => handleTagDelete(index)} />
        ))}
      </TagsContainer>
      <FormField>
        <FormControl fullWidth variant="outlined" style={{ margin: ".6rem 0" }}>
          <InputLabel>Teacher</InputLabel>
          <Select
            onFocus={handleTeacherFocus}
            onChange={handleTeacherChange}
            label="Teacher"
          >
            {inputloading ? (
              <CircularProgress
                style={{ marginLeft: "50%" }}
                size={24}
                color="inherit"
              />
            ) : (
              teachers.map((teacher) => (
                <MenuItem key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </FormField>
      <FileInput
        type="file"
        id="file"
        accept=".pdf"
        onChange={handleFileChange}
      />
      <UploadButton htmlFor="file">
        {file ? `Selected File: ${file.name}` : "Choose PDF File"}
      </UploadButton>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        style={{ marginTop: "20px" }}
      >
        {inputloading ? (
          <CircularProgress
            style={{ marginLeft: "50%" }}
            size={24}
            color="inherit"
          />
        ) : (
          "Upload Project"
        )}
      </Button>
    </UploadProjectContainer>
  );
}

export default UploadProject;
