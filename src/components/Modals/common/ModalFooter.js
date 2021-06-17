import { Button, DialogActions, withStyles } from '@material-ui/core';
import React from 'react'

const ModalFooter = (props) => {

  const { confirmText, onConfirm, cancelText, onCancel, buttonType="button" } = props;

    return (
      <DialogActions className="modal-footer">
        {
          cancelText && (
            <Button onClick={onCancel} size="small" color="secondary" variant="contained">
              {cancelText}
            </Button>
          )
        }
        {
          confirmText && (
            <Button type={buttonType} onClick={onConfirm} size="small" color="primary" autoFocus variant="contained">
              {confirmText}
            </Button>
          )
        }
      </DialogActions>
    )
}

export default ModalFooter
