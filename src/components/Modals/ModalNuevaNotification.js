import { makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import { TextField } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Typography from '@material-ui/core/Typography';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles(theme => ({
    textArea: {
        width: '75%',
        backgroundColor: 'white',
        color: 'black',
        padding: '3px',
        marginLeft: '15px'
    },
    legend: {
        // color: 'white',
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
        // color: 'white',
        fontStyle: 'italic',
        fontSize: '16px'
    },
    button: {
        cursor: 'pointer',
        // color: 'white',
        padding: '10px',
        fontSize: '16px',
        fontWeight: '900',
        textAlign: 'center',
        borderRadius: '10px',
        backgroundColor: '#394C5F',
        displa: 'inline-block',
        width: '40%'
    },
    groupButtons: {
        display: 'flex',
    },
    title: {
        display: 'flex',
        alignItems: 'center'
    }
}));

const ModalNuevaNotification = ({open, handleClose}) => {
    
    const classes = useStyles();

    return (
        <Modal open={open} handleClose={handleClose} size="sm">
            <ModalHeader handleClose={handleClose} style={{textAlign: 'center'}}>
                <div className={classes.title}>
                    <NotificationsIcon style={{margin: '0 10px'}}/>
                    <Typography variant="h5">Nueva Notificación</Typography>
                </div>
            </ModalHeader>
            <ModalBody>
                <fieldset>
                    <legend className={`${classes.legend}`}>Formulario Notificación</legend>
                    <div className={classes.container}>
                        <div className={classes.inputContainer}>
                            <label className={classes.label} htmlFor="textFieldMensaje">Asunto: </label>
                            <TextField 
                                className={`${classes.textArea}`} 
                                InputProps={{ disableUnderline: true }} 
                            />
                        </div>
                        <div className={classes.inputContainer} style={{alignItems: 'flex-start'}}>
                            <label className={classes.label} htmlFor="textFieldMensaje">Descripción: </label>
                            <TextField
                                id="textFieldMensaje"
                                multiline
                                className={`${classes.textArea}`}
                                rows={5}
                                rowsMax={Infinity}
                                InputProps={{ disableUnderline: true }}
                                />
                        </div>
                        <div className={classes.inputContainer} style={{alignItems: 'flex-start'}}>
                            <label className={classes.label} htmlFor="textFieldMensaje">Imágenes: </label>
                            <div className={classes.textArea} style={{backgroundColor: 'transparent', padding: '0'}}>
                                <ImageIcon style={{color: 'white', height: '40px', width: 'auto'}}/>
                            </div>
                        </div>
                        <div className={classes.inputContainer}>
                            <div className={`${classes.textArea} ${classes.groupButtons}`} style={{backgroundColor: 'transparent', padding: '0'}}>
                                <div className={`${classes.button}`} onClick={handleClose} style={{marginRight: '50px'}}>
                                    <p>Enviar a todos</p>
                                </div>
                                <div className={`${classes.button}`} onClick={handleClose}>
                                    <p>Cancelar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </ModalBody>
        </Modal>
    )
}

export default ModalNuevaNotification
