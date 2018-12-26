import React from "react";
import styled from "styled-components";

const LogoImg = styled.img.attrs({
  src: "/static/logo.png",
  alt: "React Truncate Component",
})`
  width: 251px;
  height: 83px;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-top: 80px;
`;

function Logo() {
  return (
    <Container>
      <LogoImg />
    </Container>
  );
}

export default Logo;
