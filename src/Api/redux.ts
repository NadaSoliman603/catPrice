import AsyncStorage from '@react-native-async-storage/async-storage';

const api: string = "http://floridatrading.online:8010/api/v1/"


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const Api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }), // Set the baseUrl for every endpoint below


  endpoints: (builder: any) => ({
    //get data
    getDataByName: builder.query({
      query:  async({ path , token}: { path: string, token: string }) => {
        const userToken = await AsyncStorage.getItem('userToken')
        // const userToken = JSON.parse(user)
        console.log(userToken)
        return({
          url: `${path}`,
          method: 'Post',
          headers:{
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${userToken}`,
          }
        })
      },
    }),

    //post Login data
    auth: builder.mutation({
      query: ({ path, body }: { path: string, body: any }) => ({
        url: `${path}`,
        method: 'Post',
        body: body,
      }),
    }),
  }),

})

export const { endpoints } = Api

