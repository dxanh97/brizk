import React, { useCallback, useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { DateTime } from "luxon";
import styled from "styled-components";

import { Category, Transaction } from "../../utils/types";

import { useAppSelector } from "../../store";
import { selectMonthlyTransactions } from "../../store/transactions.selectors";

import TransactionItem from "./TransactionItem";
import CategoryChip from "../@common/CategoryChip";

import { getMonthAndYear, groupTransactionsByDates } from "../../utils/helpers";
import { FlexCenterBox, Typography } from "../../utils/shared-styles";

const Wrapper = styled(View)`
  flex: 1;
`;
const FiltersWrapper = styled(FlexCenterBox)`
  flex-direction: row;
  margin-bottom: 8px;
`;
const DateSeparator = styled(Typography)`
  color: ${({ theme }) => theme.neutral[100]};
  background-color: ${({ theme }) => theme.neutral[0]};
  margin-bottom: 8px;
`;

const TransactionsFlatList: React.FC<{
  selectedMonth: DateTime;
}> = ({ selectedMonth }) => {
  const transactions = useAppSelector((s) =>
    selectMonthlyTransactions(s, getMonthAndYear(selectedMonth.toMillis())),
  );
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const { data, dateIndexes } = groupTransactionsByDates(
    transactions,
    selectedCategory,
  );

  const renderItem: ListRenderItem<string | Transaction> = useCallback(
    ({ item }) => {
      if (typeof item === "string") {
        return <DateSeparator size="Label/M">{item}</DateSeparator>;
      }
      return <TransactionItem data={item} />;
    },
    [],
  );

  return (
    <Wrapper>
      <FiltersWrapper>
        {Object.values(Category).map((category) => (
          <CategoryChip
            key={category}
            category={category}
            isActive={category === selectedCategory}
            onPress={() =>
              setSelectedCategory((c) =>
                c !== category ? category : undefined,
              )
            }
          />
        ))}
      </FiltersWrapper>
      <FlatList
        keyExtractor={(item) => (typeof item === "string" ? item : item.id)}
        data={data}
        renderItem={renderItem}
        stickyHeaderIndices={dateIndexes}
      />
    </Wrapper>
  );
};

export default TransactionsFlatList;
