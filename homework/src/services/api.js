import { createApi } from "@reduxjs/toolkit/query/react"
import { loadCsv } from "./loadCsv"
import csv from "../open_units.csv"

// This function acts as a custom base query for our API.
const customBaseQuery = async (id) => {
  try {
    // We're loading data from a CSV file using the loadCsv function.
    const data = await loadCsv(csv)

    // If an ID is provided, we find the corresponding data entry and return it.
    // We use the Array.prototype.find method to find the first entry where the ID matches.
    if (id) {
      return { data: data.find((d) => d.id === parseInt(id)) }
    } else {
      // If no ID is provided, we return all the data.
      return { data }
    }
  } catch (error) {
    // Return a mock error message
    return { error: { status: 500, message: "oh, no! No data" } }
  }
}

// RTK is a clever little library takes care of requests to our endpoints and
// memoisation so the data can be cached seamlessly
// We're using the createApi function from RTK Query to interact with our API.
export const api = createApi({
  // The "reducerPath" is a unique name for this API slice. This is used to generate
  // the names of the reducer and actions that RTK Query creates for us.
  reducerPath: "beverages",

  // The "baseQuery" is a function that takes an argument with the endpoint's 
  // parameters and returns a promise that resolves with the response data.
  // Here we're using a custom base query to load our data from a CSV file.
  baseQuery: customBaseQuery,

  // The "endpoints" field is an object that defines the API's endpoints.
  // Each key is the name of an endpoint, and the value is a function that
  // returns an object describing how to handle that endpoint.
  endpoints: (builder) => ({
    // The "getData" endpoint doesn't require any parameters, so the query function
    // simply returns an empty string. This could be replaced with the path to the
    // endpoint if we were working with a real API.
    getData: builder.query({
      query: () => "" 
    }),

    // The "getDataById" endpoint requires an ID parameter. The query function
    // takes this ID and returns it, which would be used as the path to the
    // endpoint if we were working with a real API.
    getDataById: builder.query({
      query: (id) => id
    }),
  }),
})

export const { useGetDataQuery, useGetDataByIdQuery } = api