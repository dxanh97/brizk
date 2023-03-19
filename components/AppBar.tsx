import React from "react";
import { Text, View } from "react-native";
import styled, { useTheme } from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";

const Wrapper = styled(View)`
  background-color: ${(props) => props.theme.background};
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
  color: ${(props) =>
    props.isDot ? props.theme.colors.green : props.theme.colors.white};
  font-size: 22px;
  line-height: 28px;
  font-family: "DM-Mono";
  font-weight: 600;
`;

const AppBar: React.FC = () => {
  const theme = useTheme();
  return (
    <Wrapper>
      <MaterialIcons name="menu" size={24} color={theme.colors.white} />
      <LogoWrapper>
        <LogoText>brizk</LogoText>
        <LogoText isDot>.</LogoText>
        <LogoText>co</LogoText>
      </LogoWrapper>
      <MaterialIcons
        name="account-circle"
        size={24}
        color={theme.colors.white}
      />
    </Wrapper>
  );
};

export default AppBar;