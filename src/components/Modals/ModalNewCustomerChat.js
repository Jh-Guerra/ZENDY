import { Checkbox, Divider, Grid, Typography} from '@material-ui/core';
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
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const ModalNewCustomerChat = (props) => {

  const { open, handleClose } = props;
  
  return (
    <Modal 
      open={open} 
      handleClose={handleClose}
      size="sm"
    >
    <ModalHeader
      icon={<PeopleAltIcon />}
      text="Nuevo Chat Cliente"   
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
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="" src="" />
              </ListItemAvatar>
                <ListItemText
                  primary="Lisa Simpson"
                  secondary={
                  <React.Fragment>
                    <Typography variant="body2">Simpson's Company</Typography>                                                   
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
                <Avatar alt="" src="" />
              </ListItemAvatar>
                <ListItemText
                  primary="Marge Simpsons"
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2">Simpson's Company</Typography>      
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
                <Avatar alt="" src="" />
              </ListItemAvatar>      
                <ListItemText
                  primary="Milhaus Van Houten"
                  secondary={
                    <React.Fragment>
                      <Typography  variant="body2">Otra empresa</Typography>
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
          </List>  
        </Grid> 
      </Grid>
    </ModalBody>
    <ModalFooter 
      confirmText={"Iniciar Chat"}
      onConfirm={{}}
    />
    </Modal>
  )
}

export default ModalNewCustomerChat