import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: '',
    type: 'info',
    isOpen: false,
    error: {},
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, { payload }) => {
            const { message, type } = payload;

            state.message = message;
            state.type = type;
            state.isOpen = true;
        },
        closeNotification: (state) => {
            state.isOpen = false;
        },
        clearMessageAndType: (state) => {
            state.message = '';
            state.type = 'info';
        },
        setError: (state, { payload }) => {
            state.error = payload;
        },
        clearError: (state) => {
            state.error = {};
        },
    },
});

export default notificationSlice