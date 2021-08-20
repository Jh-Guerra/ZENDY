import {Button, Grid, makeStyles } from '@material-ui/core';
import React, {useState } from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { successButtonColor } from 'assets/styles/zendy-css';
import CustomButton from "components/CustomButtom";
import CustomModal from "components/Modals/common/CustomModal";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const ModalNewChat = (props) => {

    const history = useHistory();
    const classes = useStyles();
    const { open, handleClose, onSaveForm } = props;
    const [showNewInternalChat, setShowNewInternalChat] = useState(false);
    const [showNewCompanyChat, setShowNewCompanyChat] = React.useState(false);
    const [openNewCustomerChat, setOpenNewCustomerChat] = React.useState(false);
  
    const handleNewTerminalChat = () => {
        setShowNewInternalChat(true);
    }
    
    const handleNewCompanyChat = () => {
        setShowNewCompanyChat(true);
    }

    const handleNewCustomerChatOpen = () => {
        setOpenNewCustomerChat(true);
    }

    const goToView = (chat,handleClose) => {
        handleClose(false);
        history.push(`/chat/${chat.type}/${chat.id}`);
      }
     
    return (
        <>
            <Modal 
                open={open} 
                handleClose={handleClose} 
                size="xs" 
            >
                <ModalHeader 
                    icon={<AddCommentIcon />}
                    text="Buscar Chat"
                />

                <ModalBody>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <CustomButton 
                                variant="contained"
                                fullWidth
                                className={classes.button}
                                startIcon={<SupervisedUserCircleIcon />}
                                customColor={successButtonColor}
                                onClick={handleNewCustomerChatOpen}
                            >
                                Con Usuarios De La Empresa
                            </CustomButton>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomButton 
                                variant="contained"
                                fullWidth
                                className={classes.button}
                                startIcon={<BusinessIcon />}
                                customColor={successButtonColor}
                                onClick={handleNewCompanyChat}
                            >
                                Con Usuarios De Alguna Empresa
                            </CustomButton>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomButton 
                                variant="contained"
                                fullWidth
                                className={classes.button}
                                startIcon={<PersonIcon />}
                                customColor={successButtonColor}
                                onClick={handleNewTerminalChat}
                            >
                                Interno
                            </CustomButton>
                        </Grid>
                    </Grid>
                </ModalBody>
            </Modal>
            <CustomModal 
                customModal="ModalNewCustomerChat"
                open={openNewCustomerChat}
                handleClose={() => { setOpenNewCustomerChat(false); }}
                goToView={goToView}
                onSaveForm={() => {
                    setOpenNewCustomerChat(false);
                    handleClose();
                    onSaveForm && onSaveForm();
                }}
            />
            <CustomModal 
                customModal="ModalNewInternalChat"
                open={showNewInternalChat}
                handleClose={() => { setShowNewInternalChat(false); }}
                goToView={goToView}
                onSaveForm={() => {
                    setShowNewInternalChat(false);
                    handleClose();
                    onSaveForm && onSaveForm();
                }}
            />
            <CustomModal 
                customModal="ModalNewCompanyChat"
                open={showNewCompanyChat} 
                handleClose={() => { setShowNewCompanyChat(false); }}
                goToView={goToView}
                onSaveForm={() => {
                    setShowNewCompanyChat(false);
                    handleClose();
                    onSaveForm && onSaveForm();
                }}
            />
        </>
    )
}

export default ModalNewChat
