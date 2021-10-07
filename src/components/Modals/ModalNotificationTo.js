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
import { listAvailableUsers, listAvailableUsersSameCompany } from 'services/actions/UserAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import config from 'config/Config';
import { pColor } from 'assets/styles/zendy-css';
import { getImageProfile , getSessionInfo} from "utils/common";
import { createCompanyNotification, updateListUsersNotified } from 'services/actions/NotificationAction';

const useStyles = makeStyles(theme => ({
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

const ModalNotificationTo = (props) => {

  const { open, handleClose, notificationsViewed, notification, onListNotifications } = props; 

  const classes = useStyles();

  const [users, setUsers] = React.useState([]);
  const [usersSC, setUsersSC] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [term, setTerm] = React.useState('');

  const usersNotifiedIds = notificationsViewed && notificationsViewed.map(noti => noti.viewedBy) || [];

  React.useEffect(() => {
    if(open){
    onListAvailableUsers();
    onListAvailableUsersSameCompany();
    setTerm("");
    }
  }, [open]);

  const onListAvailableUsers = (term) => {
    props.dispatch(showBackdrop(true));
    const selectedUsers = users.filter(user => user.checked) || [];
    const selectedUserIds = selectedUsers.map(user => user.id) || [];
    props.dispatch(listAvailableUsers(["Admin", "UserHD"], term)).then(res => {
      res && res.map(user => {
        if (!selectedUserIds.includes(user.id)) {
          selectedUsers.push(user)
        }}
      )
      setUsers(selectedUsers);
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));;
  }

  const onListAvailableUsersSameCompany = (term) => {
    props.dispatch(showBackdrop(true));
    const selectedUsers = usersSC.filter(user => user.checked) || [];
    const selectedUserIds = selectedUsers.map(user => user.id) || [];
    props.dispatch(listAvailableUsersSameCompany(["UserEmpresa"], term)).then(res => {
      res && res.map(user => {
        if (!selectedUserIds.includes(user.id)) {
          selectedUsers.push(user)
        }}
      )
      setUsersSC(selectedUsers);
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));;
  }

  const onSearch = (term) => {
    setTerm(term);
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        onListAvailableUsers(term);
        onListAvailableUsersSameCompany(term);
      }, 1000)
    )
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

  const sendNotificationTo = () => {
      const selectedCompanyUsers = usersSC.filter(user => user.checked) || [];
      const userIds = selectedCompanyUsers.map((user) => user.id) || [];
      props.dispatch(showBackdrop(true));

      const viewedNotification = {
        usersNotified: [...userIds],
      }

      props.dispatch(updateListUsersNotified(notification.id, viewedNotification)).then(res => {
        setUsersSC([]);
        onListNotifications(notification.id);
        props.handleClose();
        props.dispatch(showSnackBar('success', 'Se notificó correctamente'));  
        props.dispatch(showBackdrop(false));
      }).catch(error => { props.dispatch(showBackdrop(false)); props.dispatch(showSnackBar("error", error.message || "")); });  
  }

  return (
        <Modal 
          open={open} 
          handleClose={handleClose}
          size="sm"
        >
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
                    usersSC.map((user, i) => {
                      if (!user.checked) user.checked = false;
                      return (
                         <ListItem key={i} button divider onClick={() => { onSelectUserSameCompany(user) }} disabled={usersNotifiedIds.includes(user.id)}>
                          <ListItemAvatar>
                            <Avatar alt="" src={user.avatar ? (config.api + user.avatar) : getImageProfile(user.sex)} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${user.firstName} ${user.lastName}`}
                            secondary={usersNotifiedIds.includes(user.id) && `Ya ha sido notificado`}
                          />
                          <ListItemSecondaryAction>
                            {
                               !usersNotifiedIds.includes(user.id) &&
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
          confirmText={"Notificar"}
          onConfirm={() => { sendNotificationTo() }}
        />
        </Modal>
      )
}

export default ModalNotificationTo