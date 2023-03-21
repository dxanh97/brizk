import React from "react";
import { Text, TextInput, View } from "react-native";
import styled, { useTheme } from "styled-components";

import { hexToRGBA } from "../../utils/helpers";
import { Category, MustHave, NiceToHave } from "../../utils/types";

import CategoryTag from "../common/CategoryTag";

interface CategoryProps {
  category?: Category;
}

const Wrapper = styled(View)<CategoryProps>`
  border-radius: 20px;
  border: 1px solid
    ${({ category, theme }) => {
      if (category === MustHave) return theme.green;
      if (category === NiceToHave) return theme.orange;
      return hexToRGBA(theme.neutral.get(13)!, 0.12);
    }};
  background-color: #272727;
  padding: 20px;
`;
const Header = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const DatePicker = styled(Text)`
  font-family: "DM Sans";
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: ${({ theme }) => theme.neutral.get(13)};
`;
const AmountInput = styled(TextInput)`
  font-size: 45px;
  line-height: 52px;
  font-weight: 400;
  font-family: "PT Mono";
  color: ${({ theme }) => theme.neutral.get(7)};
  margin: 40px 0;
`;
const TagInput = styled(TextInput)`
  padding: 12px;
  font-family: "DM Sans";
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  border-radius: 12px;
  background: ${({ theme }) => hexToRGBA(theme.neutral.get(13)!, 0.04)};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.neutral.get(13)};
`;

interface Props extends CategoryProps {
  onTopOfDeck: boolean;
}

const TransactionCard: React.FC<Props> = ({ category, onTopOfDeck }) => {
  const theme = useTheme();
  return (
    <Wrapper category={category}>
      <Header>
        <DatePicker>Today</DatePicker>
        <CategoryTag category={NiceToHave} />
      </Header>
      <AmountInput
        autoFocus={onTopOfDeck}
        enablesReturnKeyAutomatically
        inputMode="numeric"
        keyboardType="numeric"
        placeholder="0"
        placeholderTextColor={theme.neutral.get(7)}
      />
      <TagInput
        placeholder="Add tags"
        placeholderTextColor={theme.neutral.get(7)}
      />
    </Wrapper>
  );
};

export default TransactionCard;
