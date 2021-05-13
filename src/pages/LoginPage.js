import React from 'react';
import {
  makeStyles,
  withStyles,
  CircularProgress,
} from '@material-ui/core';
import {
  Button,
  Container,
  Grid,
  Box,
  Paper,
  OutlinedInput,
  FormControl,
  InputLabel,
  Link,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/api/AuthService';
import { saveUser } from 'utils/common';
import * as qs from 'query-string';

const useStyles = makeStyles(theme => ({
  authBlock: {
    position: 'relative',
    maxHeight: 'calc(100vh - 57px - ' + theme.spacing(8) + 'px)',
    margin: theme.spacing(10, 0),
    display: 'flex',
    flexDirection: 'column',
    '& .titleBlock': {
      display: 'flex',
      alignItems: 'center',
      fontSize: theme.typography.fontSize * 1.85,
      fontWeight: 500,
      padding: theme.spacing(3, 5),
      borderBottom: '1px solid rgba(224, 224, 224, 0.4)',
    },
    '& .contentBlock': {
      padding: theme.spacing(3, 5),
      overflowY: 'auto',
    },
  },
  buttonProgress: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    zIndex: 9,
  },
}));

const styles = theme => ({
  button: {
  	marginTop: 30
  },
  textCenter: {
  	textAlign: 'center'
  },
  form: {
  	padding: '20px'
  }

});

const LoginOutlinedInput = withStyles(theme => ({
  root: {
    fontSize: '1.25rem',
  },
  input: {
    padding: '18.5px 14px',
  },
}))(OutlinedInput);

const LoginPage = props => {

  const { token = ''} = props.location && qs.parse(props.location.search);
  const { appTarget = "", routePush = '' } = props;
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    appTarget: appTarget,
  });
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();
  const classes = useStyles();

  if (typeof window !== "undefined") {
    if (window.Appcues) {
      window.Appcues.start();
      window.Appcues.page();
    }
  }

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  React.useEffect(() => {
    if(token) {
      // auth.renewSession({ Authorization: `Token ${token.split(' ').join('+')}` })
      // .then((res) => {
      //   let { employee={}, assignedShop={}, company={} } = res.data;
      //   saveUser(res.data);
      //   history.push(routePush);
      // })
      // .catch(err => {
      //   console.log("err:",err);
      // });
    } else {
      if(localStorage.getItem('user')){
        const user = JSON.parse(localStorage.getItem('user'));
        if(user && user.company){
          history.push(routePush);
        }
      }
    }
  }, [token]);

  const handleLogin = () => {
    setLoading(true);
    // auth.login(user).then(res => {
    //     const { data } = res;
    //     setLoading(false);
    //     saveUser(data);
    //     history.push(routePush);
    // }).catch(error => {
    //     handleError(error.response && error.response.data && error.response.data.message, 'error');
    //     setLoading(false);
    // });
    history.push(routePush);
  };

  const onInputChange = eve => {
    setUser({
      ...user,
      [eve.target.name]: eve.target.value,
    });
  };

  const keyPressed = event => {
    if (event.key === 'Enter') {
      handleLogin()
    }
  }

  return (

    <Grid container className="auth-container">
      <Grid item xs={12} sm={12} md={6} lg={6} className="rightBlock" style={{marginTop:'250px'}}>
        <Grid className="rightBlockLogin">
          <Grid container direction="row" justify="center">
            <Grid item xs={12}>
              <Paper className={classes.authBlock}>
                <div className="titleBlock">
                  Login
                </div>
                <div className="contentBlock">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl variant="outlined" fullWidth margin="normal">
                        <InputLabel ref={inputLabel} shrink>
                          Email
                        </InputLabel>
                        <LoginOutlinedInput
                          type="email"
                          notched
                          labelWidth={labelWidth}
                          name="email"
                          value={user.email}
                          onChange={onInputChange}
                          onKeyPress={keyPressed}
                          disabled={loading}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl variant="outlined" fullWidth margin="normal">
                        <InputLabel ref={inputLabel} shrink>
                          Passsword
                        </InputLabel>
                        <LoginOutlinedInput
                          type="password"
                          notched
                          labelWidth={labelWidth}
                          name="password"
                          value={user.password}
                          onChange={onInputChange}
                          onKeyPress={keyPressed}
                          disabled={loading}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleLogin}
                        disableElevation
                        fullWidth
                        disabled={loading}
                      >
                        <Box py={0.5} px={3} fontSize={20}>
                          Login
                        </Box>
                        {loading && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

class Login extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return <LoginPage {...this.props} />;
  }
}

export default withStyles(styles)(Login);
