import {Button, Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PeopleIcon from '@material-ui/icons/People';
import CustomButton from "components/CustomButtom";
import { successButtonColor } from 'assets/styles/zendy-css';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const ModalMoreActions = (props) => {
    
    const classes = useStyles();
    const { open, handleClose } = props;
     
    return (
        <Modal 
            open={open} 
            handleClose={handleClose} 
            size="xs" 
        >
            <ModalHeader 
                icon={<MoreVertIcon />}
                text="Más opciones..."
            />

            <ModalBody>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <CustomButton 
                            variant="contained"
                            fullWidth
                            className={classes.button}
                            startIcon={<SpeakerNotesIcon />}
                            customColor={successButtonColor}
                        >
                            Chats - Historial
                        </CustomButton>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomButton 
                            variant="contained"
                            fullWidth
                            className={classes.button}
                            startIcon={<SmsFailedIcon />}
                            customColor={successButtonColor}
                        >
                            Notificaciones
                        </CustomButton>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomButton 
                            variant="contained"
                            fullWidth
                            className={classes.button}
                            startIcon={<AssessmentIcon />}
                            customColor={successButtonColor}
                        >
                            Reportes
                        </CustomButton>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomButton 
                            variant="contained"
                            fullWidth
                            className={classes.button}
                            startIcon={<PeopleIcon />}
                            customColor={successButtonColor}
                            onClick={() => { props.goToView && props.goToView("users") }}
                        >
                            Usuarios
                        </CustomButton>
                    </Grid>
                </Grid>
            </ModalBody>
        </Modal>
    )
}

export default ModalMoreActions