import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {apiUrl} from "../config";
import {getHeaders} from "../utils/headerUtils";
import {handleNotification} from "../notificationHelper";

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
           }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await handleNotification(
                    queryFulfilled,
                    dispatch,
                    'You have successfully registered!',
                    'success'
                );
            },
        }),
        loginUser: build.mutation({
           query: (userData) => ({
               url: 'users/login',
               method: 'POST',
               body: userData,
           }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await handleNotification(
                    queryFulfilled,
                    dispatch,
                    'You have successfully logged in!',
                    'success'
                );
            },
        }),
        editUser: build.mutation({
            query: (userData) => ({
                url: 'user',
                method: 'PUT',
                body: userData,
                headers: getHeaders()
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await handleNotification(
                    queryFulfilled,
                    dispatch,
                    'You have successfully changed your data!',
                    'success'
                );
            },
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useEditUserMutation } = userAPI;