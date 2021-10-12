import { Checkbox, Divider, Grid, makeStyles, MenuItem, Typography, Select, CircularProgress } from '@material-ui/core';
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
import BusinessIcon from '@material-ui/icons/Business';
import ModalFooter from './common/ModalFooter';
import { listCompanies } from 'services/actions/CompanyAction';
import { listUsersByCompany } from 'services/actions/UserAction';
import { pColor } from 'assets/styles/zendy-css';
import config from 'config/Config';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { createCompanyChat } from 'services/actions/ChatAction';
import ZendyIcon from 'assets/images/ZendyIcon.jpg';


const useStyles = makeStyles(theme => ({
  iconButton: {
    padding: 10,
  },
  select: {
    width: '100%'
  }
}));

const ModalNewCompanyChat = (props) => {

  const classes = useStyles();

  const { open, handleClose, onSaveForm } = props;
  const [companies, setCompanies] = React.useState([])
  const [users, setUsers] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);

  const [companyId, setCompanyId] = React.useState('');
  const [term, setTerm] = React.useState('');

  React.useEffect(() => {
    if(open){
      onListCompanies();      
    }else{
      setTerm("");
      setUsers([]);
      setSelectedUsers([]);
    }
  }, [open]);

  const onListCompanies = () => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listCompanies()).then(res => {
      const resCompanies = res || [];
      setCompanies(resCompanies);
      if(resCompanies[0]){
        setCompanyId(resCompanies[0].id || "");
        onListUsersByCompany(resCompanies[0].id, "");
      }
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));;
  }

  const onListUsersByCompany = (paramCompanyId, term) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listUsersByCompany(paramCompanyId, term)).then(res => {
      if(companyId && paramCompanyId != companyId){
        setUsers([...res]);
      }else{
        const noSelectedUsers = res && res.filter(user => !selectedUsers.find(u => u.id == user.id));
        setUsers([...selectedUsers, ...noSelectedUsers]);
      }
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));;
  }

  const onChangeCompany = companyId => {
    setCompanyId(companyId);
    setTerm("");
    onListUsersByCompany(companyId, "");
    setSelectedUsers([]);
  }

  const onSearch = (term) => {
    setTerm(term);
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        onListUsersByCompany(companyId, term);
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

  const selectAllUser = checked => {
    setSelectedUsers(checked ? [...users] : []);
  };

  const onConfirm = () => {
    if (selectedUsers.length == 0) {
      return props.dispatch(showSnackBar('warning', 'Necesita seleccionar un usuario'));
    }

    const company = companies.find(c => c.id == companyId);
    const allUsers = selectedUsers.length == users.length;

    props.dispatch(showBackdrop(true));
    props.dispatch(createCompanyChat(selectedUsers, company, allUsers)).then(res => {   
      props.goToView && props.goToView(res.chat, handleClose);
      props.dispatch(showBackdrop(false));
      onSaveForm && onSaveForm();
    }).catch(err => {
       props.dispatch(showBackdrop(false));
       props.dispatch(showSnackBar("error", err.response.data ? err.response.data.error : "ERROR")); 
    });

  }

  return (
    <Modal open={open} handleClose={handleClose} size="sm">
      <ModalHeader icon={<BusinessIcon />} text="En alguna Empresa" />

      <ModalBody>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item xs={12}>
              <Paper style={{ margin: '0px 0px 20px 0px' }} component="form" >
                <Grid container direction="row" >
                  <IconButton style={{ marginLeft: '5px' }} type="button" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    value={term}
                    style={{flex: 1, width: '80%'}}
                    placeholder="Buscar"
                    onChange={(event) => onSearch(event.target.value)}
                  />
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={4}>
                <Typography variant="h6" gutterBottom >Empresa:</Typography>
              </Grid>
              <Grid item xs={8}>
                <Select
                  className={classes.select}
                  onChange={event => { onChangeCompany(event.target.value) }}
                  value={companyId}
                >
                  {
                    companies.map((company, i) => (
                      <MenuItem key={i} value={company.id}>{company.name}</MenuItem>
                    ))
                  }
                </Select>
              </Grid>
            </Grid>
            <Grid>
              <Typography>Todos los usuarios</Typography>
              <Checkbox
                checked={users.length > 0 && selectedUsers.length == users.length}
                onChange={(event) => { selectAllUser(event.target.checked) }}
                checkedIcon={<CheckBoxIcon style={{ color: pColor }} />}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <List dense style={{ maxHeight: 250, overflow: 'auto' }}>
              {
                users.map((user, i) => {
                  return (
                    <ListItem key={i} button divider onClick={() => { onSelectUser(user) }}>
                      <ListItemAvatar>
                        <Avatar alt="" src={user.avatar ? (config.api+user.avatar) : ZendyIcon} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${user.firstName} ${user.lastName}`}
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
                  );
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

      <ModalFooter
        icon={<BusinessIcon />}
        confirmText={"Buscar Chat"}
        onConfirm={onConfirm}
      />
    </Modal>
  )
}

export default ModalNewCompanyChat