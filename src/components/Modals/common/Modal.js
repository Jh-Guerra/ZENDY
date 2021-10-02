import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core';

const Modal = (props) => {
    const { open, handleClose, size="", children, transitionModal, width, height} = props;

    const useStyles = makeStyles(theme => ({
        dialogPaper: {
            width: width || "",
            height : height || ""
        },
    }));

    const classes = useStyles();

    return (
        <Dialog 
            onClose={handleClose} 
            maxWidth={!width ? size : null}
            color="primary" 
            open={open}
            size={!width ? size : null}
            className={transitionModal ? "modal-upload" : null}
            classes={{ paper: classes.dialogPaper}}
        >
            {children}
        </Dialog>
    )
}

export default Modal
