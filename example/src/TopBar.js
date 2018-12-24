import React from "react";
import styled from "styled-components";

import { ReactComponent as GithubLogo } from "./github.svg";

const Container = styled.div`
  position: fixed;
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
  padding: 15px 30px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled.a`
  color: #fff;
  text-decoration: none;
`;

const StyledGithubLogo = styled(GithubLogo)`
  vertical-align: middle;
  width: 25px;
  height: 25px;
  margin-left: 7px;
  fill: #fff;
`;

const TopBar = () => (
  <Container>
    <StyledLink href="https://github.com/juangl/react-truncated-component">
      <span>GitHub</span>
      <StyledGithubLogo />
    </StyledLink>
  </Container>
);

export default TopBar;
