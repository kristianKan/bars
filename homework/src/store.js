import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { api } from "./services/api"
import { reducer as datumSliceReducer } from "./features/datumSlice"
import categoryReducer from "./features/dataSlice"

const reducer = {
  [api.reducerPath]: api.reducer,
  datum: datumSliceReducer,
  category: categoryReducer
}

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)