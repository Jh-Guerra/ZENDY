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
import ModalNewInternalChat from "components/Modals/ModalNewInternalChat";
import ModalNewCompanyChat from './ModalNewCompanyChat';
import ModalNewCustomerChat from "components/Modals/ModalNewCustomerChat";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const ModalNewChat = (props) => {

    const classes = useStyles();
    const { open, handleClose } = props;
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
     
    return (
        <>
            <Modal 
                open={open} 
                handleClose={handleClose} 
                size="xs" 
            >
                <ModalHeader 
                    icon={<AddCommentIcon />}
                    text="Nuevo Chat"
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
                                Chat Cliente
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
                                Chat por Empresa
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
                                Chat Interno
                            </CustomButton>
                        </Grid>
                    </Grid>
                </ModalBody>
            </Modal>
            <ModalNewInternalChat
                open={showNewInternalChat}
                handleClose={() => { setShowNewInternalChat(false); }}
            />
            <ModalNewCompanyChat
                open={showNewCompanyChat} 
                handleClose={() => { setShowNewCompanyChat(false) }}
            /> 
            <ModalNewCustomerChat 
                open={openNewCustomerChat}
                handleClose={() => { setOpenNewCustomerChat(false); }}
            />
        </>
    )
}

export default ModalNewChat
