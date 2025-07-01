import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseApi = createApi({
    reducerPath : "libraryApi",
    baseQuery : fetchBaseQuery({
        baseUrl : '/'
    }),
    endpoints : (builder) => ({

    })
});

export default baseApi;