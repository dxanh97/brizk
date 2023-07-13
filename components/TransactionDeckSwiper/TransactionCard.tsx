import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { TextInput, View } from "react-native";
import { BlurView } from "expo-blur";
import MaskInput, { createNumberMask } from "react-native-mask-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateTime } from "luxon";
import styled, { useTheme } from "styled-components";

import {
  getColorFromCategory,
  getStartOfTheDay,
  hexToRGBA,
} from "../../utils/helpers";
import { Category } from "../../utils/types";

import CategoryTag from "../@common/CategoryTag";
import {
  FlexCenterBox,
  Typography,
  flexCenter,
  typography,
} from "../../utils/shared-styles";

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
const Header = styled(FlexCenterBox)`
  flex-direction: row;
  justify-content: space-between;
`;
const DatePicker = styled(Typography)`
  font-weight: 500;
  color: ${({ theme }) => theme.neutral[100]};
`;
const AmountInput = styled(MaskInput)`
  ${typography};
  font-weight: 400;
  color: ${({ theme }) => theme.neutral[60]};
  margin: 40px 0;
`;
const Tags = styled(Typography)`
  letter-spacing: 0.5px;
  padding: 12px 0;
  color: ${({ theme }) => theme.neutral[100]};
`;
const TagInput = styled(TextInput)`
  ${typography};
  ${flexCenter};
  padding: 12px;
  border-radius: 12px;
  background: ${({ theme }) => hexToRGBA(theme.neutral[100], 0.04)};
  color: ${({ theme }) => theme.neutral[100]};
`;
const StyledBlurView = styled(BlurView)`
  ${flexCenter};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
`;
const StyledBlurContent = styled(Typography)`
  color: ${({ theme }) => theme.neutral[100]};
`;

interface Props extends CategoryProps {
  onTopOfDeck: boolean;
  amount?: number;
  tags?: string[];
  category?: Category;
  selectingCategory?: Category;
}

export interface ForwardedRef {
  getAmount: () => number;
  getTags: () => string[];
}

const TransactionCard = forwardRef<ForwardedRef, Props>((props, ref) => {
  const {
    onTopOfDeck,
    amount: propAmount,
    tags: propTags,
    category: propCategory,
    selectingCategory: propSelectingCategory,
  } = props;
  const today = getStartOfTheDay(new Date().getTime());
  const [selectedDate, setSelectedDate] = useState(today);
  const isToday = today === selectedDate;
  const isInSameYear = DateTime.fromMillis(today).hasSame(
    DateTime.fromMillis(selectedDate),
    "year",
  );
  const formatString = isInSameYear ? "MMM d" : "MMM d, y";
  const formattedSelectedDate = isToday
    ? "Today"
    : DateTime.fromMillis(selectedDate).toFormat(formatString);
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

  const handleOnConfirmDate = (d: Date) => {
    const startOfTheDay = getStartOfTheDay(d.getTime());
    setSelectedDate(startOfTheDay);
    setIsOpenDatePicker(false);
  };

  const amountRef = useRef<TextInput>(null);
  const [amount, setAmount] = useState(`${propAmount ?? ""}`);

  const [currentText, setCurrentText] = useState("");
  const [tags, setTags] = useState<string[]>(propTags ?? []);
  const handleOnTagReturn = () => {
    setCurrentText("");
    if (tags.includes(currentText)) return;
    setTags((_) => [..._, currentText]);
  };

  useImperativeHandle(
    ref,
    () => ({
      getAmount: () => parseInt(amount, 10),
      getTags: () => tags,
    }),
    [amount, tags],
  );

  const theme = useTheme();
  return (
    <Wrapper category={propSelectingCategory}>
      <Header>
        <DateTimePickerModal
          isVisible={isOpenDatePicker}
          mode="date"
          onConfirm={handleOnConfirmDate}
          date={new Date(selectedDate)}
          onCancel={() => setIsOpenDatePicker(false)}
        />
        <DatePicker size="Body/M" onPress={() => setIsOpenDatePicker(true)}>
          {formattedSelectedDate}
        </DatePicker>
        <CategoryTag
          category={
            propSelectingCategory ?? propCategory ?? Category.Uncategorized
          }
        />
      </Header>
      <AmountInput
        ref={amountRef}
        mask={mask}
        value={amount}
        isNumber
        size="Headline/L"
        placeholder="0"
        inputMode="numeric"
        keyboardType="numeric"
        autoFocus={onTopOfDeck}
        enablesReturnKeyAutomatically
        placeholderTextColor={theme.neutral[60]}
        onChangeText={(_, unmasked) => setAmount(unmasked)}
      />
      <Tags size="Body/M">{tags.join(", ")}</Tags>
      <TagInput
        size="Body/M"
        placeholder="Add tags"
        placeholderTextColor={theme.neutral[60]}
        blurOnSubmit={false}
        onChangeText={setCurrentText}
        value={currentText}
        onSubmitEditing={handleOnTagReturn}
      />
      {propSelectingCategory && (
        <StyledBlurView intensity={10}>
          <StyledBlurContent size="Title/M">
            {propSelectingCategory}
          </StyledBlurContent>
        </StyledBlurView>
      )}
    </Wrapper>
  );
});

export default TransactionCard;
