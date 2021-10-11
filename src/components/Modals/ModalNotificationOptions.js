import {Button, Grid, makeStyles } from '@material-ui/core';
import React, {useState } from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import NotificationsIcon from '@material-ui/icons/Notifications';
import { successButtonColor } from 'assets/styles/zendy-css';
import CustomButton from "components/CustomButton";
import CustomModal from "components/Modals/common/CustomModal";
import { useHistory } from 'react-router-dom';
import { checkPermission, getSessionInfo } from 'utils/common';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const ModalNotificationOptions = (props) => {

    const history = useHistory();
    const classes = useStyles();
    const session = getSessionInfo();
    const user = session && session.user || {};
    
    const { open, handleClose, onSaveForm } = props;
    const [showNewCompanyNotification, setShowNewCompanyNotification] = React.useState(false);
    const [showNewCompaniesNotification, setShowNewCompaniesNotification] = React.useState(false);
    
    const handleNewCompanyNotification = () => {
        setShowNewCompanyNotification(true);
    }

    const handleNewCompaniesNotification = () => {
        setShowNewCompaniesNotification(true);
    }

    const goToView = (chat,handleClose) => {
        handleClose(false);
      }
     
    return (
        <>
            <Modal 
                open={open} 
                handleClose={handleClose}
                size="xs" 
            >
                <ModalHeader 
                    icon={<NotificationsIcon />}
                    text="Crear una Notificación"
                />

                <ModalBody>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                onClick={handleNewCompanyNotification}
                                variant="contained"
                                color="secondary"
                            >
                                Para 1 empresa
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                onClick={handleNewCompaniesNotification}
                                variant="contained"
                                color="secondary"
                            >
                                Para muchas empresas
                            </Button>
                        </Grid>
                    </Grid>
                </ModalBody>
            </Modal>
            <CustomModal 
                customModal="ModalNewCompaniesNotification"
                open={showNewCompaniesNotification}
                handleClose={() => { setShowNewCompaniesNotification(false); }}
                goToView={goToView}
                onSaveForm={() => {
                    setShowNewCompaniesNotification(false);
                    handleClose();
                    onSaveForm && onSaveForm();
                }}
            />
            <CustomModal 
                customModal="ModalNewCompanyNotification"
                open={showNewCompanyNotification} 
                handleClose={() => { setShowNewCompanyNotification(false); }}
                goToView={goToView}
                onSaveForm={() => {
                    setShowNewCompanyNotification(false);
                    handleClose();
                    onSaveForm && onSaveForm();
                }}
            />
        </>
    )
}

export default ModalNotificationOptions
