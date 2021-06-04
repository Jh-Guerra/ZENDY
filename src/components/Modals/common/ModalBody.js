import React from 'react'
import DialogContent from '@material-ui/core/DialogContent';

const ModalBody = ({children}) => {
    return (
        <DialogContent className="modal-body" dividers>
            {children}
        </DialogContent>
    )
}

export default ModalBody
