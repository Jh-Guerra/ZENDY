import { Box, Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import ModalFooter from './common/ModalFooter';

const useStyles = makeStyles(theme => ({
    typography: {
        align: 'justify',
    },
    button: {
        border: '3px solid',
        borderRadius: '50px',
        color: 'white',
    }
}));

const ModalConfirmError = (props) => {

    const classes = useStyles();
    const { open, handleClose, onConfirm } = props;

    return (
        <Modal 
            open={open} 
            handleClose={handleClose}
            size="sm"
        >
            <ModalHeader 
                icon={<ChatIcon />}
                text="Confirmar Error reportado"
            />

            <ModalBody>
                <Grid container>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Typography gutterBottom className={classes.typography}>¿Esta seguro de confirmar este error reportado?</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </ModalBody>

            <ModalFooter
                confirmText={"Aceptar"}
                onConfirm={onConfirm}
                cancelText={"Cancelar"}
                onCancel={handleClose}
            />
        </Modal>
    )
}

export default ModalConfirmError

