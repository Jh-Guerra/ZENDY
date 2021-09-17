import { Grid, InputAdornment, makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import { TextField } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ModalFooter from './common/ModalFooter';

const useStyles = makeStyles(theme => ({
    fullInputText: {
        width: '100%',
        margin: theme.spacing(1),
    }
}));

const ModalSendNotification = (props) => {
    
    const classes = useStyles();
    const { open, handleClose } = props;

    return (
        <Modal 
            open={open} 
            handleClose={handleClose}
            size="sm"
        >
            <ModalHeader 
                icon={<NotificationsIcon />}
                text="Enviar Notificación"
            />

            <ModalBody>
                <Grid item xs={12}>
                    <TextField
                        className={classes.fullInputText}
                        label="Descripción"
                        multiline
                        rows={8}
                        rowsMax={8}
                        placeholder="..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {/* <AccountCircle /> */}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </ModalBody>

            <ModalFooter
                confirmText={"Notificar"}
                onConfirm={null}
                cancelText={"Cancelar"}
                onCancel={handleClose}
            />
        </Modal>
    )
}

export default ModalSendNotification
