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
        })
    })
});

export const { useGetBooksQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation } = baseApi;

export default baseApi;