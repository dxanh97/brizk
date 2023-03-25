import { createSelector } from "@reduxjs/toolkit";
import { sum } from "lodash";

import { RootState } from ".";
import { transactionsAdaptor } from "./transactions.slice";

const selectors = transactionsAdaptor.getSelectors<RootState>(
  (s) => s.transactions,
);

const selectAllTransactions = (state: RootState) => selectors.selectAll(state);

const selectTotalSpending = createSelector(
  selectAllTransactions,
  (transactions) => sum(transactions.map((t) => t.amount)),
);

export { selectAllTransactions, selectTotalSpending };
