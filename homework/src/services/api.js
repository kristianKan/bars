import { createApi } from '@reduxjs/toolkit/query/react'
import { loadCsv } from './loadCsv'

// pretend endpoint to load our data from
const customBaseQuery = async (query) => {
  try {
    const data = await loadCsv(query)
    return { data }
  } catch (error) {
    return { error }
  }
}

// this clever little library takes care of requests to our endpoints and
// memoisation so the data can be cached seamlessly
export const api = createApi({
  reducerPath: 'beverages',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getData: builder.query({
      query: (file) => file 
    }),
  }),
})

export const { useGetDataQuery } = api