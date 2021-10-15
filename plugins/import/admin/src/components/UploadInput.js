import React, { createRef, useState, memo } from "react";
import { Text } from "@buffetjs/core";
import styled from "styled-components";
import { Success, Plus } from "@buffetjs/icons";
const UploadArea = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 200px;
  height: 80px;
  border-radius: ${({ theme }) => theme.main.sizes.borderRadius};
  border: 1px solid #007bff;
  svg {
    width: 40px;
    height: auto;
  }
  &.uploaded {
    border: 1px solid green;
  }
`;
const UploadTitlte = styled.span`
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
  font-weight: medium;
`;
const UploadFileName = styled.span`
  display: block;
`;
const FileInput = styled.input`
  border: 1px solid red;
  visibility: hidden;
  display: block;
  width: 0;
  height: 0;
`;
let id = 1;
const UploadInput = (props) => {
  id++;
  const { onInput, title, reset } = props;
  const [file, setFile] = useState(false);
  const inpRef = createRef();

  return (
    <div>
      <UploadTitlte>{title}</UploadTitlte>
      <UploadArea
        htmlFor={"input-" + id}
        className={file?.name ? "uploaded" : ""}
      >
        {file ? (
          <Success fill={file?.name ? "#6DBB1A" : "#007bff"} />
        ) : (
          <Plus fill={file?.name ? "#6DBB1A" : "#007bff"} />
        )}
        <UploadFileName>{file?.name}</UploadFileName>
      </UploadArea>
      <FileInput
        ref={inpRef}
        type="file"
        id={"input-" + id}
        onChange={(e) => {
          const file = e.target.files[0];
          setFile(file);
          onInput(file);
        }}
      />
    </div>
  );
};
export default UploadInput;
