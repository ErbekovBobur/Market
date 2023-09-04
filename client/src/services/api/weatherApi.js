import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.weatherapi.com/v1/' }),
    endpoints: (build) => ({
        getWeather: build.query({
            query: (body) => ({
                url: '/forecast.json?key=0bd05913b38c4c488d5171943221512&q=Tashkent&days=5&aqi=no&alerts=no',
                method: 'GET',
                body,
            }),
        }),
        
        registerUser: build.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const { useGetWeatherQuery, useRegisterUserMutation } = weatherApi