import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input.attrs({
  name: "number-of-lines",
  type: "range",
  min: "0",
  max: "13",
})``;

function NumberOfLinesInput(props) {
  return (
    <Container>
      <label htmlFor="number-of-lines">number of lines: {props.value}</label>
      <Input {...props} />
    </Container>
  );
}

export default NumberOfLinesInput;
