import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Text, TextInput, View } from "react-native";
import { BlurView } from "expo-blur";
import MaskInput, { createNumberMask } from "react-native-mask-input";
import styled, { useTheme } from "styled-components";

import { getColorFromCategory, hexToRGBA } from "../../utils/helpers";
import { Category } from "../../utils/types";

import CategoryTag from "../@common/CategoryTag";

const mask = createNumberMask({
  delimiter: ".",
  precision: 0,
});

interface CategoryProps {
  category?: Category;
}

const Wrapper = styled(View)<CategoryProps>`
  border-radius: 20px;
  border: 1px solid
    ${({ theme, category = Category.Uncategorized }) =>
      getColorFromCategory({
        theme,
        category,
        neutralOpacity: 0.12,
      })};
  background-color: #272727;
  padding: 20px;
  position: relative;
  overflow: hidden;
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
const AmountInput = styled(MaskInput)`
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
const StyledBlurView = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledBlurContent = styled(Text)`
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: ${({ theme }) => theme.neutral.get(13)};
`;

interface Props extends CategoryProps {
  onTopOfDeck: boolean;
  selectingCategory?: Category;
}

export interface ForwardedRef {
  getAmount: () => number;
}

const TransactionCard = forwardRef<ForwardedRef, Props>((props, ref) => {
  const {
    category,
    onTopOfDeck,
    selectingCategory: propSelectingCategory,
  } = props;

  const amountRef = useRef<TextInput>(null);
  const [amount, setAmount] = useState("");
  useImperativeHandle(
    ref,
    () => ({
      getAmount: () => parseInt(amount, 10),
    }),
    [amount],
  );

  const selectingCategory = onTopOfDeck
    ? propSelectingCategory ?? category
    : category;

  const theme = useTheme();
  return (
    <Wrapper category={selectingCategory}>
      <Header>
        <DatePicker>Today</DatePicker>
        <CategoryTag
          category={selectingCategory ?? category ?? Category.Uncategorized}
        />
      </Header>
      <AmountInput
        ref={amountRef}
        mask={mask}
        value={amount}
        placeholder="0"
        inputMode="numeric"
        keyboardType="numeric"
        autoFocus={onTopOfDeck}
        enablesReturnKeyAutomatically
        placeholderTextColor={theme.neutral.get(7)}
        onChangeText={(_, unmasked) => setAmount(unmasked)}
      />
      <TagInput
        placeholder="Add tags"
        placeholderTextColor={theme.neutral.get(7)}
      />
      {selectingCategory && (
        <StyledBlurView intensity={10}>
          <StyledBlurContent>{selectingCategory}</StyledBlurContent>
        </StyledBlurView>
      )}
    </Wrapper>
  );
});

export default TransactionCard;
