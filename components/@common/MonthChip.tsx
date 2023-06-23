import React from "react";
import { Pressable } from "react-native";
import { DateTime } from "luxon";
import styled from "styled-components";

import { FlexCenterBox, Typography } from "../../utils/shared-styles";

interface StyleProps {
  isActive?: boolean;
}

const Wrapper = styled(FlexCenterBox)<StyleProps>`
  flex-direction: row;
  margin: 0 2px;
  align-items: flex-start;
  padding: 6px 8px;
  border: 1px solid;
  border-radius: 4px;
  border-color: ${({ theme }) => theme.green};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.green : theme.neutral.get(1)};
`;

const Label = styled(Typography)<StyleProps>`
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
      <Label isActive={isActive} size="Body/S">
        {data.toFormat("LL / yyyy")}
      </Label>
    </Wrapper>
  </Pressable>
);

export default MonthChip;
