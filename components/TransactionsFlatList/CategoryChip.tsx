import React from "react";
import { Pressable } from "react-native";

import styled, { DefaultTheme } from "styled-components";

import { Category } from "../../utils/types";
import { FlexCenterBox, Typography } from "../../utils/shared-styles";

interface StyleProps {
  category: Category;
  isActive: boolean;
}

const getColor = (theme: DefaultTheme, category: Category) => {
  switch (category) {
    case Category.MustHave:
      return theme.green[90];
    case Category.NiceToHave:
      return theme.orange[90];
    case Category.Uncategorized:
      return theme.neutral[20];
    default:
      return null;
  }
};

const Wrapper = styled(FlexCenterBox)<StyleProps>`
  padding: 4px 8px;
  border-radius: 4px;
  border: ${({ theme, isActive, category }) => {
    if (!isActive) return theme.neutral[50];
    return getColor(theme, category);
  }};
  background-color: ${({ theme, isActive, category }) => {
    if (!isActive) return theme.neutral[0];
    return getColor(theme, category);
  }};
`;
const Label = styled(Typography)<StyleProps>`
  color: ${({ theme, isActive, category }) => {
    if (!isActive) return theme.neutral[100];
    switch (category) {
      case Category.MustHave:
        return theme.green[80];
      case Category.NiceToHave:
        return theme.orange[80];
      case Category.Uncategorized:
        return theme.neutral[80];
      default:
        return null;
    }
  }};
`;

const CategoryChip: React.FC<{
  category: Category;
  isActive: boolean;
  onPress: () => void;
}> = ({ category, isActive, onPress }) => (
  <Pressable onPress={onPress}>
    <Wrapper category={category} isActive={isActive}>
      <Label size="Label/M" category={category} isActive={isActive}>
        {category}
      </Label>
    </Wrapper>
  </Pressable>
);

export default CategoryChip;
