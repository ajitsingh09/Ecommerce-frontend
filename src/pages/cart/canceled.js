import Layout from "@/components/ui/layout";
import React from "react";
import styled from "styled-components";

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 80vw;
  display: flex;
  margin: auto;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
  line-height: 20px;
`;

const Subheading = styled.h4`
  margin: 0px;
`;

const Success = () => {
  return (
    <Layout>
      <Box>
        <h2> Order Completion Failed </h2>
        <Subheading>
          Your Payment has been unsuccessful due to some unfortunate reasons.
          Try again later
        </Subheading>
      </Box>
    </Layout>
  );
};

export default Success;
