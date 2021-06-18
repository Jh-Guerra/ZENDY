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
  const Companies = ["Opcion 1", "Opcion 2", "Opcion 3", "Opcion 4"]
  const Users = ['Lisa Simpons 1', 'Lisa Simpons 2', 'Lisa Simpons 3', 'Lisa Simpons 4', 'Lisa Simpons 5', 'Lisa Simpons 6', 'Lisa Simpons 7', 'Lisa Simpons 8', 'Lisa Simpons 9', 'Lisa Simpons 10']



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

  const selectAllUser = (e) => {
    const newCheckedAll = [];
    if (e.target.checked) {     
      Users.map(value => {
        newCheckedAll.push(value);
      })
    }else{
      newCheckedAll.splice(Users);
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
              >
                {
                  Companies.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
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
                    className={classes.input}
                    placeholder="Buscar contactos"
                    inputProps={{ 'aria-label': 'Buscar contactos' }}
                  />
                </Grid>

              </Paper>
            </Grid>
            <Grid>
              <Typography>todos los usuarios</Typography>
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
              {Users.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <ListItem key={value} button divider>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${value + 1}`}
                        src="https://w7.pngwing.com/pngs/847/821/png-transparent-lisa-simpson-maggie-simpson-drawing-marge-simpson-others-text-hand-head.png"
                      />
                    </ListItemAvatar>
                    <ListItemText style={{ marginLeft: '7px' }} id={labelId} primary={`${value}`} className={classes.letters} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(value)}
                        checked={checked.indexOf(value) !== -1}
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