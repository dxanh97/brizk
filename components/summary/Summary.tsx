import React, { useCallback, useState } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import styled from "styled-components";

import { useAppSelector } from "../../store";
import { selectMonthlyTransactions } from "../../store/transactions.selectors";

import { Transaction } from "../../utils/types";
import { getMonthAndYear, groupTransactionsByDates } from "../../utils/helpers";

import TransactionItem from "./TransactionItem";

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

const Summary: React.FC = () => {
  const [monthAndYear] = useState(getMonthAndYear(new Date().getTime()));
  const transactions = useAppSelector((s) =>
    selectMonthlyTransactions(s, monthAndYear),
  );
  const { data, dateIndexes } = groupTransactionsByDates(transactions);
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
