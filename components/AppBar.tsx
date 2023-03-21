import React from "react";
import { Text, View } from "react-native";
import styled, { useTheme } from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";

const Wrapper = styled(View)`
  background-color: ${({ theme }) => theme.neutral.get(0)};
  display: flex;
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
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

const AppBar: React.FC = () => {
  const theme = useTheme();
  return (
    <Wrapper>
      <MaterialIcons name="menu" size={24} color={theme.neutral.get(13)} />
      <LogoWrapper>
        <LogoText>brizk</LogoText>
        <LogoText isDot>.</LogoText>
        <LogoText>co</LogoText>
      </LogoWrapper>
      <MaterialIcons
        name="account-circle"
        size={24}
        color={theme.neutral.get(13)}
      />
    </Wrapper>
  );
};

export default AppBar;
