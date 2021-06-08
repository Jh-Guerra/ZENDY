import React from 'react'
import DialogContent from '@material-ui/core/DialogContent';

const ModalBody = ({children, style = {}, className = ''}) => {
    return (
        <DialogContent className={`modal-body ${className}`}  style={style} dividers>
            {children}
        </DialogContent>
    )
}

export default ModalBody
