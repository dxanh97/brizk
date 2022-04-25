import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { RootState } from './store';
import { addTags, deleteTag, tagSelectors } from './tag-slice';

const SLICE_NAME = 'transaction';

export const transactionAdaptor = createEntityAdapter<Transaction>({
  sortComparer: (a, b) => a.timestamp - b.timestamp,
});

export const transactionSelectors = transactionAdaptor.getSelectors();

export const selectTransactionsWithTagId = createSelector(
  [(_, tagId: Tag['id']) => tagId, (state: RootState) => state.transaction],
  (tagId, transactionState) => {
    const transactions = transactionSelectors.selectAll(transactionState);
    return transactions.filter((t) => t.tagIds.includes(tagId));
  },
);

export const selectDisplayTransactions = createSelector(
  [(_, arg: { from: Date; to: Date }) => arg, (state: RootState) => state],
  ({ from, to }, transactionState) => {
    const transactions = transactionSelectors.selectAll(
      transactionState.transaction,
    );
    const filteredTransactions = transactions.filter(
      (t) => t.timestamp >= from.getTime() && t.timestamp <= to.getTime(),
    );
    const displayTransactions: TransactionVM[] = filteredTransactions.map(
      (t) => ({
        id: t.id,
        amount: t.amount,
        timestamp: t.timestamp,
        category: t.category,
        tags: t.tagIds.map((tId) => {
          return tagSelectors.selectById(transactionState.tag, tId);
        }) as TagVM[],
      }),
    );
    return displayTransactions;
  },
);

export const addTransaction = createAsyncThunk<
  Transaction,
  TransactionCM,
  { state: RootState }
>(`${SLICE_NAME}/addTransaction`, async (createTransaction, { dispatch }) => {
  const { newTags } = createTransaction;
  const newTag = await dispatch(
    addTags(newTags.map((label) => ({ label }))),
  ).unwrap();
  const newTagIds = newTag.map((t) => t.id);

  const newTransaction: Transaction = {
    ...createTransaction,
    id: uuid(),
    tagIds: [...newTagIds, ...createTransaction.tagIds],
  };

  return newTransaction;
});

export const deleteTransaction = createAsyncThunk<
  Transaction['id'],
  Transaction['id'],
  { state: RootState }
>(`${SLICE_NAME}/deleteTransaction`, (id, { getState, dispatch }) => {
  const transaction = transactionSelectors.selectById(
    getState().transaction,
    id,
  );
  if (!transaction) return '';
  transaction.tagIds.forEach((tagId) => {
    const transactionsWithTag = selectTransactionsWithTagId(getState(), tagId);
    if (transactionsWithTag.length === 0) {
      dispatch(deleteTag(tagId));
    }
  });
  return id;
});

const transactionSlice = createSlice({
  name: SLICE_NAME,
  initialState: transactionAdaptor.getInitialState(),
  reducers: {
    editTransaction: (
      state,
      action: PayloadAction<Editable<Transaction, 'id'>>,
    ) => {
      const transaction = state.entities[action.payload.id] as Transaction;
      transactionAdaptor.upsertOne(state, {
        ...transaction,
        ...action.payload,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      transactionAdaptor.addOne(state, action.payload);
    });
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      transactionAdaptor.removeOne(state, action.payload);
    });
  },
});

export const { editTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
