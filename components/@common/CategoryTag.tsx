import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

import { Category } from "../../utils/types";
import { getColorFromCategory } from "../../utils/helpers";

const Wrapper = styled(View)<Props>`
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
const Label = styled(Text)<Props>`
  font-family: "DM Sans";
  font-size: 11px;
  line-height: 16px;
  font-weight: 500;
  color: ${({ theme, category = Category.Uncategorized }) =>
    getColorFromCategory({
      theme,
      category,
      neutralShade: 8,
    })};
`;

interface Props {
  category?: Category;
}

const CategoryTag: React.FC<Props> = ({ category }) => (
  <Wrapper category={category}>
    <Label category={category}>{category}</Label>
  </Wrapper>
);

export default CategoryTag;
