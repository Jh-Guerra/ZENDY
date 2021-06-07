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
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles(theme => ({
    boxMessage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#2F103D',
        border:'2px',
        borderColor:'white',
        opacity:'90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:'5px'
    },
    buttonIcon: {
        width: '30px',
        marginRight: '10px'
    },
    separation: {
        marginBottom: '15px !important',
    },
    letras:{
        fontSize:'20px',
        fontStyle:'oblique',
        fontWeight:'bold'
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      },
    rootS: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
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

const ModalRecomendarUsuario = ({open, handleClose}) => {
    const [checked, setChecked] = React.useState([1]);
    const classes = useStyles();
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
        <Modal open={open} handleClose={handleClose}>
            <ModalHeader handleClose={handleClose}>
               Recomendar Usuario
            </ModalHeader>
            <ModalBody>
                <Paper style={{margin:'0px 0px 20px 0px'}} component="form" className={classes.rootS}>
                  <IconButton style={{marginLeft:'5px'}} type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    className={classes.input}
                    placeholder="Buscar contactos"
                    inputProps={{ 'aria-label': 'Buscar contactos' }}
                  />
                </Paper>

            <div className={`${classes.boxMessage} ${classes.separation}`}>        
              <List dense className={classes.root}>
                  {[0, 1, 2, 3].map((value) => {
                  const labelId = `checkbox-list-secondary-label-${value}`;
                  return (
                  <ListItem key={value} button style={{marginTop:'5px'}} divider>
                      <ListItemAvatar>
                      <Avatar
                          alt={`Avatar n°${value + 1}`}
                          src="https://w7.pngwing.com/pngs/847/821/png-transparent-lisa-simpson-maggie-simpson-drawing-marge-simpson-others-text-hand-head.png"
                      />
                      </ListItemAvatar>
                      <ListItemText style={{marginLeft:'7px'}} id={labelId} primary={`Lisa Simpons ${value + 1}`} className={classes.letras}/>
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
            </div>
            <div className={`${classes.separation} button`} onClick={handleClose}>
                <RecordVoiceOverIcon className={classes.buttonIcon} />
                  <p>Recomendar</p>
            </div>
            </ModalBody>
        </Modal>
    )
}

export default ModalRecomendarUsuario
