import styled from "styled-components";
import mediaTemplates from "../../utils/mediaTemplates";

const LiveSettingsContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  margin: 10px;

  ${mediaTemplates.smallScreen`
    position: static;
  `}
`;

export default LiveSettingsContainer;
