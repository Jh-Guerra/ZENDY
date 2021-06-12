import React from 'react';
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
import { pColor, sColorL } from 'assets/styles/zendy-css';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  loginTitle: {
    color: pColor,
    fontWeight: "bold",
    fontSize: '4rem'
  },
  loginInput: {
    width: '40vw',
    [theme.breakpoints.down('xs')]: {
      width: '65vw',
    },
  },
  root: {
    height: '98vh',
    marginBottom: theme.spacing(1)
  },
  image:{
    backgroundImage: 'url('+LogoZendy+')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '200px',
    borderRadius: '50%',
    width: '55%',
    height:'33%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(19, 13.1),
    border: sColorL + ' 15px solid',
  },
  paper: {
    margin: theme.spacing(18, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    margin: "0px"
  },
  form: {
    width: '80%',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  loginBtn: {
    margin: theme.spacing(6, 0, 2),
    fontSize:'15px',
    minWidth:'201px',
    height:'50px',
    borderRadius:'10px',
    fontWeight:'900',
    fontSize:'1.2rem',
    backgroundColor: pColor,
    color: "white"
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
  const history = useHistory();

  const logIn = () => {
    history.push("/test-view");
  }

  return (
    <>
      <CssBaseline />
      <Grid container className={classes.root}>
        <Grid container alignItems="center" justify="center" item xs={4} className="login-logo">
          <img src={LogoZendy} className={classes.image}/>
        </Grid>
        <Grid item xs={8} className={`login-form`} component={Paper}>
          <Grid item xs={12} />
          <div className={classes.paper}>
            <Typography variant="h4" className={classes.loginTitle}>
              LOGIN
            </Typography>
            <form className={classes.form}>
              <CssTextField
                className={`login-input ${classes.loginInput}`}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="login-icon">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                placeholder="Usuario o email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <CssTextField
                className={`login-input ${classes.loginInput}`}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                placeholder="Contraseña"
                type="password"
                id="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" className="login-icon">
                      <VpnKeyIcon />
                    </InputAdornment>
                  ),
                }}
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.loginBtn}
                onClick={logIn}
              >
                INICIAR SESION
              </Button>
            </form>
          </div>    
      </Grid>
    </Grid>
    </>
  );
}

export default LoginPage;