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
import { listAvailableUsers, listAvailableUsersSameCompany } from 'services/actions/UserAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import config from 'config/Config';
import { pColor } from 'assets/styles/zendy-css';
import { getImageProfile , getSessionInfo} from "utils/common";
import { createParticipant } from 'services/actions/ParticipantAction';
import moment from 'moment';
import { listActiveChats } from 'services/actions/ChatAction';

const useStyles = makeStyles(theme => ({
  buttonIcon: {
      width: '30px',
      marginRight: '10px'
  },
  letters:{
      fontSize:'20px',
      fontStyle:'oblique',
      fontWeight:'bold'
  },
  input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      width: '80%'
  },
  iconButton: {
      padding: 10,
  },
  divider: {
      height: 28,
      margin: 4,
  },
}));

const ModalAddToConversation = (props) => {

  const { open, handleClose, chat, onGetChatData } = props;
  const classes = useStyles();

  const [users, setUsers] = React.useState([]);
  const [usersSC, setUsersSC] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [term, setTerm] = React.useState('');
  const session = getSessionInfo();
  const userAc = session && session.user || {};

  const ParticipantsIds = chat.participants && chat.participants.map(participants => participants.user.id) || [];

  React.useEffect(() => {
    if(open){
      onListAvailableUsers();
      onListAvailableUsersSameCompany();
      setTerm("");
    }
  }, [open]);

  const onListAvailableUsers = (term) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listAvailableUsers(["Admin", "UserHD"], term)).then(res => {
      setUsers(res || []);
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));;
  }

  const onListAvailableUsersSameCompany = (term) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listAvailableUsersSameCompany(["UserEmpresa"], term)).then(res => {
      setUsersSC(res || []);
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));;
  }

  const onSearch = (term) => {
    clearTimeout(searchTimeout);
    setTerm(term);
    setSearchTimeout(
      setTimeout(() => {
        onListAvailableUsers(term);
        onListAvailableUsersSameCompany(term);
      }, 1000)
    )
  }

  const onSelectUser = (user) => {
    const updatedUsers = [...users] || [];
    updatedUsers.map(u => {
      if(u.id == user.id){
        u.checked = u.checked ? false : true;
      }
    });
    setUsers(updatedUsers);
  }

  const onSelectUserSameCompany = (user) => {
    const updatedUsers = [...usersSC] || [];
    updatedUsers.map(u => {
      if(u.id == user.id){
        u.checked = u.checked ? false : true;
      }
    });
    setUsersSC(updatedUsers);
  }

  const addParticipants = () => {
    const participants = [];
    const selectedERPUsers = users.filter(user => user.checked) || [];
    const selectedCompanyUsers = usersSC.filter(user => user.checked) || [];
    const selectedUsers = selectedERPUsers.concat(selectedCompanyUsers);
    selectedUsers.map(user => {
      const participant = {
        idUser: user.id,
        idChat: chat.id,
        type: "Participante",
        erp: user.roleName != "UserEmpresa" ? 1 : 0,
        entryDate: moment().format("YYYY-MM-DD"),
        outputDate: "",
        status: "active",
        active: 1,
        deleted: 0,
        created_at: moment().format("YYYY-MM-DD hh:mm:ss"),
        updated_at: moment().format("YYYY-MM-DD hh:mm:ss")
      }
      participants.push(participant);
    })
    props.dispatch(createParticipant(chat.id, participants))
    handleClose(false);
    onGetChatData(chat.id);
    props.dispatch(listActiveChats(term, "Vigente"));
  }
  
  return (
    <Modal 
      open={open} 
      handleClose={handleClose}
      size="sm"
    >
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
                  placeholder="Buscar contactos"
                  onChange={(event) => onSearch(event.target.value)}
                  inputProps={{ 'aria-label': 'Buscar contactos' }}
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
            <Typography style={{ fontWeight: "bold" }}>ERP Usuarios</Typography>

            <List style={{ padding: "0px", maxHeight: "550px", overflow: "auto" }}>
              {
                users.map((user, i) => {
                  if (!user.checked) user.checked = false;
                  return (
                    <ListItem key={i} button divider onClick={() => { onSelectUser(user) }} disabled={ParticipantsIds.includes(user.id)}>
                      <ListItemAvatar>
                        <Avatar alt="" src={user.avatar ? (config.api + user.avatar) : getImageProfile(user.sex)} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${user.firstName} ${user.lastName}`}
                        secondary={ParticipantsIds.includes(user.id) ? `Ya participa en el grupo` : null}
                      />
                      <ListItemSecondaryAction>
                        {
                          !ParticipantsIds.includes(user.id) &&
                          <Checkbox
                            checked={user.checked || false}
                            onChange={() => { onSelectUser(user) }}
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<RadioButtonCheckedIcon style={{ color: pColor }} />}
                          />
                        }
                        
                      </ListItemSecondaryAction>
                    </ListItem>
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
            </List>


            <Divider variant="inset" />
            <br />
            <Typography style={{ fontWeight: "bold" }}>Usuarios de la Empresa</Typography>
            <List style={{ padding: "0px", maxHeight: "550px", overflow: "auto" }}>
              {
                usersSC.map((user, i) => {
                  if (!user.checked) user.checked = false;
                  return (
                    <ListItem key={i} button divider onClick={() => { onSelectUserSameCompany(user) }} disabled={ParticipantsIds.includes(user.id)}>
                      <ListItemAvatar>
                        <Avatar alt="" src={user.avatar ? (config.api + user.avatar) : getImageProfile(user.sex)} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${user.firstName} ${user.lastName}`}
                        secondary={ParticipantsIds.includes(user.id) && `Ya participa en el grupo`}
                      />
                      <ListItemSecondaryAction>
                        {
                           !ParticipantsIds.includes(user.id) &&
                           <Checkbox
                              checked={user.checked || false}
                              onChange={() => { onSelectUserSameCompany(user) }}
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: pColor }} />}
                           />
                        }
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })
              }
              {
                usersSC.length === 0 && (
                  <ListItem divider style={{ padding: '12px 55px 12px 55px' }}>
                    <ListItemText
                      primary={`No hay usuarios registrados `}
                    />
                  </ListItem>
                )
              }
            </List>
          </Grid>
        </Grid>
    </ModalBody>
    <ModalFooter 
      confirmText={"Añadir"}
      onConfirm={() => { addParticipants() }}
    />
    </Modal>
  )
}

export default ModalAddToConversation