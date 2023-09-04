import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:5000/products/' }),
    endpoints: (build) => ({
        getProduct: build.query({
            query: (data) => ({
                url: `get_products`,
                method: 'POST',
                body: data,
            }),
        }),
        getCurrentProduct: build.query({
            query: (data) => ({
                url: `get_current_products?id=${data}`,
            }),
        }),
        addNewProduct: build.mutation({
            query: (data) => ({
                url: 'new_product/',
                method: 'POST',
                body: data,
            }),
        }),
        editProduct: build.mutation({
            query: (data) => ({
                url: 'edit_product/',
                method: 'POST',
                body: data,
            }),
        }),
        getCategory: build.query({
            query: (data) => ({
                url: `get_category`,
                method: 'POST',
                body: data,
            }),
        }),
        editCategory: build.mutation({
            query: (data) => ({
                url: `edit_category`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteProduct: build.mutation({
            query: (data) => ({
                url: `delete_product`,
                method: 'POST',
                body: data,
            }),
        }),
        newRate: build.mutation({
            query: (data) => ({
                url: '/edit_product/',
                method: 'POST',
                body: data,
            }),
        }),
    }),
})

export const { useDeleteProductMutation, useEditCategoryMutation, useNewRateMutation, useGetCategoryQuery, useGetProductQuery, useGetCurrentProductQuery, useEditProductMutation, useAddNewProductMutation } = productApi;