import { Checkbox, Divider, Grid, makeStyles, InputAdornment, Typography } from '@material-ui/core';
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
import { listAvailableUsers } from 'services/actions/UserAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import config from 'config/Config';
import { pColor } from 'assets/styles/zendy-css';
import { getCustomRoleName, getImageProfile } from "utils/common";
import { listRecommendationsByEntryQuery } from 'services/actions/RecommendationAction';
import { recommendUser } from 'services/actions/EntryQueryAction';

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

const ModalRecommendUser = (props) => {

  const { open, handleClose, entryQuery={} } = props;

  const classes = useStyles();

  const [users, setUsers] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [term, setTerm] = React.useState('');

  React.useEffect(() => {
    if(open){
      onListAvailableUsers();
      setTerm("");
    }
  }, [open]);

  const onListAvailableUsers = (term) => {
    props.dispatch(showBackdrop(true));
    const selectedUsers = users.filter(user => user.checked) || [];
    const selectedUserIds = selectedUsers.map(user => user.id) || [];
    props.dispatch(listRecommendationsByEntryQuery(entryQuery.id)).then(userRecommendations => {
      props.dispatch(listAvailableUsers(["Admin", "UserHD"], term)).then(res => {
        const users = res.map(user => {
          if (!selectedUserIds.includes(user.id)) {
            selectedUsers.push(user)
          }
          return {...user, recommend: userRecommendations.includes(user.id)}
        });
        setUsers(users || []);
        props.dispatch(showBackdrop(false));
      }).catch(err => props.dispatch(showBackdrop(false)));
    }).catch(err => props.dispatch(showBackdrop(false)));
  }

  const onSearch = (term) => {
    setTerm(term);
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        onListAvailableUsers(term);
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

  const onRecommendUser = () => {
    const selectedUsers = users.filter(user => user.checked);
    const selectedUserIds = selectedUsers.map(user => user.id);
    props.dispatch(showBackdrop(true));
    props.dispatch(recommendUser(selectedUserIds, entryQuery.id)).then(res => {
      const message = res && res.success || "Recomendaciones enviadas";
      props.dispatch(showSnackBar("success", message));
      props.handleClose();
      props.onListExistingRecommendations();
      props.dispatch(showBackdrop(false));
    }).catch(err => { props.dispatch(showBackdrop(false)); props.dispatch(showSnackBar("error", err.response.data.error)); });
  }
    
  return (
    <Modal 
      open={open} 
      handleClose={handleClose}
      size="sm"
    >
        <ModalHeader
          icon={<PersonAddIcon />}
          text="Recomendar Usuario"
          size="md"
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
            <List style={{ padding: "0px", maxHeight: "550px", overflow: "auto" }}>
              {
                users.map((user, i) => {
                  if (!user.checked) user.checked = false;
                  return (
                    <ListItem key={i} button divider onClick={() => { onSelectUser(user) }} disabled={user.recommend}>
                      <ListItemAvatar>
                        <Avatar alt="" src={user.avatar ? (config.api + user.avatar) : getImageProfile(user.sex)} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${user.firstName} ${user.lastName}`}
                        secondary={`${getCustomRoleName(user.roleName)}${user.recommend && ": Ya fue recomendado" || ""}`}
                      />
                      {
                        !user.recommend && (
                          <ListItemSecondaryAction>
                            <Checkbox
                              checked={user.checked || false}
                              onChange={() => { onSelectUser(user) }}
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<RadioButtonCheckedIcon style={{ color: pColor }} />}
                            />
                          </ListItemSecondaryAction>
                        )
                      }
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
        confirmText={"Recomendar"}
        onConfirm={onRecommendUser}
      />
    </Modal>
  )
}

export default ModalRecommendUser
