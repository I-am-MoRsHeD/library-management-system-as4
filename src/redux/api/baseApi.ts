import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseApi = createApi({
    reducerPath: "libraryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/api`,
    }),
    tagTypes: ['Book'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => 'books',
            providesTags: ['Book']
        }),
        createBook: builder.mutation({
            query: (bookData) => ({
                url: 'books',
                method: 'POST',
                body: bookData
            }),
            invalidatesTags: ['Book']
        }),
        updateBook: builder.mutation({
            query: (bookData) => ({
                url: `books/${bookData.id}`,
                method: 'PUT',
                body: bookData?.data
            }),
            invalidatesTags: ['Book']
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `books/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Book']
        }),
        borrowedBooks: builder.query({
            query: () => 'borrow',
            providesTags: ['Book']
        }),
        borrowBook: builder.mutation({
            query: (bookData) => ({
                url: 'borrow',
                method: 'POST',
                body: bookData
            }),
            invalidatesTags: ['Book']
        })
    }),
});

export const { useGetBooksQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation, useBorrowedBooksQuery, useBorrowBookMutation } = baseApi;

export default baseApi;