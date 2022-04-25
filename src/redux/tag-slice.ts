import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

import { RootState } from './store';
import { selectTransactionsWithTagId } from './transaction-slice';

const SLICE_NAME = 'tag';

export const tagAdaptor = createEntityAdapter<Tag>();

export const tagSelectors = tagAdaptor.getSelectors();

export const selectTagsFromIds = createSelector(
  [
    (_: RootState, ids: Array<Tag['id']>) => ids,
    (state: RootState) => state.tag.entities,
  ],
  (ids, tagEntities) => {
    const result = ids.map((id) => tagEntities[id]);
    return result as Tag[];
  },
);

export const addTags = createAsyncThunk<Tag[], TagCM[], { state: RootState }>(
  `${SLICE_NAME}/addTag`,
  (createTags) => {
    const tags: Tag[] = createTags.map((t) => ({
      ...t,
      id: uuid(),
    }));

    return tags;
  },
);

export const deleteTag = createAsyncThunk<
  Tag['id'],
  Tag['id'],
  { state: RootState }
>(`${SLICE_NAME}/deleteTag`, (id, { getState }) => {
  const transactionsWithTag = selectTransactionsWithTagId(getState(), id);
  if (transactionsWithTag.length > 0) {
    throw 'This tag is still being used by some transactions';
  }
  return id;
});

const tagSlice = createSlice({
  name: SLICE_NAME,
  initialState: tagAdaptor.getInitialState(),
  reducers: {
    editTag: (state, action: PayloadAction<Editable<Tag, 'id'>>) => {
      const tag = tagSelectors.selectById(state, action.payload.id);
      if (tag) {
        tagAdaptor.upsertOne(state, {
          ...tag,
          ...action.payload,
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTags.fulfilled, (state, action) => {
      tagAdaptor.addMany(state, action.payload);
    });

    builder.addCase(deleteTag.fulfilled, (state, action) => {
      tagAdaptor.removeOne(state, action.payload);
    });
  },
});

export const { editTag } = tagSlice.actions;

export default tagSlice.reducer;
