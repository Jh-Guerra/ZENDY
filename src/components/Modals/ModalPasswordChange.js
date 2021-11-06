import { Box, Grid, makeStyles, TextField } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import ModalFooter from './common/ModalFooter';
import LockIcon from '@material-ui/icons/Lock';
import { updateFrequent } from 'services/actions/EntryQueryAction';
import InputAdornment from '@material-ui/core/InputAdornment';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { pColor, sColor } from 'assets/styles/zendy-css';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import  { updatePassword}  from 'services/actions/UserAction';
import { getSessionInfo } from "utils/common";
import { showBackdrop , showSnackBar} from 'services/actions/CustomAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
const CssTextField = withStyles({
  root: {
    '& .MuiInput-underline:after': {
      // borderBottomColor: pColor,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: pColor,
      },
    },
  },
})(TextField);

const ModalPasswordChange = (props) => {
  const { open, handleClose } = props;
  const classes = useStyles();
  const session = getSessionInfo();
  const user = session && session.user || {};

  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [verifyPassword, setVerifyPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = React.useState(false);


  const onChangeOldPassword = (e) => {
    const oldPassword = e.target.value;
    setOldPassword(oldPassword);
  };

  const onChangeNewPassword = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
  };

  const onChangeVerifyPassword = (e) => {
    const verifyPassword = e.target.value;
    setVerifyPassword(verifyPassword);
  };


  const addName = (data) => {

  }
  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    //Password
    if (!oldPassword) {
      formIsValid = false;
      errors["oldPassword"] = "Contraseña requerida";
    }

    //new Password
    if (!newPassword) {
      formIsValid = false;
      errors["newPassword"] = "Contraseña requerida";
    }

    if (!verifyPassword) {
      formIsValid = false;
      errors["verifyPassword"] = "Contraseña requerida";
    }
    if (newPassword != verifyPassword) {
      formIsValid = false;
      errors["verifyPassword"] = "Las contraseñas no coinciden";
    }
    setErrors(errors);
    return formIsValid;
  }
  const body = {
    password: oldPassword,
    encrypted_password: newPassword

  }
  const clearModal = () => {
        setOldPassword('');
        setNewPassword('');
        setVerifyPassword('');
        setShowPassword(false);
        setShowNewPassword(false);
        setShowVerifyPassword(false);
        handleClose(false);
  }


  const handleLogin = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      props.dispatch(updatePassword(user.id, body)).then( res => {
        clearModal();
        props.dispatch(showSnackBar('success', 'Cambio de contraseña exitosa.'));
      }
      ).catch(err => {
        props.dispatch(showSnackBar("error", err.response.data ? err.response.data.error : "ERROR"));
      });   
    }
  };

  return (
    <Modal
      open={open}
      handleClose={clearModal}
      size="sm"
    >
      <ModalHeader
        icon={<VpnKeyIcon />}
        text="Cambiar Contraseña"
      />

      <ModalBody>
        <Grid container>
          <Grid item xs={12}>
            <Box textAlign="center">
              <Typography gutterBottom className={classes.typography}>¿Está seguro que desea cambiar su contraseña?</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} style={{ margin: '15px 0px' }}>
            <Box textAlign="center" style={{ marginTop: '5px' }}>
              <CssTextField
                style={{ width: '350px' }}
                id="oldPassword"
                placeholder={"Ingrese actual contraseña"}
                value={oldPassword}
                required
                fullWidth
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                onChange={onChangeOldPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => { setShowPassword(!showPassword) }}
                        edge="end"
                        style={{ color: pColor }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <span style={{
              color: "red", display: 'flex', flexDirection: 'column',
              alignItems: 'center'
            }}>{errors["oldPassword"]}</span>
          </Grid>
          <Grid item xs={12} style={{ margin: '15px 0px' }}>
            <Box textAlign="center" style={{ marginTop: '5px' }}>
              <CssTextField
                style={{ width: '350px' }}
                id="newPassword"
                placeholder={"Ingrese nueva contraseña"}
                value={newPassword}
                required
                fullWidth
                autoComplete="current-password"
                type={showNewPassword ? "text" : "password"}
                onChange={onChangeNewPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => { setShowNewPassword(!showNewPassword) }}
                        edge="end"
                        style={{ color: pColor }}
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <span style={{
              color: "red", display: 'flex', flexDirection: 'column',
              alignItems: 'center'
            }}>{errors["newPassword"]}</span>
          </Grid>
          <Grid item xs={12} style={{ margin: '15px 0px' }}>
            <Box textAlign="center" style={{ marginTop: '5px' }}>
              <CssTextField
                style={{ width: '350px' }}
                id="verifyNewPassword"
                placeholder={"Vuelva a ingresar nueva contraseña"}
                value={verifyPassword}
                required
                fullWidth
                autoComplete="current-password"
                type={showVerifyPassword ? "text" : "password"}
                onChange={onChangeVerifyPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => { setShowVerifyPassword(!showVerifyPassword) }}
                        edge="end"
                        style={{ color: pColor }}
                      >
                        {showVerifyPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
            <span style={{
              color: "red", display: 'flex', flexDirection: 'column',
              alignItems: 'center'
            }}>{errors["verifyPassword"]}</span>
          </Grid>
        </Grid>
      </ModalBody>

      <ModalFooter
        confirmText={"Aceptar"}
        onConfirm={handleLogin}
        cancelText={"Cancelar"}
        onCancel={clearModal}
      />
    </Modal>
  )
}

export default ModalPasswordChange

