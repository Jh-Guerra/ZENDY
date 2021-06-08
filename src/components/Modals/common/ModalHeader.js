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
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <div aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CancelIcon style={{width: '30px'}} />
          </div>
        ) : null}
      </MuiDialogTitle>
    );
});

const ModalHeader = ({children, handleClose}) => {
    return (
        <DialogTitle onClose={handleClose}>
                {children}
        </DialogTitle>
    )
}

export default ModalHeader
