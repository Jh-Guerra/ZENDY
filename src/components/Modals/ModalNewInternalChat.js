import { Checkbox, Divider, Grid, makeStyles, CircularProgress, Typography, Input, InputAdornment } from '@material-ui/core';
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
import ModalFooter from './common/ModalFooter';
import ChatIcon from '@material-ui/icons/Chat';
import { listAdmins } from 'services/actions/UserAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { createInternalChat } from 'services/actions/ChatAction';
import { pColor } from 'assets/styles/zendy-css';
import config from 'config/Config';
import ZendyIcon from 'assets/images/ZendyIcon.jpg';

const useStyles = makeStyles(theme => ({
  input: {
      marginLeft: theme.spacing(1),
      flex: 1,
  },
  iconButton: {
      padding: 10,
  }
}));

const ModalNewInternalChat = (props) => {

  const { open, handleClose, onSaveForm } = props;
  const classes = useStyles(props);

  const [users, setUsers] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [term, setTerm] = React.useState("");

  React.useEffect(() => {
    if(open){
      onListAvailableUsers();
    }else{
      setTerm('');
      setUsers([]);
      setSelectedUsers([]);
    }
  }, [open]);

  const onListAvailableUsers = (term) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listAdmins(term)).then(res => {
      const noSelectedUsers = res && res.filter(user => !selectedUsers.find(u => u.id == user.id));
      setUsers([...selectedUsers, ...noSelectedUsers]);
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));;
  }

  const onSearch = (term) => {
    clearTimeout(searchTimeout);
    setTerm(term);
    setSearchTimeout(
      setTimeout(() => {
        onListAvailableUsers(term);
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

  const onConfirm = () => {
    if (selectedUsers.length == 0) {
      return props.dispatch(showSnackBar('warning', 'Necesita seleccionar un usuario'));
    }

    props.dispatch(showBackdrop(true));
    props.dispatch(createInternalChat(selectedUsers)).then(res => {
      props.goToView && props.goToView(res.chat, handleClose);
      props.dispatch(showBackdrop(false));
      onSaveForm && onSaveForm();
    }).catch(err => {
      props.dispatch(showBackdrop(false));
      props.dispatch(showSnackBar("error", err.response.data ? err.response.data.error : "ERROR")); 
    });
  }
    
  return (
    <Modal open={open} handleClose={handleClose} size="sm" style={{minHeight: '100%', minWidth: '100%'}}>     
      <ModalHeader icon={<ChatIcon />} text="Chat interno" />     
      <ModalBody>     
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper component="form">
              <Grid container direction="row">
                <IconButton style={{ marginLeft: '5px', padding: 10 }} type="button" aria-label="search">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  style={{ flex: 1, width: '80%' }}
                  placeholder="Buscar"
                  onChange={event => onSearch(event.target.value)}
                  value={term}
                />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <List style={{padding: "0px", maxHeight: "550px", overflow: "auto"}}>
              {
                users.map((user, i) => {
                  return (
                    <ListItem key={i} button divider onClick={() => { onSelectUser(user) }}>
                      <ListItemAvatar>
                        <Avatar alt="" src={user.avatar ? (config.api+user.avatar) : ZendyIcon} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${user.firstName} ${user.lastName}`}
                        secondary={
                          <React.Fragment>
                            <Typography variant="body2">{user.company && user.company.name || ""}</Typography>
                          </React.Fragment>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Checkbox
                          checked={selectedUsers.find(u => u.id == user.id) != null}
                          onChange={() => {onSelectUser(user)}}
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<RadioButtonCheckedIcon style={{ color: pColor }} />}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })
              }
              {
                users.length === 0 && (
                  <ListItem divider   style={{ padding: '12px 55px 12px 55px' }}>
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
      <ModalFooter confirmText={'Buscar Chat'} onConfirm={onConfirm} />   
    </Modal>
  )
}

export default ModalNewInternalChat
