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
import ModalFooter from './common/ModalFooter';
import ChatIcon from '@material-ui/icons/Chat';
import { Input, InputAdornment } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    letters:{
        fontSize:'20px',
        fontStyle:'oblique',
        fontWeight:'bold'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const ModalNewInternalChat = (props) => {

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
          icon={<ChatIcon />}
          text="Nuevo Chat Interno"
        />

        <ModalBody>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper style={{margin:'0px 0px 20px 0px'}} component="form" >

                <InputBase
                  className={classes.input}
                  fullWidth={true}
                  placeholder="Buscar contactos"
                  inputProps={{ 'aria-label': 'Buscar contactos' }}
                  startAdornment= {
                    <InputAdornment position="start" tyle={{marginLeft:'5px'}} type="button" className={classes.iconButton} aria-label="search">
                      <SearchIcon />
                    </InputAdornment>}
                />
              </Paper>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <List dense style={{maxHeight: 350, overflow: 'auto'}}>
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
        confirmText={"Iniciar Chat"}
        onConfirm={null}
      />
    </Modal>
  )
}

export default ModalNewInternalChat
