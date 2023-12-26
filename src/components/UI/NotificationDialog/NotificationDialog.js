import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Snackbar, Alert} from "@mui/material";
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import {clearMessageAndType, closeNotification} from "../../../store/actions/notificationActions";

const NotificationDialog = () => {
    const { isOpen, message, type } = useSelector((state) => state.notification);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeNotification());

        const timeout = setTimeout(() => {
            dispatch(clearMessageAndType());
        }, 1000)

        return () => clearTimeout(timeout);
    };

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={2500}
            TransitionComponent={type === 'error' ? Grow : Slide}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: type === 'error' ? 'center' : 'right' }}
        >
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%', padding: '10px 20px', fontSize: '16px' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default NotificationDialog;
