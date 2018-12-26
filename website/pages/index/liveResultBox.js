import styled from "styled-components";
import mediaTemplates from "../../utils/mediaTemplates";

const LiveResultBox = styled.div`
  width: 500px;
  background-color: #fff;
  padding: 10px 20px;
  color: #000;
  box-shadow: rgba(20, 20, 20, 0.27) 0.0555556rem 0.0555556rem 1.11111rem;
  margin: 0 auto;

  ${mediaTemplates.smallScreen`
    width: auto;
    flex: 1;
    margin-right: 10px;
  `}

  ${mediaTemplates.phone`
    margin-right: 0;
  `}
`;

export default LiveResultBox;
