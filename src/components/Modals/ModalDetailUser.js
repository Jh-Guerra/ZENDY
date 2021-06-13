import {Avatar, Grid, makeStyles  } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import EventIcon from '@material-ui/icons/Event';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import TimerIcon from '@material-ui/icons/Timer';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    AvatarDetailUser:{
        width:'70px',
        Height:'70px'
    },
    large:{
        width: theme.spacing(12),
        height: theme.spacing(14),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    p:{
        marginRight:'10px'
    }
}));

 

const ModalDateilUser = (props) => {
    
    const classes = useStyles();
    const { open, handleClose } = props;
     
    return (
        <Modal  open={open}  handleClose={handleClose} size="xs" >
            <ModalHeader 
                text="Detalle Usuario"
            />
            <ModalBody>

            <Grid container   spacing={2} direction="column" alignItems="center" justify="center" >
                <Grid container item spacing={1} direction="column" alignItems="center" justify="center">   
                <Grid item xs={4}  >
                <Avatar alt="Imgane No Caragada"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" 
                className={classes.large}/>
                <hr/>
                </Grid>
                <Grid item xs={10} className="chat-header-name" >
                    <p>Homero Simpons</p>
                </Grid>
                <Grid item xs={10}   >
                    <i>Montgomery Burns' Company</i>
                </Grid>
            </Grid>
            <Grid container  item  direction="column" alignItems="center" justify="center"   spacing={1} >
                <Grid   container item direction="row" justify="space-between" alignItems="flex-start"    width="100%"  >
                    <Box       ><EventIcon  fontSize="small" />  </Box>
                    <Box   >Fecha de Inicio </Box>
                    <Box >21-04-02 </Box>
                </Grid>
                <Grid  container item direction="row" justify="space-between" alignItems="flex-start"    width="100%"  >
                    <Box      > <TimerIcon fontSize="small "/>  </Box>
                    <Box >Tiempo de Vida de Chay </Box>
                    <Box > 24h 36 min</Box>
                </Grid>
                <Grid  container item direction="row" justify="space-between" alignItems="flex-start"    width="100%"   >
                    <Box > <EventBusyIcon  fontSize="small" /></Box>
                    <Box >Fecha dex Finalizacion</Box>
                    <Box >29-05-09</Box>
                    
                </Grid>
            </Grid>
            </Grid>
            
            </ModalBody>
        </Modal>
    )
}

export default ModalDateilUser
