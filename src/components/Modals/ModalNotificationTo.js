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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ModalFooter from './common/ModalFooter';
import { listAdmins, listAvailableUsers, listAvailableUsersSameCompany } from 'services/actions/UserAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import config from 'config/Config';
import { pColor } from 'assets/styles/zendy-css';
import { checkPermission, getCustomRoleName, getImageProfile} from "utils/common";
import { updateListUsersNotified } from 'services/actions/NotificationAction';
import { useHistory } from 'react-router';

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

const ModalNotificationTo = (props) => {

  const { open, handleClose, notificationsViewed=[], notification, onListNotificationViews, session } = props; 

  const classes = useStyles();
  const history = useHistory();

  const user = session && session.user || {};
  const role = session && session.role && session.role.name || {};

  const [users, setUsers] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [term, setTerm] = React.useState('');

  const usersNotifiedIds = notificationsViewed && notificationsViewed.map(noti => noti.viewedBy) || [];

  React.useEffect(() => {
    if(open){
      if(checkPermission(session, "createAdminNotifications")){
        onListAdmins("");
      }else if (checkPermission(session, "createNotifications")) {
        onListAvailableUsers("");
      }else {
        history.push("/inicio");
      }
    }else{
      setUsers([]);
      setSelectedUsers([]);
    }
    setTerm("");
  }, [open]);

  const onListAvailableUsers = (term) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listAvailableUsers(["AdminEmpresa", "UserHD", "UserEmpresa"], term)).then(res => {
      const noSelectedUsers = res && res.filter(user => !selectedUsers.find(u => u.id == user.id));
      setUsers([...selectedUsers, ...noSelectedUsers]);
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));;
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
        if(checkPermission(session, "createAdminNotifications")){
          onListAdmins(term);
        }else if(checkPermission(session, "createNotifications")){
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

  const sendNotificationTo = () => {
    if (selectedUsers.length == 0) {
      return props.dispatch(showSnackBar('warning', 'Necesita seleccionar un usuario'));
    }

    const userIds = selectedUsers.map((user) => user.id) || [];
    props.dispatch(showBackdrop(true));

    const viewedNotification = {
      usersNotified: [...userIds],
    }

    props.dispatch(updateListUsersNotified(notification.id, viewedNotification)).then(res => {
      setUsers([]);
      onListNotificationViews &&  onListNotificationViews(notification.id);
      props.handleClose();
      props.dispatch(showSnackBar('success', 'Se notificó correctamente'));  
      props.dispatch(showBackdrop(false));
    }).catch(error => { props.dispatch(showBackdrop(false)); props.dispatch(showSnackBar("error", error.message || "")); });  
  }

  return (
        <Modal open={open} handleClose={handleClose} size="sm">
        <ModalHeader
          icon={<PersonAddIcon />}
          text="Notificar a:"   
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
                <Typography style={{ fontWeight: "bold" }}>Usuarios de la Empresa</Typography>
                <br />
                <List style={{ padding: "0px", maxHeight: "550px", overflow: "auto" }}>
                  {
                    users.map((user, i) => {
                      return (
                         <ListItem key={i} button divider onClick={() => { onSelectUser(user) }} disabled={usersNotifiedIds.includes(user.id)}>
                          <ListItemAvatar>
                            <Avatar alt="" src={user.avatar ? (config.api + user.avatar) : getImageProfile(user.sex)} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${user.firstName} ${user.lastName}`}
                            secondary={`${getCustomRoleName(user.roleName)}${usersNotifiedIds.includes(user.id) && ": Ya ha sido notificado" || ""}`}
                          />
                          <ListItemSecondaryAction>
                            {
                               !usersNotifiedIds.includes(user.id) &&
                               <Checkbox
                                  checked={selectedUsers.find(u => u.id == user.id) != null}
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
              </Grid>
            </Grid>
        </ModalBody>
        <ModalFooter 
          confirmText={"Notificar"}
          onConfirm={() => { sendNotificationTo() }}
        />
        </Modal>
      )
}

export default ModalNotificationTo