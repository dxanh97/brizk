import React, { useCallback, useState } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import { DateTime } from "luxon";
import styled from "styled-components";

import { Category, Transaction } from "../../utils/types";

import TransactionItem from "./TransactionItem";
import CategoryChip from "./CategoryChip";
import { useAppSelector } from "../../store";
import { selectMonthlyTransactions } from "../../store/transactions.selectors";
import { getMonthAndYear, groupTransactionsByDates } from "../../utils/helpers";

const Wrapper = styled(View)`
  flex: 1;
`;
const FiltersWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;
const DateSeparator = styled(Text)`
  font-family: "DM Sans";
  font-size: 11px;
  line-height: 16px;
  color: ${({ theme }) => theme.neutral.get(13)};
  background-color: ${({ theme }) => theme.neutral.get(1)};
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
        return <DateSeparator>{item}</DateSeparator>;
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
