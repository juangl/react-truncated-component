import React from "react";
import styled from "styled-components";

import GithubLogo from "./githubLogo";

const Container = styled.div`
  position: fixed;
  z-index: 9999;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  padding: 15px 30px;
  display: flex;
  max-width: 1024px;
  margin: 0 auto;
`;

const StyledLink = styled.a`
  color: #fff;
  text-decoration: none;
`;

const RightBox = styled.div`
  margin-left: auto;
`;

const StyledGithubLogo = styled(GithubLogo)`
  vertical-align: middle;
  width: 25px;
  height: 25px;
  fill: #fff;
`;

const TopBar = () => (
  <Container>
    <Nav>
      <RightBox>
        <StyledLink href="https://github.com/juangl/react-truncated-component">
          <StyledGithubLogo />
        </StyledLink>
      </RightBox>
    </Nav>
  </Container>
);

export default TopBar;
