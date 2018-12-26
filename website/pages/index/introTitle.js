import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
  text-shadow: rgba(20, 20, 20, 0.1) 0.09rem 0.09em 0.9rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0.5rem;
  color: #fff;
`;

const Subtitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
`;

function IntroTitle() {
  return (
    <Container>
      <Title>React component to truncate text</Title>
      <Subtitle>With format and paragraphs support included</Subtitle>
    </Container>
  );
}

export default IntroTitle;
