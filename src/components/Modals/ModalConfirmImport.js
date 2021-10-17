import { Box, Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import ModalFooter from './common/ModalFooter';
import ImportExportIcon from '@material-ui/icons/ImportExport';

const useStyles = makeStyles(theme => ({

}));

const ModalConfirmImport = (props) => {

    const classes = useStyles();
    const { open, handleClose, onConfirm } = props;

    return (
        <Modal 
            open={open} 
            handleClose={handleClose}
            size="md"
        >
            <ModalHeader 
                icon={<ImportExportIcon />}
                text="Importación de Datos"
            />

            <ModalBody>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography style={{textAlign:"center"}}>¿Esta seguro de realizar el import?</Typography>
                    </Grid>
                </Grid>
            </ModalBody>

            <ModalFooter
                confirmText="Aceptar"
                onConfirm={onConfirm}
                cancelText="Cancelar"
                onCancel={handleClose}
            />
        </Modal>
    )
}

export default ModalConfirmImport

