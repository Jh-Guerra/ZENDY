import {Button, Grid, makeStyles } from '@material-ui/core';
import React, {useState } from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import AddCommentIcon from '@material-ui/icons/AddComment';
import CustomModal from "components/Modals/common/CustomModal";
import { useHistory } from 'react-router-dom';
import { checkPermission, getSessionInfo } from 'utils/common';

const ModalNewChat = (props) => {

    const history = useHistory();
    const session = getSessionInfo();

    
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
        history.push(`/chats/${chat.id}`);
      }
     
    return (
        <>
            <Modal open={open} handleClose={handleClose} size="xs" width="400px">
                <ModalHeader 
                    icon={<AddCommentIcon />}
                    text="Buscar Chat"
                />

                <ModalBody>
                    <Grid container spacing={1}>
                        {
                            session && session.user && session.user.idCompany ? (
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        onClick={handleNewCustomerChatOpen}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<SupervisedUserCircleIcon />}
                                    >
                                        En la Empresa
                                    </Button>
                                </Grid>
                            ) : (
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        onClick={handleNewCompanyChat}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<BusinessIcon />}
                                    >
                                        En alguna Empresa
                                    </Button>
                                </Grid>
                            )
                        }
                        {
                            checkPermission(session, "showInternalChat") && (
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        onClick={handleNewTerminalChat}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<PersonIcon />}
                                    >
                                        Interno
                                    </Button>
                                </Grid>
                            )
                        }
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
        </>
    )
}

export default ModalNewChat
