import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {},
});

export const { actions, reducer } = slice;