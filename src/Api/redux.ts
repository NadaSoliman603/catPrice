
const api: string = "http://floridatrading.online:8010/api/v1/"


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const Api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }), // Set the baseUrl for every endpoint below
  endpoints: (builder: any) => ({
    //get data
    getDataByName: builder.query({
      query: (name: string) => `${name}`,
    }),

    //post Login data
    auth: builder.mutation({
      query: ({ path, body }: { path: string, body:any }) => ({
        url: `${path}`,
        method: 'Post',
        body: body,
      }),
    }),

  }),
})

export const { endpoints} = Api

