import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  color: #00f;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-decoration: underline;
`;

function Ellipsis(props) {
  return <Button {...props}>...see more.</Button>;
}

export default Ellipsis;
