import { DialogTitle } from '@material-ui/core';
import React from 'react'
import Typography from '@material-ui/core/Typography';

const ModalHeader = (props) => {
  const { icon, text } = props;

  return (
    <DialogTitle className="modal-header" style={{backgroundColor: props.backgroundColor}}>
      { icon }
      <Typography style={{fontSize:"18px"}}>{ text || "" }</Typography>
    </DialogTitle>
  )
}

export default ModalHeader
