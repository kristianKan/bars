import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { reducer as sliceReducer } from './features/datumSlice';
import { api } from './services/api';

const reducer = {
  [api.reducerPath]: api.reducer,
  slice: sliceReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)