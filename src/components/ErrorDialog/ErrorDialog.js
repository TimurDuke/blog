import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Snackbar, Alert} from "@mui/material";
import {clearError} from "../../store/actions/errorActions";

const ErrorDialog = () => {
    const errorMessage = useSelector((state) => state.error.errorMessage);
    const dispatch = useDispatch();

    useEffect(() => () => dispatch(clearError()), [dispatch]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearError());
    };

    return (
        <Snackbar
            open={!!errorMessage}
            autoHideDuration={100000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%', padding: '20px', fontSize: '16px' }}>
                {errorMessage}
            </Alert>
        </Snackbar>
    );
}

export default ErrorDialog;
