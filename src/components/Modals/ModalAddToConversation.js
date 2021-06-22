import { Checkbox, Divider, Grid, makeStyles, Typography} from '@material-ui/core';
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

const ModalAddToConversation = (props) => {

  const { open, handleClose } = props;
  
  return (
    <Modal 
      open={open} 
      handleClose={handleClose}
      size="sm"
    >
    <ModalHeader
      icon={<PersonAddIcon />}
      text="Agregar a la conversación"   
    />
    <ModalBody>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <IconButton>
              <SearchIcon />
            </IconButton>             
              <InputBase                     
                placeholder="Buscar..."              
              />
          </Paper>
          <Divider />
         </Grid>
        <Grid item xs={12}>
          <Typography style={{fontWeight:"bold"}}>ERP Usuarios</Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="LisaSimpson" src="" />
              </ListItemAvatar>
                <ListItemText
                  primary="Lisa Simpson"
                  secondary={
                  <React.Fragment>
                    <Typography variant="body2">Nombre ERP</Typography>                                                   
                  </React.Fragment>
                  }
                />
                  <ListItemSecondaryAction>
                    <Checkbox                  
                      icon={<RadioButtonUncheckedIcon />} 
                      checkedIcon={<RadioButtonCheckedIcon style={{color:'#4F1B66'}}/>}           
                    />
                  </ListItemSecondaryAction>
              </ListItem>
            <Divider variant="inset" />
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="MargeSimpsons" src="" />
              </ListItemAvatar>
                <ListItemText
                  primary="Marge Simpsons"
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2">Nombre ERP</Typography>      
                    </React.Fragment>
                  }
                />
                  <ListItemSecondaryAction>
                    <Checkbox    
                      icon={<RadioButtonUncheckedIcon />} 
                      checkedIcon={<RadioButtonCheckedIcon style={{color:'#4F1B66'}}/>}           
                    />
                  </ListItemSecondaryAction>
              </ListItem>
            <Divider variant="inset" />
            <br />
            <Typography style={{fontWeight:"bold"}}>Usuarios de la Empresa</Typography>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="MilhausVanHouten" src="" />
              </ListItemAvatar>      
                <ListItemText
                  primary="Milhaus Van Houten"
                  secondary={
                    <React.Fragment>
                      <Typography  variant="body2">Nombre Empresa</Typography>
                    </React.Fragment>
                  }
                />
                  <ListItemSecondaryAction>
                    <Checkbox
                      icon={<RadioButtonUncheckedIcon />} 
                      checkedIcon={<RadioButtonCheckedIcon style={{color:'#4F1B66'}}/>}           
                    />
                  </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="MoeSzyslak" src="" />
                </ListItemAvatar>            
                  <ListItemText
                    primary="Moe Szyslak"
                    secondary={
                      <React.Fragment>
                        <Typography variant="body2">Nombre Empresa</Typography> 
                      </React.Fragment>
                    }
                  />
                    <ListItemSecondaryAction>
                      <Checkbox
                        icon={<RadioButtonUncheckedIcon />} 
                        checkedIcon={<RadioButtonCheckedIcon style={{color:'#4F1B66'}}/>}           
                    />
                    </ListItemSecondaryAction>
              </ListItem> 
          </List>  
        </Grid> 
      </Grid>
    </ModalBody>
    <ModalFooter 
      confirmText={"Añadir"}
      onConfirm={{}}
    />
    </Modal>
  )
}

export default ModalAddToConversation