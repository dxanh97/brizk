import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

import { Category, MustHave, NiceToHave } from "../../utils/types";
import { hexToRGBA } from "../../utils/helpers";

const Wrapper = styled(View)<Props>`
  border-radius: 2px;
  padding: 4px 8px 4px 8px;
  background: ${({ category, theme }) => {
    if (category === MustHave) return hexToRGBA(theme.green, 0.08);
    if (category === NiceToHave) return hexToRGBA(theme.orange, 0.08);
    return theme.neutral.get(5);
  }};
  align-self: flex-start;
`;
const Label = styled(Text)<Props>`
  font-family: "DM Sans";
  font-size: 11px;
  line-height: 16px;
  font-weight: 500;
  color: ${({ category, theme }) => {
    if (category === MustHave) return theme.green;
    if (category === NiceToHave) return theme.orange;
    return theme.neutral.get(8);
  }};
`;

interface Props {
  category?: Category;
}

const CategoryTag: React.FC<Props> = ({ category }) => (
  <Wrapper category={category}>
    <Label category={category}>{category ?? "No categories"}</Label>
  </Wrapper>
);

export default CategoryTag;
