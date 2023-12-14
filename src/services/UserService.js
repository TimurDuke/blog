import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiUrl} from "../config";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: apiUrl}),
    tagTypes: ['User'],
    endpoints: (build) => ({
        registerUser: build.mutation({
           query: (userData) => ({
               url: 'users',
               method: 'POST',
               body: userData,
           })
        }),
        loginUser: build.mutation({
           query: (userData) => ({
               url: 'users/login',
               method: 'POST',
               body: userData,
           })
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation  } = userAPI;