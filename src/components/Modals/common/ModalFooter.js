import { Button, DialogActions, withStyles } from '@material-ui/core';
import React from 'react'

const ModalFooter = (props) => {

  const { confirmText, onConfirm, cancelText, onCancel } = props;

    return (
      <DialogActions className="modal-footer">
        {
          cancelText && (
            <Button onClick={onCancel} size="small" color="secondary" >
              {cancelText}
            </Button>
          )
        }
        {
          confirmText && (
            <Button onClick={onConfirm} size="small" color="primary" autoFocus>
              {confirmText}
            </Button>
          )
        }
      </DialogActions>
    )
}

export default ModalFooter
