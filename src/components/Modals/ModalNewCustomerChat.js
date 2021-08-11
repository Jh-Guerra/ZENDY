import { Checkbox, Divider, Grid, Typography, FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core';
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
import { listAvailableUsers } from 'services/actions/UserAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { createClientChat } from 'services/actions/ChatAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import config from 'config/Config';

const ModalNewCustomerChat = props => {
  const { open, handleClose, onSaveForm } = props;

  const [users, setUsers] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [term, setTerm] = React.useState('');

  React.useEffect(() => {
    if (open) {
      onListAvailableUsers();
      setTerm('');
    }
  }, [open]);

  const onListAvailableUsers = term => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listAvailableUsers(['UserEmpresa'], term)).then(res => {
      setUsers(res || []);
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));;
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
    const updatedUsers = [...users] || [];
    updatedUsers.map(u => {
      if (u.id == user.id) {
        u.checked = u.checked ? false : true;
      } else {
        u.checked = false;
      }
    });

    setUsers(updatedUsers);
  };

  const onConfirm = () => {
    const selectedRows = users.filter(user => user.checked);

    if (selectedRows.length == 0) {
      props.dispatch(showSnackBar('warning', 'Necesita seleccionar al menos un cliente'));
      return;
    }

    props.dispatch(showBackdrop(true));
    props.dispatch(createClientChat(selectedRows)).then(res => {
      props.dispatch(showBackdrop(false));
      props.dispatch(showSnackBar('success', 'Chat iniciado correctamente.'));
      onSaveForm && onSaveForm();
    }).catch(err => {
      props.dispatch(showBackdrop(false));
      console.log('err', err.response.data.error);
      props.dispatch(showSnackBar('error', err.response.data ? err.response.data.error : 'ERROR'));
    });
  };

  return (
    <Modal open={open} handleClose={handleClose} size="sm" style={{ minHeight: '100%', minWidth: '100%' }}>
      <ModalHeader icon={<PeopleAltIcon />} text="Nuevo Chat - Cliente" />
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
                  placeholder="Buscar contactos"
                  onChange={event => onSearch(event.target.value)}
                  value={term}
                />
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <List style={{ padding: '0px', maxHeight: '550px', overflow: 'auto' }}>
              {users.map((user, i) => {
                if (!user.checked) user.checked = false;
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
                      <Avatar alt="" src={user.avatar ? config.api + user.avatar : 'ruta-por-defecto-del-front'} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.firstName} ${user.lastName}`}
                      secondary={
                        <React.Fragment>
                          <Typography variant="body2">{user.companyName || 'Empresa sin asignar'}</Typography>
                        </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Checkbox
                        checked={user.checked || false}
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
            </List>
          </Grid>
        </Grid>
      </ModalBody>
      <ModalFooter confirmText={'Iniciar Chat'} onConfirm={onConfirm} />
    </Modal>
  );
};

export default ModalNewCustomerChat;
