import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
`;

const Title = styled.h1`
  fontsize: 1.5rem;
  text-shadow: rgba(20, 20, 20, 0.10) 0.09rem 0.09em 0.9rem;
`;

function SiteTitle() {
  return (
    <Container>
      <Title>Truncates your text with format</Title>
    </Container>
  );
}

export default SiteTitle;
