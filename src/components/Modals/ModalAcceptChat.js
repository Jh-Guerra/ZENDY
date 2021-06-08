import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import Typography from '@material-ui/core/Typography';
import { FormatAlignCenter } from '@material-ui/icons';
import ModalFooter from './common/ModalFooter';

const useStyles = makeStyles(theme => ({
    typography: {
        // color: 'white',
        width: '100%',
        align: 'justify',
    },
    button: {
        // marginTop: '2vh',
        border: '3px solid',
        borderRadius: '50px',
        color: 'white',
        // fontSize: '16px',
        // padding: '0.5vh 3vh'
    }
}));

const ModalAcceptChat = ({ open, handleClose }) => {

    const classes = useStyles();

    return (
        <Modal open={open} handleClose={handleClose}>
            <ModalHeader handleClose={handleClose}>
                Aceptar Chat
            </ModalHeader>
            <ModalBody>
                <Grid container>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Typography gutterBottom className={classes.typography}>¿Está seguro que desea aceptar este chat?</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleClose} size="small" color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleClose} size="small" color="primary" autoFocus>
                    Aceptar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalAcceptChat

