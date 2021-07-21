import { Checkbox, Divider, Grid, makeStyles } from '@material-ui/core';
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

const ModalRecomendarUsuario = (props) => {

  const { open, handleClose } = props;

  const classes = useStyles();

  const [checked, setChecked] = React.useState([1]);
    
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
              <Paper style={{margin:'0px 0px 20px 0px'}} component="form" >
                <IconButton style={{marginLeft:'5px'}} type="button" className={classes.iconButton} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <InputBase
                  className={classes.input}
                  placeholder="Buscar contactos"
                  inputProps={{ 'aria-label': 'Buscar contactos' }}
                />
              </Paper>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <List dense>
                {[0, 1, 2, 3].map((value) => {
                  const labelId = `checkbox-list-secondary-label-${value}`;
                  return (
                  <ListItem key={value} button divider>
                    <ListItemAvatar>
                      <Avatar
                          alt={`Avatar n°${value + 1}`}
                          src="https://w7.pngwing.com/pngs/847/821/png-transparent-lisa-simpson-maggie-simpson-drawing-marge-simpson-others-text-hand-head.png"
                      />
                    </ListItemAvatar>
                    <ListItemText style={{marginLeft:'7px'}} id={labelId} primary={`Lisa Simpons ${value + 1}`} className={classes.letters} />
                    <ListItemSecondaryAction>
                      <Checkbox
                          edge="end"
                          onChange={handleToggle(value)}
                          checked={checked.indexOf(value) !== -1}
                          inputProps={{ 'aria-labelledby': labelId }}
                          icon={<RadioButtonUncheckedIcon />} 
                          checkedIcon={<RadioButtonCheckedIcon style={{color:'#4F1B66'}}/>}           
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
        confirmText={"Recomendar"}
        onConfirm={null}
      />
    </Modal>
  )
}

export default ModalRecomendarUsuario
