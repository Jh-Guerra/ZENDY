import { Box, Divider, Grid, InputAdornment, makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import ModalFooter from './common/ModalFooter';
import { dangerColor } from 'assets/styles/zendy-css';

const useStyles = makeStyles(theme => ({
    textConfirm: {
        align: 'justify'
    },
    fullInputText: {
        margin: theme.spacing(1),
        width: "100%"
    },
}));

const ModalDelete = (props) => {

    const { open, handleClose, title } = props;
    
    const classes = useStyles();

    return (
        <Modal 
            open={open}
            handleClose={handleClose}
            size="sm"
        >
            <ModalHeader 
                icon={<WarningIcon />}
                text={title}
                backgroundColor={dangerColor}
            />

            <ModalBody>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Typography gutterBottom className={classes.textConfirm}>¿Está seguro de eliminar el registro?</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </ModalBody>

            <ModalFooter
                confirmText={"Si"}
                onConfirm={props.onDelete}
                cancelText={"No"}
                onCancel={handleClose}
            />

        </Modal>
    )
}

export default ModalDelete