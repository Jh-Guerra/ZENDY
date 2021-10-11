import { Button, DialogActions } from '@material-ui/core';
import React from 'react'

const ModalFooter = (props) => {

  const { 
    confirmText, cancelText,  editText, deleteText,
    onConfirm,
    onCancel, onEdit, onDelete,
    cancelColor, confirmColor,
    buttonType="button"
  } = props;

    return (
      <DialogActions className="modal-footer">
        {
          cancelText && (
            <Button onClick={onCancel} size="small" color={cancelColor || "default"} variant="contained">
              {cancelText}
            </Button>
          )
        }
        {
          deleteText && (
            <Button onClick={onDelete} size="small" color="default" variant="contained">
              {deleteText}
            </Button>
          )
        }
        {
          editText && (
            <Button type={buttonType} onClick={onEdit} size="small" color="primary" autoFocus variant="contained">
              {editText}
            </Button>
          )
        }
        {
          confirmText && (
            <Button type={buttonType} onClick={onConfirm} size="small" color={confirmColor || "primary"} autoFocus variant="contained">
              {confirmText}
            </Button>
          )
        }
      </DialogActions>
    )
}

export default ModalFooter
