import { Avatar, Checkbox, Divider, FormControlLabel, Grid, makeStyles, Slider, TextField, Typography } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import EmailIcon from '@material-ui/icons/Email';
import ModalFooter from './common/ModalFooter';
import config from "config/Config";
import { getImageProfile } from 'utils/common';
import { sendEmail } from 'services/actions/UserAction';
import { showSnackBar } from 'services/actions/CustomAction';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));


const ModalSendPassword = (props) => {
    const classes = useStyles();
    const [checkedConfirm, setCheckedConfirm] = React.useState(false);
    const [otherEmail, setOtherEmail] = React.useState(true);
    const [email, setEmail] = React.useState("");
    const { open, handleClose, userData } = props;

    React.useEffect(() => {
        setEmail(userData.email)
        setCheckedConfirm(false);
        setOtherEmail(true)
      }, [userData]);

    const handleChange = (event) => {
        setEmail(event.target.value);
    } 
    

    const checkedConfirmEmail = () => {
        setCheckedConfirm(!checkedConfirm)
        checkedConfirm ? setOtherEmail(true) : setOtherEmail(false)
        checkedConfirm && setEmail(userData.email);
    }

    const sendUserData = (email) => {
        props.dispatch(sendEmail(userData.id,email)).then(
            (res) => {
             props.dispatch(showSnackBar("success", "Correo Electronico Enviado para " + email ));
             props.handleClose();
             setCheckedConfirm(false);
             setOtherEmail(true)
            },
            (error) => {
             props.dispatch(showSnackBar("warning", error.response.data.error || ""));
            }
          );
    }


    
    return (
        <Modal
            open={open}
            size="xs"
        >
            <ModalHeader
                icon={<EmailIcon />}
                text="Recupera tu cuenta"
            />
            <ModalBody>
                <Grid container>
                    <Grid container xs={12} direction="row">
                        <Grid container xs={3} justify="flex-end">
                            <Avatar src={userData.avatar ? (config.api + (userData.avatar) ) : getImageProfile(userData.sex)} className={classes.large} />
                        </Grid>
                        <Grid container xs={9} direction="column" alignItems="center"  justify="center">
                            <Typography>{userData.firstName + " " + userData.lastName}</Typography>
                            {userData.company && <Typography>{userData.company.name}</Typography>}
                        </Grid>

                    </Grid>

                    <Grid container xs={12} alignItems="center" justify="center">
                        <Divider style={{ marginTop: "6vh" }} />
                        <Typography>La información será enviada a este correo electrónico</Typography>
                        <TextField style={{ width: "100%", textAlignLast: 'center' }} value={email} onChange={handleChange} disabled={otherEmail} />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkedConfirm}
                                    onChange={checkedConfirmEmail}
                                />
                            }
                            label={<span style={{ fontSize: '1.9vh' }}>tengo otro correo electrónico</span>}
                        />

                    </Grid>
                </Grid>
            </ModalBody>
            <ModalFooter
                confirmText={"Enviar"}
                onConfirm={() => {sendUserData(email)}}
                cancelText={"Cancelar"}
                onCancel={() => {handleClose()}}
            />
        </Modal>
    )
}

export default ModalSendPassword