import {showNotification} from "./store/actions/notificationActions";

export const handleNotification = async (queryFulfilled, dispatch, message, type = 'info') => {
    try {
        await queryFulfilled;
        dispatch(showNotification({
            message,
            type
        }));
        // eslint-disable-next-line no-empty
    } catch (error) {
        // Error is handled in baseQueryWithRejection
    }
};