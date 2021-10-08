import { Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PeopleIcon from '@material-ui/icons/People';
import CustomButton from "components/CustomButton";
import { successButtonColor } from 'assets/styles/zendy-css';
import BusinessIcon from '@material-ui/icons/Business';
import { checkPermission } from 'utils/common';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const ModalMoreActions = (props) => {
    
    const classes = useStyles();
    const { open, handleClose, handleChangeTab, session } = props;

    const role = session && session.role && session.role.name || {};
     
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
                            color={successButtonColor}
                            onClick={() => {
                                handleClose();
                                handleChangeTab(null, 7);
                            }}
                        >
                            Chats - Historial
                        </CustomButton>
                    </Grid>
                    {
                        checkPermission(session, "createAdminNotifications") ? (
                            <Grid item xs={12}>
                                <CustomButton 
                                    variant="contained"
                                    fullWidth
                                    className={classes.button}
                                    startIcon={<SmsFailedIcon />}
                                    color={successButtonColor}
                                    onClick={() => {
                                        handleClose();
                                        handleChangeTab(null, 8);
                                    }}
                                >
                                    Notificaciones
                                </CustomButton>
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                <CustomButton 
                                    variant="contained"
                                    fullWidth
                                    className={classes.button}
                                    startIcon={<SmsFailedIcon />}
                                    color={successButtonColor}
                                    onClick={() => {
                                        handleClose();
                                        handleChangeTab(null, 9);
                                    }}
                                >
                                    Notificaciones
                                </CustomButton>
                            </Grid>
                        )
                    }
                    {
                        checkPermission(session, "showTabReports") && (
                            <Grid item xs={12}>
                                <CustomButton 
                                    variant="contained"
                                    fullWidth
                                    className={classes.button}
                                    startIcon={<AssessmentIcon />}
                                    color={successButtonColor}
                                    onClick={() => {
                                        handleClose();
                                        handleChangeTab(null, 10);
                                    }}
                                >
                                    Reportes
                                </CustomButton>
                            </Grid>
                        )
                     }
                    {
                        checkPermission(session, "showUserCrud") && (role == 'Admin' ) && (
                            <Grid item xs={12}>
                                <CustomButton 
                                    variant="contained"
                                    fullWidth
                                    className={classes.button}
                                    startIcon={<PeopleIcon />}
                                    color={successButtonColor}
                                    onClick={() => { props.goToView && props.goToView("usuarios") }}
                                >
                                    Usuarios
                                </CustomButton>
                            </Grid>
                        )
                     }
                         {
                        checkPermission(session, "showCompanyUsersCrud") && (role == 'AdminEmpresa' ) && (
                            <Grid item xs={12}>
                                <CustomButton 
                                    variant="contained"
                                    fullWidth
                                    className={classes.button}
                                    startIcon={<PeopleIcon />}
                                    color={successButtonColor}
                                    onClick={() => { props.goToView && props.goToView("usuarios-empresa") }}
                                >
                                    Usuarios
                                </CustomButton>
                            </Grid>
                        )
                     }
                    {
                        checkPermission(session, "showCompanyCrud") && (
                            <Grid item xs={12}>
                                <CustomButton 
                                    variant="contained"
                                    fullWidth
                                    className={classes.button}
                                    startIcon={<BusinessIcon />}
                                    color={successButtonColor}
                                    onClick={() => { props.goToView && props.goToView("empresas") }}
                                >
                                    Empresas
                                </CustomButton>
                            </Grid>
                        )
                     }
                </Grid>
            </ModalBody>
        </Modal>
    )
}

export default ModalMoreActions