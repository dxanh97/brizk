import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Transaction } from "../utils/types";

const transactionsAdaptor = createEntityAdapter<Transaction>({
  selectId: (t) => t.id,
  sortComparer: (a, b) => (a.timestamp < b.timestamp ? -1 : 1),
});

interface TagMap {
  [tag: string]: Array<Transaction["id"]>;
}

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    ...transactionsAdaptor.getInitialState(),
    tagMap: {} as TagMap,
  },
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      const transaction = action.payload;
      transactionsAdaptor.addOne(state, transaction);
      transaction.tags.forEach((t) => {
        const transactionIds = state.tagMap[t] ?? [];
        state.tagMap[t] = [...transactionIds, transaction.id];
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

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = transactionsSlice.actions;
export default transactionsSlice;
