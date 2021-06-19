import React from 'react'
import Dialog from '@material-ui/core/Dialog';
  

const Modal = (props) => {

    const { open, handleClose, size="", children, style } = props;

    return (
        <Dialog 
            onClose={handleClose} 
            maxWidth={size}
            color="primary" 
            open={open}
            size={size}
        >
            {children}
        </Dialog>
    )
}

export default Modal
