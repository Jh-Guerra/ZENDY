import { Checkbox, Divider, Grid, Typography, FormControl, InputLabel, Input, InputAdornment, Box } from '@material-ui/core';
import React from 'react';
import ModalBody from './common/ModalBody';
import ModalHeader from './common/ModalHeader';
import Modal from './common/Modal';
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
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { pColor } from 'assets/styles/zendy-css';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { createClientChat, listAvailableUsersByCompany } from 'services/actions/ChatAction';
import config from 'config/Config';
import ZendyIcon from 'assets/images/ZendyIcon.jpg';
import { useHistory } from 'react-router';
import { getCustomRoleName, getSessionInfo } from 'utils/common';

const ModalNewCustomerChat = props => {
  const { open, handleClose, onSaveForm } = props;
  const session = getSessionInfo();
  const role = session && session.role || {};

  const history = useHistory();
  const [users, setUsers] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [term, setTerm] = React.useState('');

  React.useEffect(() => {
    if (open) {
      onListAvailableUsers("");
    } else {
      setTerm('');
      setUsers([]);
      setSelectedUsers([]);
    }
  }, [open]);

  const onListAvailableUsers = term => {
    props.dispatch(showBackdrop(true));
    const availableUsers = role && role.name == "UserEmpresa" ? ["UserEmpresa"] : ['UserEmpresa', 'AdminEmpresa', 'UserHD'];
    props.dispatch(listAvailableUsersByCompany(availableUsers, term)).then(res => {
      const noSelectedUsers = res && res.filter(user => !selectedUsers.find(u => u.id == user.id));
      setUsers([...selectedUsers, ...noSelectedUsers]);
      props.dispatch(showBackdrop(false));
    }).catch(err => history.push("/inicio"), props.dispatch(showBackdrop(false)));;
  };

  const onSearch = term => {
    clearTimeout(searchTimeout);
    setTerm(term);
    setSearchTimeout(
      setTimeout(() => {
        onListAvailableUsers(term);
      }, 1000)
    );
  };

  const onSelectUser = user => {
    let newSelectedUsers = [...selectedUsers];
    if (selectedUsers.find(u => u.id == user.id)) {
      newSelectedUsers = newSelectedUsers.filter(u => u.id != user.id);
    } else {
      newSelectedUsers.push(user);
    }
    setSelectedUsers(newSelectedUsers);
  };

  const onConfirm = () => {
    if (selectedUsers.length == 0) {
      return props.dispatch(showSnackBar('warning', 'Necesita seleccionar un usuario'));
    }

    props.dispatch(showBackdrop(true));
    props.dispatch(createClientChat(selectedUsers)).then(res => {
      props.goToView && props.goToView(res.chat, handleClose);
      props.dispatch(showBackdrop(false));
      onSaveForm && onSaveForm();
    }).catch(err => {
      props.dispatch(showBackdrop(false));
      props.dispatch(showSnackBar("error", err.response.data ? err.response.data.error : "ERROR"));
    });
  };

  return (
    <Modal open={open} handleClose={handleClose} size="sm" width="700px">
      <ModalHeader icon={<PeopleAltIcon />} text="En la Empresa" />
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
          <Box  style={{ padding: '0px', overflow: 'auto', width:"100%",  maxHeight:"350px"}}>
            <Grid item xs={12} >
              <List>
                {users.map((user, i) => {
                  return (
                    <ListItem
                      key={i}
                      button
                      divider
                      onClick={() => {
                        onSelectUser(user);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar alt="" src={user.avatar ? config.api + user.avatar : ZendyIcon} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${user.firstName} ${user.lastName}`}
                        secondary={<Typography className="list-sub-text">{user.roleName && getCustomRoleName(user.roleName) || ''}</Typography>}
                      />
                      <ListItemSecondaryAction>
                        <Checkbox
                          checked={selectedUsers.find(u => u.id == user.id) != null}
                          onChange={() => {
                            onSelectUser(user);
                          }}
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<RadioButtonCheckedIcon style={{ color: pColor }} />}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
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
          </Box>

        </Grid>
      </ModalBody>
      <ModalFooter confirmText={'Buscar Chat'} onConfirm={onConfirm} />
    </Modal>
  );
};

export default ModalNewCustomerChat;
