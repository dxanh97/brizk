import React, { useCallback, useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, View } from "react-native";
import { DateTime } from "luxon";
import { MaterialIcons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components";

import { useAppSelector, useAppDispatch } from "../store";
import { selectUncategorizedTransactions } from "../store/transactions.selectors";
import { deleteTransaction } from "../store/transactions.slice";

import MonthChipFilters from "../components/@common/MonthChipFilters";
import Summary from "../components/Summary";
import TransactionsFlatList from "../components/TransactionsFlatList";
import UpsertTransactionBottomSheet from "../components/UpsertTransactionBottomSheet";

import { flexCenter, FlexCenterBox, Typography } from "../utils/shared-styles";
import { Transaction } from "../utils/types";

const { width } = Dimensions.get("window");
const viewWidth = width - 32;
const Wrapper = styled(View)`
  flex: 1;
  position: relative;
  padding: 0 16px;
`;
const ViewWrapper = styled(View)`
  width: ${viewWidth}px;
  padding-top: 16px;
`;
const HeaderWrapper = styled(FlexCenterBox)`
  margin-bottom: 68px;
`;
const Header = styled(Typography)`
  color: ${({ theme }) => theme.neutral[100]};
`;
const ChevronButtonsWrapper = styled(View)`
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
`;
const PrevButton = styled(Pressable)`
  position: absolute;
  left: 0;
`;
const NextButton = styled(Pressable)`
  position: absolute;
  right: 0;
`;
const MonthChipFiltersWrapper = styled(FlexCenterBox)`
  flex-direction: row;
  position: absolute;
  top: 68px;
  left: 0;
  right: 0;
`;
const BottomButtonsWrapper = styled(FlexCenterBox)`
  flex-direction: row;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 20px;
`;
const StyledButton = styled(Pressable)`
  ${flexCenter};
  padding: 16px;
  flex: 1;
`;
const StyledButtonLabel = styled(Typography)`
  color: ${({ theme }) => theme.neutral[100]};
  margin-top: 8px;
`;
const RelativeWrapper = styled(View)`
  position: relative;
`;
const CountBadge = styled(Typography)`
  border: 2px solid ${({ theme }) => theme.neutral[0]};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.green[80]};
  padding: 2px 6px;
  position: absolute;
  left: 8px;
  top: -8px;
  z-index: 2;
  overflow: hidden;
`;

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedMonth, setSelectedMonth] = useState(
    DateTime.now().startOf("month"),
  );
  const uncategorizedTransactions = useAppSelector(
    selectUncategorizedTransactions,
  );

  const scrollViewRef = useRef<ScrollView>(null);

  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [updatingTransactionIds, setUpdatingTransactionIds] = useState<
    Array<Transaction["id"]>
  >([]);

  const handleOnTransactionEdit = useCallback(
    (transactionId: Transaction["id"]) => {
      setUpdatingTransactionIds([transactionId]);
      setOpenBottomSheet(true);
    },
    [],
  );

  const handleOnTransactionDelete = useCallback(
    (transactionId: Transaction["id"]) => {
      dispatch(deleteTransaction(transactionId));
    },
    [dispatch],
  );

  const theme = useTheme();
  return (
    <Wrapper>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        decelerationRate="fast"
        snapToInterval={viewWidth}
        snapToAlignment="center"
      >
        <ViewWrapper>
          <HeaderWrapper>
            <Header size="Title/M">Spending</Header>
          </HeaderWrapper>
          <Summary selectedMonth={selectedMonth} />
        </ViewWrapper>
        <ViewWrapper>
          <HeaderWrapper>
            <Header size="Title/M">History</Header>
          </HeaderWrapper>
          <TransactionsFlatList
            selectedMonth={selectedMonth}
            onTransactionEdit={handleOnTransactionEdit}
            onTransactionDelete={handleOnTransactionDelete}
          />
        </ViewWrapper>
      </ScrollView>
      <ChevronButtonsWrapper>
        <PrevButton
          onPress={() => {
            scrollViewRef.current?.scrollTo({ x: 0 });
          }}
        >
          <MaterialIcons
            name="chevron-left"
            size={24}
            color={theme.neutral[100]}
          />
        </PrevButton>
        <NextButton
          onPress={() => {
            scrollViewRef.current?.scrollTo({ x: width });
          }}
        >
          <MaterialIcons
            name="chevron-right"
            size={24}
            color={theme.neutral[100]}
          />
        </NextButton>
      </ChevronButtonsWrapper>
      <MonthChipFiltersWrapper>
        <MonthChipFilters
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </MonthChipFiltersWrapper>
      <BottomButtonsWrapper>
        <StyledButton
          onPress={() => {
            setOpenBottomSheet(true);
            setUpdatingTransactionIds([]);
          }}
        >
          <MaterialIcons
            name="add-circle"
            size={24}
            color={theme.neutral[100]}
          />
          <StyledButtonLabel size="Body/S">New Transaction</StyledButtonLabel>
        </StyledButton>
        <StyledButton
          disabled={uncategorizedTransactions.length === 0}
          onPress={() => {
            setOpenBottomSheet(true);
            setUpdatingTransactionIds(
              uncategorizedTransactions.map((t) => t.id),
            );
          }}
        >
          <RelativeWrapper>
            {uncategorizedTransactions.length > 0 && (
              <CountBadge size="Label/M" isNumber>
                {uncategorizedTransactions.length}
              </CountBadge>
            )}
            <MaterialIcons
              name="category"
              size={24}
              color={theme.neutral[100]}
            />
          </RelativeWrapper>
          <StyledButtonLabel size="Body/S">Categorize</StyledButtonLabel>
        </StyledButton>
      </BottomButtonsWrapper>
      <UpsertTransactionBottomSheet
        open={openBottomSheet}
        transactionIds={updatingTransactionIds}
        onClose={() => setOpenBottomSheet(false)}
      />
    </Wrapper>
  );
};

export default App;
