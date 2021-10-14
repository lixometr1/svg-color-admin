/*
 *
 * HomePage
 *
 */
import styled from "styled-components";
import React, { memo, useState } from "react";
import pluginId from "../../pluginId";
import UploadInput from "../../components/UploadInput";
import { Button, Padded } from "@buffetjs/core";
import { auth } from "strapi-helper-plugin";
import axios from "axios";
const Container = styled.div`
  padding: 18px 30px 66px 30px;
`;
const UploadButton = styled(Button)`
  margin-top: 30px;
`;
const Title = styled.h1`
  margin-bottom: 30px;
`;
const InputBlock = styled.div`
  background: ${({ theme }) => theme.main.colors.white};
  border-radius: ${({ theme }) => theme.main.sizes.borderRadius};
  box-shadow: 0 2px 4px #e3e9f3;
  padding: 15px;
`;
const HomePage = () => {
  const [isLoading, setLoading] = useState();
  const [patternFile, setPatternFile] = useState();
  const [colorFile, setColorFile] = useState();
  const [patternCategoryFile, setPatternCategoryFile] = useState();
  const [colorCategoryFile, setColorCategoryFile] = useState();
  const sendFiles = async () => {
    try {
      const formData = new FormData();
      formData.append("pattern", patternFile);
      formData.append("color", colorFile);
      formData.append("patternCategory", patternCategoryFile);
      formData.append("colorCategory", colorCategoryFile);

      const { data } = await axios({
        url: `${strapi.backendURL}/${pluginId}/upload`,
        headers: {
          Authorization: `Bearer ${auth.getToken()}`,
        },
        method: "POST",
        data: formData,
      });
      console.log(data);
    } catch (err) {
      console.log("seding er", err);
    }
  };
  const upload = async () => {
    console.log("uploading", patternFile, colorFile);
    setLoading(true);
    await sendFiles();
    setLoading(false);
  };
  return (
    <div>
      <Container className="container-fluid">
        <Title>Import</Title>
        <div>
          <div className="row">
            <div className="col-6">
              <InputBlock>
                <UploadInput onInput={setPatternFile} title="Pattern" />
              </InputBlock>
            </div>
            <div className="col-6">
              <InputBlock>
                <UploadInput onInput={setColorFile} title="Color" />
              </InputBlock>
            </div>
          </div>
          <div className="row">
            <div className="col-6 mt-4">
              <InputBlock>
                <UploadInput
                  onInput={setColorCategoryFile}
                  title="Color Category"
                />
              </InputBlock>
            </div>
            <div className="col-6 mt-4">
              <InputBlock>
                <UploadInput
                  onInput={setPatternCategoryFile}
                  title="Pattern Category"
                />
              </InputBlock>
            </div>
          </div>

          <UploadButton color="success" isLoading={isLoading} onClick={upload}>
            Upload
          </UploadButton>
        </div>
      </Container>
    </div>
  );
};

export default memo(HomePage);
