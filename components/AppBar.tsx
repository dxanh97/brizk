import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

const Wrapper = styled(View)`
  background-color: ${({ theme }) => theme.neutral.get(0)};
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;
const LogoWrapper = styled(View)`
  display: flex;
  flex-direction: row;
`;
const LogoText = styled(Text)<{ isDot?: boolean }>`
  color: ${({ isDot, theme }) => (isDot ? theme.green : theme.neutral.get(13))};
  font-size: 22px;
  line-height: 28px;
  font-family: "DM Mono";
  font-weight: 600;
`;

const AppBar: React.FC = () => (
  <Wrapper>
    <LogoWrapper>
      <LogoText>brizk</LogoText>
      <LogoText isDot>.</LogoText>
      <LogoText>co</LogoText>
    </LogoWrapper>
  </Wrapper>
);

export default AppBar;
