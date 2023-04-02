import React, { useCallback, useState } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import styled from "styled-components";

import { useAppSelector } from "../../store";
import { selectMonthlyTransactions } from "../../store/transactions.selectors";

import { Category, Transaction } from "../../utils/types";
import { getMonthAndYear, groupTransactionsByDates } from "../../utils/helpers";

import TransactionItem from "./TransactionItem";
import CategoryChip from "./CategoryChip";

const Wrapper = styled(View)`
  flex: 1;
`;
const DateSeparator = styled(Text)`
  font-family: "DM Sans";
  font-size: 11px;
  line-height: 16px;
  color: ${({ theme }) => theme.neutral.get(13)};
  background-color: ${({ theme }) => theme.neutral.get(1)};
  margin-bottom: 8px;
`;
const FiltersWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const Summary: React.FC = () => {
  const [monthAndYear] = useState(getMonthAndYear(new Date().getTime()));
  const transactions = useAppSelector((s) =>
    selectMonthlyTransactions(s, monthAndYear),
  );
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const { data, dateIndexes } = groupTransactionsByDates(
    transactions,
    selectedCategories,
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
        {Object.values(Category).map((c) => (
          <CategoryChip
            key={c}
            category={c}
            isActive={selectedCategories.includes(c)}
            onPress={() => {
              setSelectedCategories((list) => {
                if (list.includes(c)) {
                  return list.filter((x) => x !== c);
                }
                return [...list, c];
              });
            }}
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

export default Summary;
