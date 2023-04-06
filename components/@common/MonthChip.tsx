import React from "react";
import { Pressable, Text, View } from "react-native";
import { DateTime } from "luxon";
import styled from "styled-components";

interface StyleProps {
  isActive?: boolean;
}

const Wrapper = styled(View)<StyleProps>`
  margin: 0 2px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 6px 8px;
  border: 1px solid;
  border-radius: 4px;
  border-color: ${({ theme }) => theme.green};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.green : theme.neutral.get(1)};
`;

const Label = styled(Text)<StyleProps>`
  font-family: "DM Sans";
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.1px;
  color: ${({ theme, isActive }) =>
    isActive ? theme.neutral.get(1) : theme.green};
`;

const MonthChip: React.FC<{
  data: DateTime;
  isActive?: boolean;
  onPress?: () => void;
}> = ({ data, isActive, onPress }) => (
  <Pressable onPress={onPress}>
    <Wrapper isActive={isActive}>
      <Label isActive={isActive}>{data.toFormat("LL / yyyy")}</Label>
    </Wrapper>
  </Pressable>
);

export default MonthChip;
