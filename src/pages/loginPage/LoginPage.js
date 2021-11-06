import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LogoZendy from 'assets/images/Zendy-logo.jpg';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { pColor, sColor } from 'assets/styles/zendy-css';
import  {loginErp, loginUser}  from 'services/actions/LoginAction';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { getSessionInfo } from 'utils/common';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import * as qs from 'query-string';
import Echo from "laravel-echo";
import config from "config/Config";
import { listActiveChats } from 'services/actions/ChatAction';

window.Pusher = require('pusher-js');

const useStyles = makeStyles((theme) => ({
  loginTitle: {
    color: pColor,
    fontWeight: "bold",
    fontSize: '4rem'
  },
  loginInput: {
    width: '25vw',  
  },
  root: {
    marginBottom: theme.spacing(1)
  },
  image:{
    backgroundImage: 'url('+LogoZendy+')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '180px',
    borderRadius: '50%',
    width: '250px',
    height:'250px',
    display: 'flex',
  },
  loginBtn: {
    padding: "20px 60px",
    width: '25vw',
    [theme.breakpoints.down('xs')]: {
      width: '65vw',
    },
  },
  rootPaper: {
    marginTop: theme.spacing(25),
    marginRight: theme.spacing(30),
    marginLeft: theme.spacing(30),
    marginBottom: theme.spacing(25),
    maxWidth: theme.spacing(65),
    maxHeight: theme.spacing(65),
  },
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


const LoginPage = props => {
  const classes = useStyles();
  //const history = useHistory();

/* ==========LOGIN================== */
  const { rut_empresa = '', usuario="", password="" } = props.location && qs.parse(props.location.search);

  const [loginEmail, setLoginEmail] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginPassword, setLoginPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [searchTimeout, setSearchTimeout] = React.useState(null);

  const session = getSessionInfo();

  useEffect(()=>{
    if(rut_empresa && usuario && password){
      var decodeRutEmpresa;
      var decodeUser;
      var decodePassword;

      try {
        decodeRutEmpresa = atob(rut_empresa);
        decodeUser = atob(usuario);
        decodePassword = atob(password);

        const body = {
          ruc: decodeRutEmpresa,
          email: decodeUser,
          password: decodePassword
        };

        props.dispatch(loginErp(body)).then(
          (res) => {
            props.history.push("/inicio");
            props.dispatch(showBackdrop(false));
          },
          (error) => {
           props.dispatch(showSnackBar("warning", error.response.data.error || ""));
           props.dispatch(showBackdrop(false));
          }
        ); 

      } catch (error){
        props.history.push("/");
      }

    }else{
      if(session && session.token){
        props.history.push("/inicio");
      }else{
        props.history.push("/");
      }
    }
  }, []);

  const handleValidation =()=>{
    let errors = {};
    let formIsValid = true;

    //Password
    if(!loginPassword){
       formIsValid = false;
       errors["password"] = "Contraseña requerida";
    }

    //Email
    if(!loginEmail){
       formIsValid = false;
       errors["email"] = "Usuario o Email requerido";
    }

   setErrors(errors);
   return formIsValid;
}

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setLoginEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setLoginPassword(password);
  };

  const body = {
    email: loginEmail,
    password: loginPassword

  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if(handleValidation()){
      props.dispatch(showBackdrop(true));
      props.dispatch(loginUser(body)).then(
       (res) => {
        window.Echo = new Echo({
          broadcaster: 'pusher',
          key: config.pusherAppKey,
          cluster: config.pusherCluster,
          encrypted: true,
          wsHost: "zendy.cl",
          wsPort: 6001,
          forceTLS: true,
          enabledTransports: ['ws'],
          authEndpoint: config.api + 'broadcasting/auth',
          disableStats: false,
          auth: {
            headers: {
                Authorization: 'Bearer ' + `${JSON.parse(localStorage.getItem('session')).token || ''}`
            },
          }
        });

        const user = res.user || {};
        window.Echo.private("user." + user.id).listen('notificationMessage', (e) => {
          props.dispatch(listActiveChats("", "Vigente"))
        })

         props.history.push("/inicio");
         props.dispatch(showBackdrop(false));
       },
       (error) => {
        props.dispatch(showSnackBar("warning", error.response.data.error || ""));
        props.dispatch(showBackdrop(false));
       }
     ); 
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid container className="all-heigth">
        <Grid item md={2}/>
        <Grid item md={4} className="login-logo">
          {/* <img src={LogoZendy} className={classes.image}/>          */}
          <p style={{ fontSize:"50px", fontWeight:"bold", color: pColor, marginBottom: "5px"}}>
            ZENDY
          </p>
          <p style={{ fontSize:"20px", fontWeight:"bolder"}}>
            Zendy te ayuda a comunicarte con tus colaboradores, clientes, proveedores. Chat online, Mesa de Ayuda, Canal de Ventas.
          </p>
        </Grid>
        <Grid container item md={4} style={{textAlign:"center", justifyContent:"center", alignItems:"center"}}>
            <Paper elevation={3} className={classes.rootPaper}>       
              <form style={{padding: "20px"}}>         
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CssTextField
                      className={classes.loginInput}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      placeholder="Usuario o email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      onChange={onChangeEmail}
                      value={loginEmail}
                      onKeyPress={event => { event.key === 'Enter' && handleLogin(event) }}
                    />
                    <span style={{color: "red"}}>{errors["email"]}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <CssTextField
                      className={classes.loginInput}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      placeholder="Contraseña"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => { setShowPassword(!showPassword) }}
                              edge="end"
                              style={{color: pColor}}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      autoComplete="current-password"
                      value={loginPassword}
                      onChange={onChangePassword}
                      onKeyPress={event => { event.key === 'Enter' && handleLogin(event) }}
                    />
                    <span style={{color: "red"}}>{errors["password"]}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <span style={{textAlign:"center", fontSize:"16px", color: pColor, cursor:"pointer"}}>¿Olvidaste tu contraseña?</span>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      className={classes.loginBtn + " custom-button"}
                      onClick={handleLogin}
                    >
                      Iniciar Sesión
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid item md={2}/>        
    </Grid>
    </>
  );
}

//export default LoginPage;
const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(withRouter(LoginPage));