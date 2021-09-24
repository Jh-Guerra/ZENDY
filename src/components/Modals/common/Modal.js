import React from 'react'
import Dialog from '@material-ui/core/Dialog';
  

const Modal = (props) => {

    const { open, handleClose, size="", children, style, transitionModal=false, } = props;

    return (
        <Dialog 
            onClose={handleClose} 
            maxWidth={size}
            color="primary" 
            open={open}
            size={size}
            className={transitionModal && "modal-upload"}
        >
            {children}
        </Dialog>
    )
}

export default Modal
