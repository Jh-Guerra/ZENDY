import { Avatar, Grid, makeStyles, Typography, Divider, Button, GridListTile } from '@material-ui/core';
import React from 'react';
import ModalBody from './common/ModalBody';
import Modal from './common/Modal';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import TimerIcon from '@material-ui/icons/Timer';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ModalHeader from './common/ModalHeader';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import CustomModal from './common/CustomModal';
import config from 'config/Config';
import { getSessionInfo } from 'utils/common';
import { deleteParticipant } from 'services/actions/ParticipantAction';
import { listActiveChats } from 'services/actions/ChatAction';

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(14),
    borderColor: 'blue',
  },
  detailsBox: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ModalGroupChatDetail = props => {
  const session = getSessionInfo();
  const user = session && session.user;
  const classes = useStyles();
  
  const { open, handleClose, chat, onGetChatData } = props;
  const chatLifetime = Math.round((new Date().getTime() - new Date(chat.startDate).getTime()) / (1000 * 60 * 60 * 24))

  const [showAddToConversation,setShowAddToConversation] = React.useState(false);

  const ShowAddToConversation = () => {
    setShowAddToConversation(true);
  }

  const [openModalEndChat,setOpenModalEndChat] = React.useState(false);
  const HandleModalEndChat = () => {
    setOpenModalEndChat(true);
  } 
  
  const RemoveParticipant = (idUser,idChat) => {
    props.dispatch(deleteParticipant({idUser,idChat})).then(res => {
      if(res){
        onGetChatData(chat.id);
        props.dispatch(listActiveChats("", "Vigente"));
      }
    })
  }

  var isAdmin;
  chat.participants && chat.participants.filter(participant => {
    if(participant.idUser == user.id){
      isAdmin = (participant.type == "Admin")
    }
  })

  return (
    <>
    <Modal open={open} handleClose={handleClose} size="lg">
      <ModalHeader
        icon={<PeopleAltIcon />}
        text={chat.participants && chat.participants.length + " participantes"}
      />

      <ModalBody>
        <Grid container spacing={3}>
          <Grid container item xs={12} direction="column" alignItems="center" justify="center" spacing={3}>
            <Grid container item direction="row" justify="space-between" alignItems="flex-start" width="100%">
              <Box className={classes.detailsBox}>
                <TimerIcon style={{ margin: '0px 5px' }} /> Tiempo de Vida del Chat{' '}
              </Box>
              <Box>
                {chatLifetime > 0 ? chatLifetime + (chatLifetime == 1 ? " dia " : " dias") : "creado hoy"}
              </Box>
            </Grid>
            <Box height="15px" />
            {
              chat.status == "Finalizado" && (
                <Grid container item direction="row" justify="space-between" alignItems="flex-start" width="100%">
                  <Box className={classes.detailsBox}>
                    <EventBusyIcon style={{ margin: '0px 5px' }} /> Fecha de finalización [{chat.endDate}]
                  </Box>
                </Grid>
              )
            }
            <Grid container item direction="row" justify="flex-end" alignItems="flex-start" width="100%">
              <Box>
                {chat.endDate ? chat.endDate : "Activo"}
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box height="15px" />
              <Grid item md={12}>
                <List>
                  {
                    chat.participants && chat.participants.map((participant, i) => {
                      var user = participant.user || {};
                      return (
                        <ListItem key={i} style={{borderBottom: "1px solid #CBD3D3"}}>
                          <ListItemAvatar>
                            <Avatar alt="" src={user.avatar ? (config.api + user.avatar) : "ruta-por-defecto-del-front"} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${user.firstName} ${user.lastName}`}
                            secondary={`${participant.type}`}
                          />
                          {
                            isAdmin && 
                            <ListItemSecondaryAction>
                            {
                              participant.type == "Participante" ? <Button variant="contained" color="primary" onClick={() => {RemoveParticipant(user.id,chat.id)}}>Quitar</Button> : null
                            }
                          </ListItemSecondaryAction>
                          }                           
                        </ListItem>
                      );
                    })
                  }
                </List>
                <List>
                  {
                      isAdmin && 
                      <Grid item md={12}>
                        <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} style={{ height: '50px', width: '100%' }} onClick={ShowAddToConversation}>
                          Agregar más personas
                        </Button>
                      </Grid>
                  }
                  
                  <Divider variant="inset" />
                </List>
                <List>
                  {
                      chat.status == "Vigente" && (
                        <Grid item md={12}>
                          <Button variant="contained" color="secondary" startIcon={<TimerOutlinedIcon />} style={{ height: '50px', width: '100%' }} onClick={HandleModalEndChat}>
                              Finalizar chat
                          </Button>
                        </Grid>
                      )     
                  }
                  <Divider variant="inset" />
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ModalBody>
    </Modal>
    <CustomModal 
        customModal="ModalAddToConversation"
        open={showAddToConversation}
        handleClose={() => {setShowAddToConversation(false)}}
        chat={chat}
        onGetChatData={onGetChatData}>
     </CustomModal>
     <CustomModal
      CustomModal="ModalEndChat"
      open={openModalEndChat}
      handleClose={() => {setOpenModalEndChat(true)}}
      onGetChatData={onGetChatData}
      chat={chat}>
    </CustomModal>
    </>
  );
};

export default ModalGroupChatDetail;
