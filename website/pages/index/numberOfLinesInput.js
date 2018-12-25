import React from "react";
import styled from "styled-components";

const Input = styled.input.attrs({
  name: "number-of-lines",
  type: "range",
  min: "0",
  max: "13",
})`
  vertical-align: middle;
`;

function NumberOfLinesInput(props) {
  return (
    <label htmlFor="number-of-lines">
      number of lines: {props.value} <Input {...props} />
    </label>
  );
}

export default NumberOfLinesInput;
