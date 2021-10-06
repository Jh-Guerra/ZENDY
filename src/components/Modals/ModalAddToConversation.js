import { Checkbox, Divider, Grid, makeStyles, Typography, InputAdornment} from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ModalFooter from './common/ModalFooter';
import { listAdmins, listAvailableUsers, listAvailableUsersSameCompany } from 'services/actions/UserAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import config from 'config/Config';
import { pColor } from 'assets/styles/zendy-css';
import { getCustomRoleName, getImageProfile , getSessionInfo} from "utils/common";
import { createParticipant } from 'services/actions/ParticipantAction';
import moment from 'moment';
import { listActiveChats } from 'services/actions/ChatAction';

const useStyles = makeStyles(theme => ({
  input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      width: '80%'
  },
  iconButton: {
      padding: 10,
  }
}));

const ModalAddToConversation = (props) => {

  const { open, handleClose, chat, onGetChatData, isAdminList=false, isAdminCreated } = props;
  const classes = useStyles();

  const [users, setUsers] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [term, setTerm] = React.useState('');
  const session = getSessionInfo();

  React.useEffect(() => {
    if(open){
      if(isAdminList){
        onListAdmins("");
      }else{
        onListAvailableUsers("");
      }
    }
    setTerm("");
  }, [open]);

  const onListAvailableUsers = (term) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listAvailableUsers(["AdminEmpresa", "UserHD"], term)).then(res => {
      const noSelectedUsers = res && res.filter(user => !selectedUsers.find(u => u.id == user.id));
      setUsers([...selectedUsers, ...noSelectedUsers]);
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));
  }

  const onListAdmins = (term) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listAdmins(term)).then(res => {
      const noSelectedUsers = res && res.filter(user => !selectedUsers.find(u => u.id == user.id));
      setUsers([...selectedUsers, ...noSelectedUsers]);
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));
  }

  const onSearch = (term) => {
    setTerm(term);
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        if(isAdminList){
          onListAdmins(term);
        }else{
          onListAvailableUsers(term);
        }
      }, 1000)
    )
  }

  const onSelectUser = (user) => {
    let newSelectedUsers = [...selectedUsers];
    if(selectedUsers.find(u => u.id == user.id)){
      newSelectedUsers = newSelectedUsers.filter(u => u.id != user.id);
    }else{
      newSelectedUsers.push(user);
    }
    setSelectedUsers(newSelectedUsers);
  }

  const addParticipants = (isAdmin=false) => {
    const participants = [];

    if (selectedUsers.length == 0) {
      return props.dispatch(showSnackBar('warning', 'Necesita seleccionar un usuario'));
    }

    selectedUsers.map(user => {
      const participant = {
        idUser: user.id,
        idChat: chat.id,
        type: isAdmin ? "Admin" :" Participante",
        erp: isAdmin ? 1 : 0,
        entryDate: moment().format("YYYY-MM-DD"),
        outputDate: null,
        status: "Activo",
        active: 1,
        deleted: 0,
        created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD hh:mm:ss")
      }
      participants.push(participant);
    });

    props.dispatch(createParticipant(chat.id, participants))
    handleClose(false);
    setUsers([])
    onGetChatData && onGetChatData(chat.id);
    props.dispatch(listActiveChats(term, "Vigente"));
  }
  
  const participantsIds = chat.participants && chat.participants.map(participants => participants.user.id) || [];

  return (
    <Modal open={open} handleClose={handleClose} size="sm">
    <ModalHeader
      icon={<PersonAddIcon />}
      text="Agregar a la conversación"   
    />
    <ModalBody>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={{ margin: '0px 0px 20px 0px' }} component="form" >
              <Grid container direction="row" >
                <InputBase
                  className={classes.input}
                  fullWidth={true}
                  style={{ flex: 1, width: '80%' }}
                  placeholder="Buscar"
                  onChange={(event) => onSearch(event.target.value)}
                  inputProps={{ 'aria-label': 'Buscar' }}
                  startAdornment={
                    <InputAdornment position="start" tyle={{ marginLeft: '5px' }} type="button" className={classes.iconButton} aria-label="search">
                      <SearchIcon />
                    </InputAdornment>}
                  value={term}
                />
              </Grid>
            </Paper>
            <Divider />
          </Grid>
             
          <Grid item xs={12}>                   
            {
              users.map((user, i) => {           
                  return (                    
                    <List key={i} style={{ padding: "0px", maxHeight: "550px", overflow: "auto" }}>
                      <ListItem key={i} button divider onClick={() => { onSelectUser(user) }} disabled={participantsIds.includes(user.id)}>
                        <ListItemAvatar>
                          <Avatar alt="" src={user.avatar ? (config.api + user.avatar) : getImageProfile(user.sex)} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${user.firstName} ${user.lastName}`}
                          secondary={`${getCustomRoleName(user.roleName)} ${participantsIds.includes(user.id) ? `: Ya participa en el grupo` : ""}`}
                        />
                        <ListItemSecondaryAction>
                          {
                            !participantsIds.includes(user.id) && (
                              <Checkbox
                                checked={selectedUsers.find(u => u.id == user.id) != null}
                                onChange={() => { onSelectUser(user) }}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon style={{ color: pColor }} />}
                              />
                            )
                          }
                          
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>                  
                  )
              })
            }
                           
            {
              users.length === 0 && (
                <ListItem divider style={{ padding: '12px 55px 12px 55px' }}>
                  <ListItemText
                    primary={`No hay usuarios registrados `}
                  />
                </ListItem>
              )
            }
          </Grid>
        </Grid>     
    </ModalBody>
    <ModalFooter 
      confirmText={"Añadir"}
      onConfirm={() => { addParticipants(isAdminCreated) }}
    />
    </Modal>   
  )
}

export default ModalAddToConversation