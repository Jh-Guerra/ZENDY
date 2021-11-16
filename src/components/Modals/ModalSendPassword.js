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
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';

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
        props.dispatch(showBackdrop(true));
        props.dispatch(sendEmail(userData.id,email)).then(
            (res) => {
                props.dispatch(showSnackBar("success", "Correo Electronico Enviado para " + email ));
                props.handleClose();
                setCheckedConfirm(false);
                setOtherEmail(true);
                props.dispatch(showBackdrop(false));
            },
            (error) => {
                props.dispatch(showSnackBar("warning", error.response.data.error || ""));
                props.dispatch(showBackdrop(false));
            }
        );
    }

    const getCensoredEmail = (email) => {
        if(!email){
            return "";
        }

        if(checkedConfirm){
            return email;
        }

        var regex = /(?<!^).(?!$)/g;
        var splitEmail = email.split("@");
        var censoredName = splitEmail[0] ? splitEmail[0].replace(regex, '*') : "";
        var censoredHost = splitEmail[1] ? splitEmail[1].replace(regex, '*') : "";

        return censoredName + "@" + censoredHost;
    }

    const censoredEmail = getCensoredEmail(email);
    
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
                    <Grid container item xs={12} alignItems="center" justify="center">
                        <Divider style={{ marginTop: "6vh" }} />
                        <Typography>La información será enviada a este correo electrónico</Typography>
                        <TextField style={{ width: "100%", textAlignLast: 'center' }} value={censoredEmail} onChange={handleChange} disabled={otherEmail} />
                        {/* <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkedConfirm}
                                    onChange={checkedConfirmEmail}
                                />
                            }
                            label={<span style={{ fontSize: '1.9vh' }}>tengo otro correo electrónico</span>}
                        /> */}
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