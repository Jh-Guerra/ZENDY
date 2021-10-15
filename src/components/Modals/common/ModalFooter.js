import { Button, DialogActions } from '@material-ui/core';
import React from 'react';
import ThemeError from 'components/ThemeSettings/ThemeError';

const ModalFooter = (props) => {

  const { 
    confirmText, cancelText,  editText, deleteText,
    onConfirm,
    onCancel, onEdit, onDelete,
    buttonType="button"
  } = props;

    return (
      <DialogActions className="modal-footer">
        {
          cancelText && (
            <Button onClick={onCancel} size="small" variant="contained" color="default">
              {cancelText}
            </Button>
          )
        }
        {
          deleteText && (
            <ThemeError>
              <Button onClick={onDelete} size="small" variant="contained" color="primary">
                {deleteText}
              </Button>
            </ThemeError>
          )
        }
        {
          editText && (
            <Button type={buttonType} variant="contained" onClick={onEdit} size="small" color="primary">
              {editText}
            </Button>
          )
        }
        {
          confirmText && (
            <Button type={buttonType} onClick={onConfirm} size="small" color="primary" variant="contained">
              {confirmText}
            </Button>
          )
        }
      </DialogActions>
    )
}

export default ModalFooter
