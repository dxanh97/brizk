import React from "react";
import styled from "styled-components";

import { FlexCenterBox, Typography } from "../utils/shared-styles";
import { Font } from "../utils/types";

const Wrapper = styled(FlexCenterBox)`
  flex-direction: row;
  background-color: ${({ theme }) => theme.neutral[0]};
  padding: 20px;
`;
const LogoWrapper = styled(FlexCenterBox)`
  flex-direction: row;
`;
const LogoText = styled(Typography)<{ isDot?: boolean }>`
  font-family: ${Font.DM_MONO};
  font-weight: 600;
  color: ${({ theme, isDot }) =>
    isDot ? theme.green[80] : theme.neutral[100]};
`;

const AppBar: React.FC = () => (
  <Wrapper>
    <LogoWrapper>
      <LogoText size="Title/M">brizk</LogoText>
      <LogoText size="Title/M" isDot>
        .
      </LogoText>
      <LogoText size="Title/M">co</LogoText>
    </LogoWrapper>
  </Wrapper>
);

export default AppBar;
