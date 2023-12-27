import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
// eslint-disable-next-line import/named
import {setError, showNotification} from "../store/actions/notificationActions";
import {apiUrl} from "../config";

const baseQuery = fetchBaseQuery({ baseUrl: apiUrl });

export const baseQueryWithRejection = async (args, api, extraOptions) => {

    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
        if (result.error.data?.errors) {
            api.dispatch(setError(result.error.data?.errors));
        }
        api.dispatch(showNotification({
            message: result.error.data?.message || `An error occurred: ${result.error.status}`,
            type: 'error'
        }));
    }
    return result;
};
