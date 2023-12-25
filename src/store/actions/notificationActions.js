import notificationSlice from "../slices/notificationSlice";

export const {
    showNotification,
    closeNotification,
    clearMessageAndType,
    setError,
} = notificationSlice.actions;