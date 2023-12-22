import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: '',
    type: 'info',
    isOpen: false,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.isOpen = true;
        },
        closeNotification: (state) => {
            state.isOpen = false;
        },
        clearMessageAndType: (state) => {
            state.message = '';
            state.type = 'info';
        },
    },
});

export default notificationSlice