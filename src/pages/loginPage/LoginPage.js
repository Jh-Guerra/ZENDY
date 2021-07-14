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
import  {loginUser}  from 'services/actions/LoginAction';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


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
    height: '100vh',
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
  //const history = useHistory();

/* ==========LOGIN================== */

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState();
  const [errors, setErrors] = React.useState({});

  const handleValidation =()=>{
    let errors = {};
    let formIsValid = true;

    //Password
    if(!password){
       formIsValid = false;
       errors["password"] = "Contraseña requerida";
    }

    //Email
    if(!email){
       formIsValid = false;
       errors["email"] = "Email requerido";
    }

    if(typeof email !== "undefined"){
       let lastAtPos = email.lastIndexOf('@');
       let lastDotPos = email.lastIndexOf('.');

       if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = "Email no es valido";
        }
   } 

   setErrors(errors);
   return formIsValid;
}

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const body = {
    email: email,
    password: password

  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if(handleValidation()){
       
      props.dispatch(loginUser(body)).then(
       (res) => {
         console.log("res", res)
         props.history.push("/inicio");
       },
       (error) => {
         const resMessage =
           (error.response &&
             error.response.data &&
             error.response.data.message) ||
           error.message ||
           error.toString();
  
         setMessage(resMessage);
         alert(error.response.data.error)
       }
     ); 
    }else{
       //alert("Form has errors.")
    }
  };

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
                onChange={onChangeEmail}
                value={email}
              />
              <span style={{color: "red"}}>{errors["email"]}</span>
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
                value={password}
                onChange={onChangePassword}
              />
               <span style={{color: "red"}}>{errors["password"]}</span>
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.loginBtn}
                onClick={handleLogin}
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

//export default LoginPage;
const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(withRouter(LoginPage));