import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  color: #07e;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-decoration: none;
`;

function Ellipsis(props) {
  return <Button {...props}>...see more.</Button>;
}

export default Ellipsis;
