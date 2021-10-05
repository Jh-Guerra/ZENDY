import { Box, Grid, makeStyles, MenuItem, Select } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ModalFooter from './common/ModalFooter';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import { statusItems } from 'utils/common';
import CustomInput from 'components/CustomInput';

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

const ModalEndChat = (props) => {

    const classes = useStyles();
    const { open, handleClose } = props;

    const [finalizeStatus, setFinalizeStatus] = React.useState("Completado");
    const [finalizeDescription, setFinalizeDescription] = React.useState("");

    React.useEffect(() => {
        if(open){
            setFinalizeStatus("Completado");
            setFinalizeDescription("");
        }
    }, [open]);

    const onEndChat = () => {
        props.onEndChat && props.onEndChat({
            finalizeStatus: finalizeStatus,
            finalizeDescription: finalizeDescription
        })
    }

    return (
        <Modal
            open={open}
            handleClose={handleClose}
            size="sm">
                
            <ModalHeader
                icon={<SpeakerNotesOffIcon />}
                text="Finalizar chat"
                size="md"
            />
            <ModalBody>
                <Grid container>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Typography variant="h5" gutterBottom className={classes.typography}>¿Está seguro de finalizar el chat?</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container direction="row" className={classes.margin} >
                            <Grid item xs={3}>
                                <Typography variant="h6" gutterBottom >Estado:</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Select
                                    className={classes.select}
                                    onChange={event => { setFinalizeStatus(event.target.value) }}
                                    value={finalizeStatus}
                                >
                                    {
                                        statusItems.map((status, i) => (
                                            <MenuItem key={i} value={status}>{status}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container className={classes.margin}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom >Razón y/o motivo:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomInput
                                id="description"
                                custom="textArea"
                                onChange={event => { setFinalizeDescription(event.target.value) }}
                                value={finalizeDescription}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </ModalBody>
            <ModalFooter 
                confirmText={"Aceptar"}
                onConfirm={onEndChat}
                cancelText={"Cancelar"}
                onCancel={handleClose}
            />
        </Modal>
    )
}

export default ModalEndChat
