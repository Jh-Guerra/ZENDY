import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';

const CustomSnackbar = props => {
    const {
        open,
        duration,
        onClose,
        alertType,
        message
    } = props;

    return(
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal:'center' }} open={open} autoHideDuration={duration} onClose={onClose}>
            <Alert onClose={onClose} severity={alertType}>
                {message || ""}
            </Alert>
         </Snackbar>
    )
}

export default CustomSnackbar