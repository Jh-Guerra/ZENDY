import React from 'react'
import Dialog from '@material-ui/core/Dialog';
  

const Modal = ({open, handleClose, size = 'xs', children, className = '', style = {}}) => {

    return (
        <Dialog 
            onClose={handleClose} 
            fullWidth maxWidth={size} 
            className={className} 
            style={style} 
            color="primary" 
            open={open}
        >
            {children}
        </Dialog>
    )
}

export default Modal
