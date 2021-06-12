import {Button, Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import Typography from '@material-ui/core/Typography';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { pColor } from 'assets/styles/zendy-css';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

 

const ModalNewChat = (props) => {
    
    const classes = useStyles();
    const { open, handleClose } = props;
     
    return (
        <Modal 
            open={open} 
            handleClose={handleClose} 
            size="xs" 
        >
            <ModalHeader 
                icon={<AddCommentIcon />}
                text="Nuevo Chat"
            />

            <ModalBody>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="lg"
                            fullWidth
                            className={classes.button}
                            startIcon={<SupervisedUserCircleIcon />}
                        >
                            Chat Cliente
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="lg"
                            fullWidth
                            className={classes.button}
                            startIcon={<BusinessIcon />}
                        >
                            Chat por Empresa
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="lg"
                            fullWidth
                            className={classes.button}
                            startIcon={<PersonIcon />}
                        >
                            Chat Interno
                        </Button>
                    </Grid>
                </Grid>
            </ModalBody>
        </Modal>
    )
}

export default ModalNewChat
