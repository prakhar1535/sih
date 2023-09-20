import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { UploadCloud } from 'lucide-react';



const UploadButton = styled.label`
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  display: flex;
  width: auto;
  height: 90vh;
  justify-content: center;
  align-items: center;
  padding: 10vw;
  border-radius: 80rem;
  width: fit-content;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Uploadcontain = styled.div`
display: grid;
width: auto;
height: auto;
grid-gap: 1rem;
margin: 1rem;
border-radius: 5px;
`;

const TitlesTit = styled.div`
display: flex;
grid-row: 1 / span 1;
grid-column: 1 / span 1;
font-weight: Bold;
font-size: 1.7rem;
padding: 0.25rem;
`;
const TitlesDes = styled.div`
display: flex;
grid-row: 3 / span 1;
grid-column: 1 / span 1;
font-weight: Bold;
font-size: 1.7rem;
padding: 0.25rem;
`;
const Inputfeild = styled.input`
border: 2px solid black;
padding: 0.25rem;
grid-row: 2 / span 1;
grid-column: 1 / span 15;
border-radius: 5px;
`
const InputfeildDes = styled.textarea`
border: 2px solid black;
padding: 0.25rem;
grid-row: 4 / span 10;
grid-column: 1 / span 15;
border-radius: 5px;
overflow-y: scroll;





























































#imcliude
`
const Preview = styled.div`
border: 2px solid black;
padding: 0.25rem;
grid-row: 1 / span 30;
border: 2px solid red;
grid-column: 18 / span 25;
border-radius: 5px;
`

function SubmitAssignment() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    
    setPageNumber(1);
  }, [selectedFile]);

  
  return (
    <div className="z-1000">
      <center>
        <div className="upload">
          {selectedFile ? (
            <Uploadcontain>
            {/* <p>Selected File: {selectedFile.name}</p> */}
            <TitlesTit>
              Project Title
            </TitlesTit>
            <Inputfeild type='text' placeholder={`${selectedFile.name}`}/>
            <TitlesDes>
             Description
            </TitlesDes>
            <InputfeildDes type='text' />
            <Preview>

              </Preview>
            </Uploadcontain>
          ) : (
            <UploadButton>
              <UploadCloud size={88} color="blue" />
              <h1 style={{ margin: '1rem', fontWeight: 'bold', fontSize: '1.2rem', color: 'blue' }}>Upload Project</h1>
              <HiddenInput type="file" onChange={handleFileChange} accept=".pdf, .doc, .docx" />
            </UploadButton>
          )}
        </div>
      </center>
    </div>
  );
}

export default SubmitAssignment;
