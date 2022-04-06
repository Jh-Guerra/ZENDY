import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ZendyTitle from 'assets/images/ZendyTitle.png';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { IconButton,Box,Typography} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { pColor, sColor } from 'assets/styles/zendy-css';
import { syncUser } from 'services/actions/ParticipantAction';
import { connect } from 'react-redux';
import { getSessionInfo } from "utils/common";
import { Link, withRouter } from 'react-router-dom';
import { updatePassword } from 'services/actions/UserAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import * as qs from 'query-string';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';



function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const ChangePasswordPage = props => {


  const {password = "" } = props.location && qs.parse(props.location.search);
  const [active]
//   const session = getSessionInfo();
//   const user = session && session.user || {};

//   React.useEffect(() => {
// console.log(password);
// console.log(atob(password))
// setOldPassword('zendy2022')
// setNewPassword(atob(password))
// setVerifyPassword(atob(password))
//   }, [])

//   const [showPasswordActual, setShowPasswordActual] = React.useState(false);
//   const [showPasswordNew, setShowPasswordNew] = React.useState(false);
//   const [showPasswordRepitNew, setShowPasswordRepitNew] = React.useState(false);

//   const [oldPassword, setOldPassword] = React.useState("");
//   const [newPassword, setNewPassword] = React.useState("");
//   const [verifyPassword, setVerifyPassword] = React.useState("");
//   const [errors, setErrors] = React.useState({});

//   const onChangeOldPassword = (e) => {
//     const oldPassword = e.target.value;
//     setOldPassword(oldPassword);
//   };

//   const onChangeNewPassword = (e) => {
//     const newPassword = e.target.value;
//     setNewPassword(newPassword);
//   };

//   const onChangeVerifyPassword = (e) => {
//     const verifyPassword = e.target.value;
//     setVerifyPassword(verifyPassword);
//   };

//   const handleValidation = () => {
//     let errors = {};
//     let formIsValid = true;

//     //Password
//     if (!oldPassword) {
//       formIsValid = false;
//       errors["oldPassword"] = "Contraseña requerida";
//     }

//     //new Password
//     if (!newPassword) {
//       formIsValid = false;
//       errors["newPassword"] = "Contraseña requerida";
//     }

//     if (!verifyPassword) {
//       formIsValid = false;
//       errors["verifyPassword"] = "Contraseña requerida";
//     }
//     if (newPassword != verifyPassword) {
//       formIsValid = false;
//       errors["verifyPassword"] = "Las contraseñas no coinciden";
//     }
//     setErrors(errors);
//     return formIsValid;
//   }

//   const SincronizacionUsuarios = () => {
//     props.dispatch(syncUser()).then(
//       (res) => {
//         console.log(res);
//       },
//       (error) => {
//         // props.dispatch(showSnackBar("warning", "Usuario no encontrado." || ""));
//         //props.dispatch(showBackdrop(false));
//       }
//     );
//   }

//   const body = {
//     password: oldPassword,
//     encrypted_password: newPassword

//   }
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (handleValidation()) {
//       props.dispatch(updatePassword(user.id, body)).then(res => {
//         props.dispatch(showSnackBar('success', 'Cambio de contraseña exitosa.'));
//       }
//       ).catch(err => {
//         props.dispatch(showSnackBar("error", err.response.data ? err.response.data.error : "ERROR"));
//       });
//     }
//   };
const [progress, setProgress] = React.useState(10);

  // React.useEffect(() => {
  //   console.log(progress)
  //   const timer = setInterval(() => {
  //   console.log(progress)
  //       setProgress((prevProgress) => (prevProgress == 100 ? 10 : prevProgress + 10));
  //   }, 1000);
  //   return () => {
  //     console.log(timer)
  //     clearInterval(timer);
  //   };
  // }, []);

  return (
    <div id='section-formulario'
      style={{
        height: '100vh',
        display: 'flex',
        background: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
      }}>

<div className='formulario'
        style={{
          padding: '35px',
          borderRadius: '15px',
          background: '#fff',
          width: '35%',
          border: '0px',
          boxShadow: 'rgb(0 0 0 / 30%) 6px 6px 6px 6px',
        }}>
           <p
            className='formulario-title'
            style={{
              paddingBottom: '30px',
              fontWeight: 600,
              textAlign: 'center',
              fontSize: '20px',
              fontFamily: 'sans-serif'
            }}>
             Su cuenta zendy se está creando porfavor espere...
          </p>
          <div className='formulario-imagen'
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '30px',
            }}>
            <img src={ZendyTitle} width={'300px'} height={'150px'} />
          </div>
      <LinearProgress />
    </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(withRouter(ChangePasswordPage));