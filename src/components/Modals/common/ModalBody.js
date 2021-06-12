import React from 'react'
import DialogContent from '@material-ui/core/DialogContent';

const ModalBody = (props) => {

    const { children } = props;

    return (
        <DialogContent className="modal-body" dividers>
            {children}
        </DialogContent>
    )
}

export default ModalBody
