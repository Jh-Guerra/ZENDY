import { DialogTitle } from '@material-ui/core';
import React from 'react'
import Typography from '@material-ui/core/Typography';

const ModalHeader = (props) => {
  const { icon, text } = props;

  return (
    <DialogTitle className="modal-header">
      {
        icon && icon
      }
      <Typography variant="h5">{text || ""}</Typography>
    </DialogTitle>
  )
}

export default ModalHeader
