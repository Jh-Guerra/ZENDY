import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LogoZendy from 'assets/images/Zendy-logo.jpg';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '98vh',
    backgroundColor: '#15418D',
    marginBottom: theme.spacing(1)
  },
  side: {
    backgroundColor: '#15418D',
  },
  image:{
    backgroundImage: 'url('+LogoZendy+')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '200px',
    borderRadius: '50%',
    width: '93%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(19, 2)
  },
  paper: {
    margin: theme.spacing(18, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '80%',
    marginTop: theme.spacing(8),
  },
  submit: {
    margin: theme.spacing(6, 33, 2),
  },
}));

const LoginPage = props => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Grid container className={classes.root}>
        <Grid item xs={8} component={Paper}>
          <Grid item xs={12} className={classes.side} />
          <div className={classes.paper}>
            <Typography variant="h4">
              LOGIN
            </Typography>
            <form className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                placeholder="Usuario o email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
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
                    <InputAdornment position="start">
                      <VpnKeyIcon />
                    </InputAdornment>
                  ),
                }}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                variant="contained"
                color="default"
                className={classes.submit}
              >
                INICIAR SESION
              </Button>
            </form>
          </div>    
      </Grid>
      <Grid item xs={4}>
        <img src={LogoZendy} className={classes.image}/>
      </Grid>
    </Grid>
    </>
  );
}

export default LoginPage;