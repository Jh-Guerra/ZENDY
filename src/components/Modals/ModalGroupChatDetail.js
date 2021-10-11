import { Avatar, Grid, makeStyles, Typography, Divider, Button, GridListTile, TextField } from '@material-ui/core';
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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ModalHeader from './common/ModalHeader';
import CustomModal from './common/CustomModal';
import config from 'config/Config';
import { getSessionInfo } from 'utils/common';
import { deleteParticipant } from 'services/actions/ParticipantAction';
import { listActiveChats, nameChatAction } from 'services/actions/ChatAction';
import ZendyIcon from 'assets/images/ZendyIcon.jpg';

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
  const [nameChat, setNameChat] = React.useState("")
  const [isAdminList, setAdminList] = React.useState(false);
  const [isAdminCreated, setIsAdminCreated] = React.useState(false);

  const ShowAddToConversation = (isAdmin=false) => {
    setAdminList(isAdmin);
    setIsAdminCreated(isAdmin);
    setShowAddToConversation(true);
  }
  
  const RemoveParticipant = (idUser,idChat) => {
    props.dispatch(deleteParticipant({idUser,idChat})).then(res => {
      if(res){
        onGetChatData(chat.id);
        props.dispatch(listActiveChats("", "Vigente"));
      }
    })
  }

  const handleChange = (event) => {
    setNameChat(event.target.value);
  } 

  const addName = (data) => {
    props.dispatch(nameChatAction(chat.id,data)).then(res => {
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

  React.useEffect(() => {
    if(open){
      const nameChatExist = chat && chat.name ? chat.name : "";
      setNameChat(nameChatExist)
    }
  }, [open]);

  var quantityParticipants = chat && chat.participants && chat.participants.length;

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
                {
                  quantityParticipants > 2 && ( isAdmin && (
                    <>
                      <TextField
                        id="name"
                        label={<p>Nombre del Grupo</p>}
                        value={nameChat}
                        onChange={handleChange}
                      />
                      <Button variant="contained" color="primary" onClick={() => { addName(nameChat) }}>Cambiar nombre al chat</Button>
                    </>
                  ) )
                }
            </Grid>
            <Grid container item direction="row" justify="space-between" alignItems="flex-start" width="100%">
              <Box className={classes.detailsBox}>
                <TimerIcon style={{ margin: '0px 5px' }} /> Tiempo de Vida del Chat{' '}
              </Box>
              <Box>
                {chatLifetime > 1 ? (chatLifetime + (chatLifetime == 1 ? " dia " : " dias")) : "Creado hoy"}
              </Box>
            </Grid>
            <Box height="15px" />
            {
              chat.status == "Finalizado" && (
                <Grid container item direction="row" justify="space-between" alignItems="flex-start" width="100%">
                  <Box className={classes.detailsBox}>
                    <EventBusyIcon style={{ margin: '0px 5px' }} /> Fecha de finalización{' '}
                  </Box>
                  <Box>
                    {chat.endDate ? chat.endDate : "Activo"}
                  </Box>
                </Grid>
              )
            }
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
                            <Avatar alt="" src={user.avatar ? (config.api + user.avatar) : ZendyIcon} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${user.firstName} ${user.lastName}`}
                            secondary={`${participant.type}`}
                          />
                          {
                             quantityParticipants > 2 && (isAdmin && 
                            <ListItemSecondaryAction>
                            {
                              participant.type == "Participante" ? <Button variant="contained" color="primary" onClick={() => {RemoveParticipant(user.id,chat.id)}}>Quitar</Button> : null
                            }
                          </ListItemSecondaryAction>
                      )
                          }                           
                        </ListItem>
                      );
                    })
                  }
                </List>
                <List>
                  {
                      isAdmin &&
                      <Grid container spacing={2}> 
                        <Grid item md={6}>
                          <Button variant="contained" id="" color="primary" startIcon={<AddCircleOutlineIcon />} style={{ height: '50px', width: '100%' }} onClick={() => {ShowAddToConversation(false)}}>
                            Agregar participantes
                          </Button>
                        </Grid>
                        <Grid item md={6}>
                          <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} style={{ height: '50px', width: '100%' }} onClick={() => {ShowAddToConversation(true)}}>
                            Agregar Admins
                          </Button>
                        </Grid>
                      </Grid>
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
        onGetChatData={onGetChatData}
        isAdminList={isAdminList}
        isAdminCreated={isAdminCreated}
      >
        
     </CustomModal>
    </>
  );
};

export default ModalGroupChatDetail;
