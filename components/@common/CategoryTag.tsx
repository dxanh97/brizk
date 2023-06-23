import React from "react";
import { View } from "react-native";
import styled from "styled-components";

import { Category, CategoryProps } from "../../utils/types";
import { getColorFromCategory } from "../../utils/helpers";
import { Typography } from "../../utils/shared-styles";

const Wrapper = styled(View)<CategoryProps>`
  border-radius: 2px;
  padding: 4px 8px 4px 8px;
  background: ${({ theme, category = Category.Uncategorized }) =>
    getColorFromCategory({
      theme,
      category,
      neutralShade: 5,
      opacity: 0.08,
    })};
  align-self: flex-start;
`;
const Label = styled(Typography)<CategoryProps>`
  color: ${({ theme, category = Category.Uncategorized }) =>
    getColorFromCategory({
      theme,
      category,
      neutralShade: 8,
    })};
`;

const CategoryTag: React.FC<CategoryProps> = ({ category }) => (
  <Wrapper category={category}>
    <Label category={category} size="Label/M">
      {category}
    </Label>
  </Wrapper>
);

export default CategoryTag;
