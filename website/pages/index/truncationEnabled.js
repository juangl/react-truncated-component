import React from "react";
import styled from "styled-components";

const Input = styled.input.attrs({
  type: "checkbox",
  name: "truncation-enabled",
})``;

function TruncationEnabled(props) {
  return (
    <label htmlFor="truncation-enabled">
      Truncation enabled: <Input {...props} />
    </label>
  );
}

export default TruncationEnabled;
