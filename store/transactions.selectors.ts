/* eslint-disable import/prefer-default-export */
import { createSelector } from "@reduxjs/toolkit";

import { RootState } from ".";
import { transactionsAdaptor } from "./transactions.slice";

const selectors = transactionsAdaptor.getSelectors<RootState>(
  (s) => s.transactions,
);

const selectTransactionsMap = (state: RootState) =>
  selectors.selectEntities(state);

const selectMonthlyTransactionsMap = (state: RootState) =>
  state.transactions.monthlyTransactionsMap;

export const selectMonthlyTransactions = createSelector(
  [
    selectTransactionsMap,
    selectMonthlyTransactionsMap,
    (_, monthAndYear: string) => monthAndYear,
  ],
  (transactionsMap, monthlyTransactionsMap, monthAndYear) => {
    const transactionIds = monthlyTransactionsMap[monthAndYear] ?? [];
    return transactionIds.map((id) => transactionsMap[id]!);
  },
);
