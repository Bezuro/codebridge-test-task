import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type LastArticleIdState = {
  value: number;
};

const initialState: LastArticleIdState = {
  value: 0,
};

export const lastArticleIdSlice = createSlice({
  name: 'lastArticleId',
  initialState,
  reducers: {
    setLastArticleId(state, action: PayloadAction<number>) {
      state.value = action.payload;
    },
  },
});

export const { setLastArticleId } = lastArticleIdSlice.actions;

export default lastArticleIdSlice.reducer;
