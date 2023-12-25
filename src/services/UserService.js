import {createApi} from "@reduxjs/toolkit/query/react";
import {getHeaders} from "../utils/headerUtils";
import {handleNotification} from "../notificationHelper";
import {baseQueryWithRejection} from "../utils/baseQueryWithRejection";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: baseQueryWithRejection,
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