import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as _useDispatch,
  useSelector as _useSelector,
} from 'react-redux';

import transaction from './transaction-slice';
import tag from './tag-slice';

export const store = configureStore({
  reducer: {
    transaction,
    tag,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => _useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
