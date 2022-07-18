import React from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from '@mui/material';
import { notificationsActions } from '../store/notificationsSlice';

export const Notifications = ({type, message, open}) => {
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(notificationsActions.showNotification({
            open: false
        }));
    };

    return (
        open && <Alert severity={type} onClose={handleClose}>{message}</Alert>
    );
};
