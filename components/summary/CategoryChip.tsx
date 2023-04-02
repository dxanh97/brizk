import React from "react";
import { Pressable, Text, View } from "react-native";

import styled, { DefaultTheme } from "styled-components";

import { Category } from "../../utils/types";

interface StyleProps {
  category: Category;
  isActive: boolean;
}

const getColor = (theme: DefaultTheme, category: Category) => {
  switch (category) {
    case Category.MustHave:
      return "#103900";
    case Category.NiceToHave:
      return "#4d2700";
    case Category.Uncategorized:
      return theme.neutral.get(3);
    default:
      return null;
  }
};

const Wrapper = styled(View)<StyleProps>`
  display: flex;
  padding: 8px 16px;
  margin-right: 4px;
  border: ${({ theme, isActive, category }) => {
    if (!isActive) return theme.neutral.get(6);
    return getColor(theme, category);
  }};
  border-radius: 8px;
  background-color: ${({ theme, isActive, category }) => {
    if (!isActive) return theme.neutral.get(1);
    return getColor(theme, category);
  }};
`;
const Label = styled(Text)<StyleProps>`
  font-family: "DM Sans";
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme, isActive, category }) => {
    if (!isActive) return theme.neutral.get(13);
    switch (category) {
      case Category.MustHave:
        return theme.green;
      case Category.NiceToHave:
        return theme.orange;
      case Category.Uncategorized:
        return theme.neutral.get(9);
      default:
        return null;
    }
  }};
`;

interface Props extends StyleProps {
  onPress: () => void;
}

const CategoryChip: React.FC<Props> = ({ category, isActive, onPress }) => (
  <Pressable onPress={onPress}>
    <Wrapper category={category} isActive={isActive}>
      <Label category={category} isActive={isActive}>
        {category}
      </Label>
    </Wrapper>
  </Pressable>
);

export default CategoryChip;
