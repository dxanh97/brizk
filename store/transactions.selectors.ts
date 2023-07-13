/* eslint-disable import/prefer-default-export */
import { createSelector } from "@reduxjs/toolkit";
import { sum } from "lodash";

import { RootState } from ".";
import { Category, Transaction } from "../utils/types";
import { transactionsAdaptor } from "./transactions.slice";

const selectors = transactionsAdaptor.getSelectors<RootState>(
  (s) => s.transactions,
);

const selectTransactions = (state: RootState) => selectors.selectAll(state);

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

export const selectMonthlySummary = createSelector(
  [selectMonthlyTransactions],
  (transactions) => {
    const mustHave = sum(
      transactions
        .filter((t) => t.category === Category.MustHave)
        .map((t) => t.amount),
    );
    const niceToHave = sum(
      transactions
        .filter((t) => t.category === Category.NiceToHave)
        .map((t) => t.amount),
    );
    const uncategorized = sum(
      transactions
        .filter((t) => t.category === Category.Uncategorized)
        .map((t) => t.amount),
    );
    return {
      mustHave,
      niceToHave,
      uncategorized,
    };
  },
);

export const selectUncategorizedTransactions = createSelector(
  [selectTransactions],
  (transactions) =>
    transactions.filter((t) => t.category === Category.Uncategorized),
);

export const selectTransactionsByIds = createSelector(
  [selectTransactionsMap, (_, ids: Array<Transaction["id"]>) => ids],
  (transactionsMap, ids) => ids.map((id) => transactionsMap[id]!),
);
