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
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className="modal-header" {...other}>
        {children}
        {onClose ? (
          <div aria-label="close" className={classes.closeButton} onClick={onClose} >
            <CancelIcon style={{fontSize: '30px'}} />
          </div>
        ) : null}
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
