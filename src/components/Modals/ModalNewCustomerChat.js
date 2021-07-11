import { Checkbox, Divider, Grid, Typography, FormControl, InputLabel, Input, InputAdornment} from '@material-ui/core';
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
import { listUsers } from 'services/actions/UserAction';
import { showBackdrop } from 'services/actions/CustomAction';
import { createClientChat } from 'services/actions/ChatAction';

const ModalNewCustomerChat = props => {
  const { open, handleClose } = props;

  const [users, setUsers] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);

  React.useEffect(() => {
    if(open){
      onListUsers();
    }
  }, [open]);

  const onListUsers = (term) => {
    // props.dispatch(showBackdrop(true));
    props.dispatch(listUsers(term)).then(res => {
      setUsers(res || []);
      // props.dispatch(showBackdrop(false));
    });
  }

  const onSearch = (term) => {
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        onListUsers(term);
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

  const onConfirm = () => {
    const selectedRows = users.filter(user => user.checked);

    props.dispatch(createClientChat(selectedRows)).then(res => {
      handleClose();
    });

  }

  return (
    <Modal open={open} handleClose={handleClose} size="sm">
      <ModalHeader icon={<PeopleAltIcon />} text="Nuevo Chat Cliente" />
      <ModalBody>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Input
                id="search-input"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                fullWidth
                placeholder="Buscar..."
                onChange={(event) => onSearch(event.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <List style={{padding: "0px", maxHeight: "550px", overflow: "auto"}}>
              {
                users.map((user, index) => {
                  if(!user.checked) user.checked = false;
                  return (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar alt="" src={user.avatar || ""} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${user.firstName} ${user.lastName}`}
                        secondary={
                          <React.Fragment>
                            <Typography variant="body2">{user.company && user.company.name || "Empresa sin asignar"}</Typography>
                          </React.Fragment>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Checkbox
                          checked={user.checked || false}
                          onChange={() => {onSelectUser(user)}}
                          icon={<RadioButtonUncheckedIcon />}
                          checkedIcon={<RadioButtonCheckedIcon style={{ color: pColor }} />}
                        />
                      </ListItemSecondaryAction>
                      {
                        index != users.length-1 && (
                          <Divider />
                        )
                      }
                    </ListItem>
                  )
                })
              }

            </List>
          </Grid>
        </Grid>
      </ModalBody>
      <ModalFooter confirmText={'Iniciar Chat'} onConfirm={onConfirm} />
    </Modal>
  );
};

export default ModalNewCustomerChat;
