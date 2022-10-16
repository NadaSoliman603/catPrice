import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api:string = ""

export const Api = createApi({
  reducerPath: 'ihurghadaApi',
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    getServiceData: builder.query({
      query: (name) => ``,
    }),
  }),
})


export const { useGetServiceDataQuery } = Api

