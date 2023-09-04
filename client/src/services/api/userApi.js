import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:5000/users/' }),
    tagTypes: ['login', 'password'],
    endpoints: (build) => ({
        // getProduct: build.query({
        //     query: (data) => ({
        //         url: `get_products`,
        //         method: 'POST',
        //         body: data,
        //     }),
        // }),
        loginUser: build.mutation({
            query(data) {
                return {
                    url: 'login',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['login', 'password'],
        }),
        
        getUsers: build.query({
            query: (data) => ({
                url: 'users',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['user_id'],
        }),
        registerUser: build.mutation({
            query: (data) => ({
                url: 'registration',
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const { useGetUsersQuery, useLoginUserMutation, useRegisterUserMutation } = userApi;