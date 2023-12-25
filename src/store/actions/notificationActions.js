import notificationSlice from "../slices/notificationSlice";

export const {
    showNotification,
    closeNotification,
    clearMessageAndType,
    setError,
    clearError,
} = notificationSlice.actions;