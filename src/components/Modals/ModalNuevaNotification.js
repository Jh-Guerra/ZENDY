import { Button, Grid, InputAdornment, makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import { TextField } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ModalFooter from './common/ModalFooter';
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    textArea: {
        width: '75%',
        backgroundColor: 'white',
        color: 'black',
        padding: '3px',
        marginLeft: '15px'
    },
    legend: {
        fontSize: '16px',
        fontStyle: 'italic'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: '10px',
        marginBottom: '10px',
        width: '90%'
    },
    label: {
        fontStyle: 'italic',
        fontSize: '16px'
    },
    inputText: {
        margin: theme.spacing(1),
        width: "50%"
    },
    fullInputText: {
        margin: theme.spacing(1),
        width: "100%"
    },
}));

const ModalNuevaNotification = ({open, handleClose}) => {
    
    const classes = useStyles();

    return (
        <Modal 
            open={open} 
            handleClose={handleClose} 
            size="sm"
        >
            <ModalHeader 
                icon={<NotificationsIcon />}
                text="Nueva Notificación"
            />

            <ModalBody>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.inputText}
                            label="Asunto"
                            placeholder=""
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.fullInputText}
                            label="Descripción"
                            multiline
                            rows={8}
                            rowsMax={8}
                            placeholder=""
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {/* <AccountCircle /> */}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input type="file" hidden />
                        </Button>
                    </Grid>
                </Grid>
            </ModalBody>

            <ModalFooter 
                confirmText={"Enviar a todos"}
                onConfirm={{}}
                cancelText={"Cancelar"}
                onCancel={handleClose}
            />
        </Modal>
    )
}

export default ModalNuevaNotification
