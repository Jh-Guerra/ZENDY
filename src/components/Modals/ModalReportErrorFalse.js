import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';

const useStyles = makeStyles(theme => ({

    textConfirm: {
        color: 'white',
        width: '100%',
        align: 'justify'
    },
         
    textArea: {
        width: '100%',
        backgroundColor: '#C4C4C4',
        color: 'black',
        padding: '10px'
    },

    warningIcon: {
        position: 'absolute',
        left: theme.spacing(2),
        top: theme.spacing(1),
      },
    
    button: {
        marginTop: '2vh',
        border: '3px solid',
        borderRadius: '50px',
        color: 'white',
        fontSize: '2vh',
        padding: '0.5vh 3vh'
    }
    
}));

const ModalNotification = ({open, handleClose}) => {
    
    const classes = useStyles();

    return (
        <Modal open={open} handleClose={handleClose}>
            <ModalHeader handleClose={handleClose}>            
                <WarningIcon className={classes.warningIcon}/>
                Reportar error falso
            </ModalHeader>
            <ModalBody>
                <Box textAlign="center">
                    <Typography gutterBottom variant="h5" className={classes.textConfirm}>¿Esta seguro que desea reportar el error como falso?</Typography>
                </Box>
                <TextField
                    placeholder="Ingrese el motivo..."
                    multiline
                    className={`${classes.textArea} ${classes.separation}`}
                    rows={7}
                    rowsMax={Infinity}
                    InputProps={{ disableUnderline: true }}
                />
                <Grid container justify="space-around">
                    <Button className={classes.button} onClick={{}}>Aceptar</Button>
                    <Button className={classes.button} onClick={handleClose}>Cancelar</Button>
                </Grid>
            </ModalBody>
        </Modal>
    )
}

export default ModalNotification