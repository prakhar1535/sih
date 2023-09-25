import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Document, Page, pdfjs } from "react-pdf";
import { Button, CircularProgress } from "@mui/material";

// Configure react-pdf to use a worker from the pdfjs-dist library
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const StudentProject = () => {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfText, setPdfText] = useState("");

  useEffect(() => {
    // Function to fetch project details from the backend
    const fetchProjectDetails = async (projectId) => {
      try {
        console.log("fetch initiated");
        const response = await fetch(
          `http://localhost:3000/teacher/student/project/${projectId}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Project not found");
        }

        const data = await response.json();
        // console.log("fetch done");
        setProject(data.project);
        const text = await extractTextFromPdf(data.project.content.data);
        setPdfText(text);
        // console.log(text);
        // console.log(data.project.content.data, "sdfdsfdsfdsfdas");
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
    const extractTextFromPdf = async (pdfData) => {
      const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
      let text = "";

      for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex++) {
        const page = await pdf.getPage(pageIndex);
        const pageText = await page.getTextContent();

        pageText.items.forEach((item) => {
          text += item.str + " ";
        });
      }

      return text;
    };

    fetchProjectDetails(params.projectId);
  }, [params.projectId]);

  const uploadToServerHandler = () => {};

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const onPageLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div
      className="student-project-container"
      style={{ fontFamily: "Arial, sans-serif", overflow: "hidden" }}
    >
      {project ? (
        <div
          className="student-project-content"
          style={{ textAlign: "center" }}
        >
          <h1 style={{ fontSize: "24px" }}>{project.title}</h1>
          <div
            className="pdf-container"
            style={{
              maxWidth: "800px",
              maxHeight: "70vh",
              margin: "0 auto",
              marginTop: "-.5rem",
            }}
          >
            <Document
              file={{ data: project.content.data }}
              onLoadSuccess={onPageLoadSuccess}
            >
              <Page pageNumber={pageNumber} width={600} />
            </Document>
          </div>
          <div className="page-navigation" style={{ margin: "20px 0" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={prevPage}
              disabled={pageNumber <= 1}
              style={{
                marginRight: "10px",
                position: "absolute",
                top: "20rem",
                left: "25rem",
              }}
            >
              Previous Page
            </Button>
            <div style={{width:'100%',border:'4px solid green',height:'100vh'}}>

            
            {/* <div className="pdf-text">
              <h2>Extracted Text</h2>
              <pre>{pdfText}</pre>
            </div> */}
            </div>
            <span className="page-number">
              Page {pageNumber} of {numPages}
            </span>
            <Button
              variant="contained"
              color="primary"
              onClick={nextPage}
              disabled={pageNumber >= numPages}
              style={{
                marginLeft: "10px",
                position: "absolute",
                top: "15rem",
                left: "25rem",
              }}
            >
              Next Page
            </Button>

            <Button
              disabled
              variant="contained"
              color="primary"
              onClick={uploadToServerHandler}
              style={{
                marginLeft: "10px",
                position: "absolute",
                top: "25rem",
                left: "23rem",
              }}
            >
              Upload To Network
            </Button>
           
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default StudentProject;
