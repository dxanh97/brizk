import React, { useCallback, useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { DateTime } from "luxon";
import styled from "styled-components";

import { useAppSelector } from "../../store";
import { selectMonthlyTransactions } from "../../store/transactions.selectors";

import TransactionItem from "./TransactionItem";
import CategoryChip from "../@common/CategoryChip";

import { getMonthAndYear, groupTransactionsByDates } from "../../utils/helpers";
import { FlexCenterBox, Typography } from "../../utils/shared-styles";
import { Category, Transaction } from "../../utils/types";

const Wrapper = styled(View)`
  flex: 1;
`;
const FiltersWrapper = styled(FlexCenterBox)`
  flex-direction: row;
  margin-bottom: 8px;
`;
const DateItem = styled(Typography)`
  color: ${({ theme }) => theme.neutral[100]};
  background-color: ${({ theme }) => theme.neutral[0]};
  padding: 8px 0;
`;
const Separator = styled(View)`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.neutral[20]};
`;

interface Props {
  selectedMonth: DateTime;
  onTransactionEdit: (transactionId: Transaction["id"]) => void;
  onTransactionDelete: (transactionId: Transaction["id"]) => void;
}

const TransactionsFlatList: React.FC<Props> = ({
  selectedMonth,
  onTransactionEdit,
  onTransactionDelete,
}) => {
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
        return <DateItem size="Label/M">{item}</DateItem>;
      }
      return (
        <TransactionItem
          data={item}
          onEdit={() => onTransactionEdit(item.id)}
          onDelete={() => onTransactionDelete(item.id)}
        />
      );
    },
    [onTransactionEdit, onTransactionDelete],
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
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => (typeof item === "string" ? item : item.id)}
        data={data}
        renderItem={renderItem}
        stickyHeaderIndices={dateIndexes}
      />
    </Wrapper>
  );
};

export default TransactionsFlatList;
