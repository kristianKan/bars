import { createSlice, createSelector } from "@reduxjs/toolkit"
import { groupAndIndex, getUniqueKeys } from "../services/utils"

export const selectIndexedData = createSelector(
  state => state.beverages.queries["getData(undefined)"]?.data,
  state => state.category,
  (data, category) => {
    return category && data
      ? groupAndIndex(data, category, 5)
      : data
  }
)

export const selectUniqueKeys = createSelector(
  state => state.beverages.queries["getData(undefined)"]?.data,
  state => state.category,
  (data, category) => {
    if (!data) {
      return []
    }
    const { keys } = getUniqueKeys(data, category)
    return keys
  }
)

const categorySlice = createSlice({
  name: "category",
  initialState: "volume",
  reducers: {
    setSelectedCategory: (state, action) => {
      return action.payload
    },
  },
})

export const { setSelectedCategory } = categorySlice.actions

export default categorySlice.reducer