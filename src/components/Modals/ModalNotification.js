import { makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import icon from 'assets/images/Zendy-icon.jpg'
import VolumeDownIcon from '@material-ui/icons/VolumeDown';

const useStyles = makeStyles(theme => ({
    boxMessage: {
        width: '100%',
        height: '80px',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconTitle: {
        width: '70px',
        height: 'auto',
        marginRight: '10px'
    },
    textArea: {
        width: '100%',
        backgroundColor: '#C4C4C4',
        color: 'black',
        padding: '10px'
    },
    buttonIcon: {
        width: '25px',
        marginRight: '10px'
    },
    separation: {
        marginBottom: '15px !important',
    }
}));

const ModalNotification = ({open, handleClose}) => {
    
    const classes = useStyles();

    return (
        <Modal open={open} handleClose={handleClose}>
            <ModalHeader handleClose={handleClose}>
                Enviar Notificación
            </ModalHeader>
            <ModalBody>
                <div className={`${classes.boxMessage} ${classes.separation}`}>
                    <img src={icon} className={classes.iconTitle}/>
                    <div>
                        <Typography variant="h5">
                            Monsters Inc.
                        </Typography>
                        <Typography variant="subtitle1">
                            15 trabajadores
                        </Typography>
                    </div>
                </div>
                <TextField
                    placeholder="Mensaje..."
                    multiline
                    className={`${classes.textArea} ${classes.separation}`}
                    rows={10}
                    rowsMax={Infinity}
                    InputProps={{ disableUnderline: true }}
                />
                <div className={`${classes.separation} button`} onClick={handleClose}>
                    <VolumeDownIcon className={classes.buttonIcon} />
                    <p>Notificar</p>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ModalNotification
