import {makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import Typography from '@material-ui/core/Typography';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import AddCommentIcon from '@material-ui/icons/AddComment';

const useStyles = makeStyles(theme => ({
   
    btnNewChat:{
        padding:'5px',
        border:'1px solid #FFFFFF',
        marginBottom:'15px',
        height:'3rem',
        display:'flex',
        color:'#ffffff'
    },
    
    
    title: {
        display: 'flex',
        alignItems: 'center'
         
    },
    bodyModal:{
        backgroundColor:'#341041'
    },
    btnNewChat__Icon:{
        height:'35px',
        width:'35px',
        marginLeft:'2rem'
    },
    btnNewChat__Text:{
        fontSize:'1.5rem',
        color:'#ffffff',
        marginLeft:'5.5rem' 
    },
    btnNewChat__TextM:{
        fontSize:'1.5rem',
        color:'#ffffff',
        marginLeft: '55px'
    }
    
}));

 

const ModalNewChat = ({open, handleClose}) => {
    
    const classes = useStyles();
     

    return (
        <Modal open={open} handleClose={handleClose} size="xs"  >
            <ModalHeader handleClose={handleClose} style={{textAlign: 'center' , backgroundColor:'#d66565'  }}>
                <div className={classes.title}>
                    <AddCommentIcon style={{margin: '0px 6.7rem 0px 30px' , color:'#341041'}} fontSize="large" />
                    <Typography variant="h5" style={{textAlign:'center' , color:'black'}}>Nueva Chat</Typography>
                </div>
            </ModalHeader>
            <ModalBody  className={classes.bodyModal}>
                        <div className={classes.btnNewChat}>
                            <div className={classes.btnNewChat__Icon}><SupervisedUserCircleIcon  fontSize="large"/></div>
                            <label className={classes.btnNewChat__Text}> Chat Cliente</label>
                        </div>
                        <div className={classes.btnNewChat}>
                        <div className={classes.btnNewChat__Icon}><BusinessIcon  fontSize="large" /></div>
                            <label className={classes.btnNewChat__TextM}> Chat por Empresa</label>
                        </div>
                        <div className={classes.btnNewChat}>
                        <div className={classes.btnNewChat__Icon}><PersonIcon  fontSize="large" /></div>
                            <label className={classes.btnNewChat__Text}> Chat Interno</label>
                        </div>
            </ModalBody>
        </Modal>
    )
}

export default ModalNewChat
