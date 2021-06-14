import { Box, Grid, makeStyles, MenuItem, Select } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ModalFooter from './common/ModalFooter';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    typography: {
        width: '100%',
        align: 'justify',
    },
    textarea: {
        minWidth: '100%',
        maxWidth: '100%',
    },
    margin: {
        marginTop: '10px'
    },
    select: {
        width: '100%'
    }
}));

const ModalEndChat = ({ open, handleClose }) => {

    const classes = useStyles();
    const MenuItems = ["Opcion 1","Opcion 2","Opcion 3","Opcion 4"]

    return (
        <Modal
            open={open}
            handleClose={handleClose}
            size="xs">
                
            <ModalHeader
                icon={<DeleteIcon />}
                text="Finalizar chat"
                size="md"
            />
            <ModalBody>
                <Grid container>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Typography variant="h5" gutterBottom className={classes.typography}>¿Está seguro de finalizar el chat con "Homero Simpons"?</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={12}>
                        <Grid container direction="row" className={classes.margin} >

                            <Grid xs={3}>
                                <Typography variant="h6" gutterBottom >Estado:</Typography>
                            </Grid>
                            <Grid xs={6}>
                                <Select
                                    className={classes.select}
                                >
                                {
                                    MenuItems.map((item) => (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    ))
                                }
                                </Select>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid xs={12} className={classes.margin}>
                        <Grid xs={12}>
                            <Typography variant="h6" gutterBottom >Razón y/o motivo:</Typography>
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                placeholder="Ingrese una descripción ..."
                                multiline
                                className={classes.textarea}
                                rows={6}
                                rowsMax={6}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </ModalBody>
            <ModalFooter 
                confirmText={"Aceptar"}
                onConfirm={{}}
                cancelText={"Cancelar"}
                onCancel={handleClose}
            />
        </Modal>
    )
}

export default ModalEndChat
