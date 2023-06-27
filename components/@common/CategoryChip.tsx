import React from "react";
import { Pressable } from "react-native";
import styled, { DefaultTheme } from "styled-components";

import { Category } from "../../utils/types";
import { FlexCenterBox, Typography } from "../../utils/shared-styles";

interface StyleProps {
  category: Category;
  isActive: boolean;
}

const getColor = (
  theme: DefaultTheme,
  category: Category,
  shades: number[],
) => {
  const [green, orange, neutral] = shades;
  switch (category) {
    case Category.MustHave:
      return theme.green[green];
    case Category.NiceToHave:
      return theme.orange[orange];
    case Category.Uncategorized:
      return theme.neutral[neutral];
    default:
      return null;
  }
};

const Wrapper = styled(FlexCenterBox)<StyleProps>`
  padding: 4px 8px;
  border-radius: 4px;
  margin: 0 2px;
  border: ${({ theme, category }) => getColor(theme, category, [20, 20, 40])};
  background-color: ${({ theme, isActive, category }) => {
    if (!isActive) return theme.neutral[0];
    return getColor(theme, category, [80, 80, 70]);
  }};
`;
const Label = styled(Typography)<StyleProps>`
  color: ${({ theme, isActive, category }) => {
    if (isActive) return theme.neutral[0];
    return getColor(theme, category, [80, 80, 80]);
  }};
`;

const CategoryChip: React.FC<{
  category: Category;
  isActive?: boolean;
  onPress?: () => void;
}> = ({ category, isActive = false, onPress }) => (
  <Pressable onPress={onPress}>
    <Wrapper category={category} isActive={isActive}>
      <Label size="Label/M" category={category} isActive={isActive}>
        {category}
      </Label>
    </Wrapper>
  </Pressable>
);

export default CategoryChip;
