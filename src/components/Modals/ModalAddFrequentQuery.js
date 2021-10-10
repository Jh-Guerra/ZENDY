import { Box, Grid, makeStyles, TextField } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import ModalFooter from './common/ModalFooter';
import { updateFrequent } from 'services/actions/EntryQueryAction';

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

const ModalAddFrequentQuery = (props) => {

    const classes = useStyles();
    const { open, handleClose, entryQuery, setEntryQuery, onAcceptEntryQuery } = props;
    const [name, setName] = React.useState("")

    const handleChange = (event) => {
        setName(event.target.value);
    } 

    const addName = (data) => {
        props.dispatch(updateFrequent(entryQuery.id,data)).then(res => {
            onAcceptEntryQuery()
        })
    }

    return (
        <Modal 
            open={open} 
            handleClose={handleClose}
            size="sm"
        >
            <ModalHeader 
                icon={<ChatIcon />}
                text="Añadir Consulta Frecuente"
            />

            <ModalBody>
                <Grid container>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Typography gutterBottom className={classes.typography}>¿Está seguro que desea añadirlo como Consulta Frecuente?</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                    <Box textAlign="center" style = {{marginTop:'5px'}}>
                    <TextField
                        style = {{width:'300px'}}
                        id="name"
                        placeholder = {"Nombre para la consulta"}
                        value={name}
                        onChange={handleChange}
                      />
                      </Box>
                    </Grid>
                </Grid>
            </ModalBody>

            <ModalFooter
                confirmText={"Aceptar"}
                onConfirm={() => { addName(name) }}
                cancelText={"Cancelar"}
                onCancel={handleClose}
            />
        </Modal>
    )
}

export default ModalAddFrequentQuery

