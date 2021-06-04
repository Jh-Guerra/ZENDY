import React from 'react'
import Dialog from '@material-ui/core/Dialog';
  

const Modal = ({open, handleClose, children}) => {

    return (
        <Dialog onClose={handleClose} fullWidth maxWidth="xs" color="primary" open={open}>
            {children}
        </Dialog>
    )
}

export default Modal
