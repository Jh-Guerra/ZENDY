import { withStyles } from '@material-ui/core';
import React from 'react'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = (theme) => ({
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      cursor: 'pointer'
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose=true, ...other } = props;

    return (
      <MuiDialogTitle {...other} disableTypography className="modal-header" >
       <>
        <div>
          {children}
        </div>
          {onClose ? (
            <div aria-label="close" className={classes.closeButton} onClick={onClose} >
              <CancelIcon />
            </div>
          ) : null}
       </> 
      </MuiDialogTitle>
    );
});

const ModalHeader = ({children, handleClose, style = {}, className = ''}) => {
    return (
        <DialogTitle onClose={handleClose} style={style} className={className}>
                {children}
        </DialogTitle>
    )
}

export default ModalHeader
