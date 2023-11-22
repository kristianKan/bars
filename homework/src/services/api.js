import { createApi } from '@reduxjs/toolkit/query/react'
import { loadCsv } from './loadCsv'
import { groupAndIndex } from './utils'
import csv from '../open_units.csv'

// pretend endpoint to load our data from
const customBaseQuery = async (id) => {
  try {
    const data = await loadCsv(csv)
    if (id) {
      return { data: data.find((d) => d.id === parseInt(id)) }
    } else {
      return { data: groupAndIndex(data, 'quantity', 5) } 
    }
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
      query: () => '' 
    }),
    getDataById: builder.query({
      query: (id) => id
    }),
  }),
})

export const { useGetDataQuery, useGetDataByIdQuery } = api