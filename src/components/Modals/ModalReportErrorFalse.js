import { Box, Divider, Grid, InputAdornment, makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import ModalFooter from './common/ModalFooter';

const useStyles = makeStyles(theme => ({
    textConfirm: {
        align: 'justify'
    },
    fullInputText: {
        margin: theme.spacing(1),
        width: "100%"
    }
}));

const ModalReportErrorFalse = (props) => {

    const { open, handleClose } = props;
    
    const classes = useStyles();

    return (
        <Modal 
            open={open}
            handleClose={handleClose}
            size="sm"
        >
            <ModalHeader 
                icon={<WarningIcon />}
                text={"Reportar error falso"}
            />

            <ModalBody>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Typography gutterBottom className={classes.textConfirm}>¿Esta seguro que desea reportar el error como falso?</Typography>
                        </Box>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.fullInputText}
                            label="Motivo"
                            multiline
                            rows={8}
                            rowsMax={8}
                            placeholder="..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {/* <AccountCircle /> */}
                                    </InputAdornment>
                                ),
                            }}
                        />
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

export default ModalReportErrorFalse