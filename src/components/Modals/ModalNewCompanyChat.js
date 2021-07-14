import { Checkbox, Divider, Grid, makeStyles, MenuItem, Typography, Select } from '@material-ui/core';
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
import { listUsers, listUsersByCompany } from 'services/actions/UserAction';


const useStyles = makeStyles(theme => ({
  buttonIcon: {
    width: '30px',
    marginRight: '10px'
  },
  letters: {
    fontSize: '20px',
    fontStyle: 'oblique',
    fontWeight: 'bold'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '80%',
    marginTop: '20px'
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  select: {
    width: '100%'
  }
}));

const ModalNewCompanyChat = (props) => {

  const { open, handleClose } = props;
  const [companies, setCompanies] = React.useState([])
  const [users, setUsers] = React.useState([])

  const [company, setCompany] = React.useState('')
  const [user, setUser] = React.useState('')

  React.useEffect(() => {
    if(open){
      onListCompanies();
    }
  }, [open]);

  const onListCompanies = (term) => {
    props.dispatch(listCompanies(term)).then(res => {
      setCompanies(res || []);
    });
  }

  const onListUsersByCompany = (company, term) => {
    props.dispatch(listUsersByCompany(company, term)).then(res => {
      setUsers(res || []);
    });
  }

  const classes = useStyles();

  const [checked, setChecked] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleOnChangeCompany = e => {
    const companySelected = e.target.value
    setCompany(companySelected);
    onListUsersByCompany(companySelected, user);
  }

  const handleOnChangeUser = e => {
    const userName = e.target.value
    setUser(userName);
    onListUsersByCompany(company, user);
  }

  const selectAllUser = (e) => {
    const newCheckedAll = [];
    if (e.target.checked) {     
      users.map(value => {
        newCheckedAll.push(value);
      })
    }else{
      newCheckedAll.splice(users);
    }
    setChecked(newCheckedAll);
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      size="xs"
    >
      <ModalHeader
        icon={<BusinessIcon />}
        text="Nuevo Chat Empresa"
        size="md"
      />

      <ModalBody>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item xs={3}>
              <Typography variant="h6" gutterBottom >Empresa:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Select
                className={classes.select}
                onChange={handleOnChangeCompany}
              >
                {
                  companies.map(({name, id}) => (
                    <MenuItem key={id} value={name}>{name}</MenuItem>
                  ))
                }
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Paper style={{ margin: '0px 0px 20px 0px' }} component="form" >
                <Grid container direction="row" >
                  <IconButton style={{ marginLeft: '5px' }} type="button" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    onChange={handleOnChangeUser}
                    className={classes.input}
                    placeholder="Buscar contactos"
                    inputProps={{ 'aria-label': 'Buscar contactos' }}
                  />
                </Grid>

              </Paper>
            </Grid>
            <Grid>
              <Typography>Todos los usuarios</Typography>
              <Checkbox
                onChange={selectAllUser}
                checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4F1B66' }} />}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <List dense style={{ maxHeight: 250, overflow: 'auto' }}>
              {users.map(({firstName, lastName, id}, index) => {
                const labelId = `checkbox-list-secondary-label-${id}`;
                const nameComplete = firstName + ' ' + lastName;
                return (
                  <ListItem key={id} button divider>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${index + 1}`}
                        src="https://w7.pngwing.com/pngs/847/821/png-transparent-lisa-simpson-maggie-simpson-drawing-marge-simpson-others-text-hand-head.png"
                      />
                    </ListItemAvatar>
                    <ListItemText style={{ marginLeft: '7px' }} id={labelId} primary={`${nameComplete}`} className={classes.letters} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(nameComplete)}
                        checked={checked.indexOf(nameComplete) !== -1}
                        inputProps={{ 'aria-labelledby': labelId }}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<RadioButtonCheckedIcon style={{ color: '#4F1B66' }} />}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </ModalBody>

      <ModalFooter
        icon={<BusinessIcon />}
        confirmText={"Iniciar Chat"}
        onConfirm={null}
      />
    </Modal>
  )
}

export default ModalNewCompanyChat