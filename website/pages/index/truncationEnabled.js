import React from "react";
import styled from "styled-components";

const Input = styled.input.attrs({
  type: "checkbox",
  name: "truncation-enabled",
})`
  vertical-align: middle;
`;

function TruncationEnabled(props) {
  return (
    <label htmlFor="truncation-enabled">
      Truncation enabled: <Input {...props} />
    </label>
  );
}

export default TruncationEnabled;
