import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { groupBy } from "lodash";

import { Transaction } from "../utils/types";
import { getMonthAndYear, getStartOfTheDay } from "../utils/helpers";

export const transactionsAdaptor = createEntityAdapter<Transaction>({
  selectId: (t) => t.id,
  sortComparer: (a, b) => (a.timestamp < b.timestamp ? -1 : 1),
});

interface TagMap {
  [tag: string]: Array<Transaction["id"]>;
}
interface MonthlyTransactions {
  [monthAndYear: string]: Array<Transaction["id"]>;
}

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    ...transactionsAdaptor.getInitialState(),
    tagMap: {} as TagMap,
    monthlyTransactionsMap: {} as MonthlyTransactions,
  },
  reducers: {
    addTransactions: (state, action: PayloadAction<Transaction[]>) => {
      const transactions = action.payload.map((t) => ({
        ...t,
        timestamp: getStartOfTheDay(t.timestamp),
      }));
      transactionsAdaptor.addMany(state, transactions);
      const monthlyGroup = groupBy(transactions, (t) =>
        getMonthAndYear(getStartOfTheDay(t.timestamp)),
      );
      Object.keys(monthlyGroup).forEach((monthAndYear) => {
        const ids = state.monthlyTransactionsMap[monthAndYear];
        const newIds = monthlyGroup[monthAndYear].map((t) => t.id);
        state.monthlyTransactionsMap[monthAndYear] = [
          ...(ids ?? []),
          ...newIds,
        ];
      });
      transactions.forEach((tr) => {
        tr.tags.forEach((t) => {
          const transactionIds = state.tagMap[t] ?? [];
          state.tagMap[t] = [...transactionIds, tr.id];
        });
      });
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const transaction = action.payload;

      // #region handle tagMap
      const oldTransaction = transactionsAdaptor
        .getSelectors()
        .selectById(state, transaction.id);
      const oldTags = oldTransaction!.tags;
      oldTags.forEach((t) => {
        const transactionIds = state.tagMap[t];
        const newTransactionIds = transactionIds!.filter(
          (tr) => tr !== transaction.id,
        );
        if (newTransactionIds.length === 0) {
          delete state.tagMap[t];
        } else {
          state.tagMap[t] = newTransactionIds;
        }
      });
      const newTags = transaction.tags;
      newTags.forEach((t) => {
        const transactionIds = state.tagMap[t] ?? [];
        state.tagMap[t] = [...transactionIds, transaction.id];
      });
      // #endregion

      transactionsAdaptor.updateOne(state, {
        id: transaction.id,
        changes: transaction,
      });
    },
    deleteTransaction: (state, action: PayloadAction<Transaction["id"]>) => {
      const transactionId = action.payload;

      // #region handle tagMap
      const transaction = transactionsAdaptor
        .getSelectors()
        .selectById(state, transactionId);
      const { tags } = transaction!;
      tags.forEach((t) => {
        const transactionIds = state.tagMap[t];
        const newTransactionIds = transactionIds!.filter(
          (tr) => tr !== transactionId,
        );
        if (newTransactionIds.length === 0) {
          delete state.tagMap[t];
        } else {
          state.tagMap[t] = newTransactionIds;
        }
      });
      // #endregion

      transactionsAdaptor.removeOne(state, transactionId);
    },
  },
});

// prettier-ignore
// NOTE: remove ^ when has a chance
export const {
  addTransactions,
  updateTransaction,
  deleteTransaction,
} = transactionsSlice.actions;
export default transactionsSlice;
