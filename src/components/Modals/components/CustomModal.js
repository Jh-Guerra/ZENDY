import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Drawer, Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  large: {
    width: '60%',
    height: '60%',
  },
}));

const CustomModal = props => {
  
  const classes = useStyles();

    return (
      <Drawer anchor="right" open={props.openDetail} onClose={props.onClose}>      
        <Box className="base-modal" width='419px'>
            <Box height="25px" />
            <Box display="flex" justifyContent="center">          
              <Avatar alt="#" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" className={classes.large}></Avatar>             
            </Box>
            <Box height="25px" />
            <Divider style={{backgroundColor:'white'}} variant="middle" />              
            <Box height="25px" />
              {props.children}       
        </Box>
      </Drawer>
    )
}

export default CustomModal;