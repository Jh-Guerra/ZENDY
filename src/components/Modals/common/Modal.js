import React from 'react'
import Dialog from '@material-ui/core/Dialog';
  

const Modal = ({open, handleClose, size = 'xs', children}) => {

    return (
        <Dialog onClose={handleClose} fullWidth maxWidth={size} color="primary" open={open}>
            {children}
        </Dialog>
    )
}

export default Modal
