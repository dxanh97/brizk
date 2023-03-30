import React from "react";
import { Text, View } from "react-native";
import SwipeableItem from "react-native-swipeable-item";
import styled from "styled-components";

import { formatAmount, getColorFromCategory } from "../../utils/helpers";
import { Category, Transaction } from "../../utils/types";

interface CategoryProps {
  category: Category;
}

const TransactionWrapper = styled(View)<CategoryProps>`
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 8px;
  border-right-width: 4px;
  border-right-color: ${({ theme, category }) =>
    getColorFromCategory({
      theme,
      category,
      neutralShade: 8,
    })};
  background-color: ${({ theme }) => theme.neutral.get(2)};
`;
const Amount = styled(Text)<CategoryProps>`
  font-family: "PT Mono";
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme, category }) =>
    getColorFromCategory({
      theme,
      category,
      neutralShade: 8,
    })};
`;
const Tags = styled(Text)`
  font-family: "DM Sans";
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.neutral.get(7)};
`;

interface Props {
  data: Transaction;
}

const TransactionItem: React.FC<Props> = ({ data }) => (
  <SwipeableItem
    key={data.id}
    item={data}
    renderUnderlayLeft={() => <View />}
    snapPointsLeft={[150]}
  >
    <TransactionWrapper category={data.category}>
      <Amount category={data.category}>{formatAmount(data.amount)}</Amount>
      <Tags>{data.tags.join(", ") || " "}</Tags>
    </TransactionWrapper>
  </SwipeableItem>
);

export default TransactionItem;
