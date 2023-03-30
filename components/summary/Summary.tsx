import React, { useCallback } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectAllTransactions } from "../../store/transactions.selectors";
import { Transaction } from "../../utils/types";
import TransactionItem from "./TransactionItem";

const Wrapper = styled(View)`
  flex: 1;
`;

const Summary: React.FC = () => {
  const transactions = useSelector(selectAllTransactions);
  const renderItem: ListRenderItem<Transaction> = useCallback(
    ({ item }) => <TransactionItem data={item} />,
    [],
  );

  return (
    <Wrapper>
      <FlatList
        keyExtractor={(item) => item.id}
        data={transactions}
        renderItem={renderItem}
      />
    </Wrapper>
  );
};

export default Summary;
