import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import Typography from '@material-ui/core/Typography';
import { FormatAlignCenter } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    typography: {
        color: 'white',
        width: '100%',
        align: 'justify'
    },
    button: {
        marginTop: '2vh',
        border: '3px solid',
        borderRadius: '50px',
        color: 'white',
        fontSize: '1.5vh',
        padding: '0.5vh 3vh'
    }
}));

const ModalAceptarChat = ({ open, handleClose }) => {

    const classes = useStyles();

    return (
        <Modal open={open} handleClose={handleClose}>
            <ModalHeader handleClose={handleClose}>
                Aceptar Chat
            </ModalHeader>
            <ModalBody>
                <Box textAlign="center">
                    <Typography gutterBottom variant="h4" className={classes.typography}>¿Esta seguro que desea aceptar este chat?</Typography>
                </Box>
                <Grid container justify="space-around">
                    <Button className={classes.button} onClick={handleClose}>Aceptar</Button>
                    <Button className={classes.button} onClick={handleClose}>Cancelar</Button>
                </Grid>
            </ModalBody>
        </Modal>
    )
}

export default ModalAceptarChat

