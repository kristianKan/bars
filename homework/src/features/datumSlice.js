import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload
    },
  },
})

export const { actions, reducer } = selectedSlice