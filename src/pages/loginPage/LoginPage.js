import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import ZendyTitle from 'assets/images/ZendyTitle.png';
import { pColor, sColor } from 'assets/styles/zendy-css';
import { loginErp, loginUser } from 'services/actions/LoginAction';
import { listPendingQueries, statusConsult } from 'services/actions/EntryQueryAction';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { getSessionInfo } from 'utils/common';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import * as qs from 'query-string';
import Echo from "laravel-echo";
import config from "config/Config";
import { listActiveChats } from 'services/actions/ChatAction';
import ModalSendPassword from 'components/Modals/ModalSendPassword';
import { findUserByUserName } from 'services/actions/UserAction';
import firebase from 'config/firebase';
import sonido from '../../assets/sound/notificacion.mp3';
import icon from '../../assets/images/logo.png';
import icon2 from '../../assets/images/logo2.png';
import {Toaster, toast} from 'react-hot-toast';
import { active_pusher, count_chats, count_queries_actives, count_queries_slopes } from 'services/actions/CountAction';
import { conteoChats } from 'services/actions/NotificationAction';

window.Pusher = require('pusher-js');

const useStyles = makeStyles((theme) => ({
  loginTitle: {
    color: pColor,
    fontWeight: "bold",
    fontSize: '4rem'
  },
  root: {
    marginBottom: theme.spacing(1)
  },
  image: {
    width: '500px'
  },
  loginBtn: {
    padding: "20px 60px",
    [theme.breakpoints.down('xs')]: {
      width: '65vw',
    },
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


const LoginPage = props => {
  const classes = useStyles();
  // const history = useHistory();

  /* ==========LOGIN================== */

  const { rut_empresa = '', usuario = "", password = "", chat = '', fecha = '', consulta = '' } = props.location && qs.parse(props.location.search);
  // console.log('RUT EMPRESA',rut_empresa, 'USUARIO',usuario , 'PASSWORD',password,'CHAT',chat, 'FECHA', fecha,'CONSULTA', consulta)
  // const { rut_empresa = '', usuario = "", password = "" } = props.location && qs.parse(props.location.search);

  const [loginUsername, setLoginUsername] = React.useState("");
  const [loginRut, setLoginRut] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginPassword, setLoginPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [showModalSendPassword, setModalSendShowPassword] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [tokenNotify, setTokenNotify] = React.useState();

  const session = getSessionInfo();

  useEffect(() => {
    let Tokent_Notificacion=''
    const msg = firebase.messaging();
    msg.requestPermission().then(() => {
      return msg.getToken();
    }).then((data) => {
      Tokent_Notificacion=data
      setTokenNotify(data);
    });
   
    // console.log('RUT EMPRESA: ',atob(rut_empresa) )
    // console.log('USUARIO: ',atob(usuario) )
    // console.log('PASSWORD: ',password)
    // console.log('FECHA: ',atob(fecha) )
    if (usuario && password) {
      var decodeRutEmpresa;
      var decodeUser;
      var decodeFecha;
      var decodePassword;
      var date = new Date();
      date = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
      // console.log(date.getTime());

      try {
        decodeRutEmpresa = atob(rut_empresa);
        decodeUser = atob(usuario);
        decodeFecha = atob(fecha);
        decodePassword = atob(password);
        console.log(decodeUser)

        if (decodeFecha && date > decodeFecha ) {
          decodeUser = 'error';
          props.history.push("/inicio");
        }
        // decodePassword = atob(password);

        const body = {
          rut: decodeRutEmpresa,
          username: decodeUser,
          password: decodePassword
        };
         console.log(Tokent_Notificacion)
        props.dispatch(loginErp(body, Tokent_Notificacion)).then(
          (res) => {
            props.dispatch(conteoChats()).then(res => {
              if(res)
              {
                // this.props.dispatch(count_chats(res.chats));
                props.dispatch(count_queries_slopes(res.consultasPendientes));
                props.dispatch(count_queries_actives(res.consultasActivas));
              }
            });
            // console.log('entre otra vez')
            if (chat) {
              //history.push(`/chats/${chat}`)
              props.history.push(`/chats/${chat}`);
              window.location.reload();
            } else if (consulta) {
              props.dispatch(statusConsult(consulta)).then(
                (res) => {
                  if (res == 'Aceptado') {
                    props.history.push(`/inicio`,1);
                    window.location.reload();
                    props.dispatch(showSnackBar("success", 'La consulta está siendo atendida' || ""));
                  } else {
                    props.history.push(`/consultas/${consulta}`);
                    window.location.reload();
                  }
                }
              )
            } else {
              props.history.push("/inicio",1);
            }
            props.dispatch(showBackdrop(false));
          },
          (error) => {
            props.dispatch(showSnackBar("warning", error.response.data.error || ""));
            props.dispatch(showBackdrop(false));
          }
        );

      } catch (error) {
        console.log('hay error');
        props.history.push("/");
      }

    } else {
      if (session && session.token) {
        props.history.push("/inicio",1);
      } else {
        props.history.push("/");
      }
    }

   

  }, []);

  const handleClose = () => {
    setModalSendShowPassword(!showModalSendPassword)
  }

  const sendPassword = () => {
    setErrors("");
    props.dispatch(findUserByUserName(loginUsername, loginRut)).then(
      (res) => {
        setUserData(res)
        setModalSendShowPassword(!showModalSendPassword)
      },
      (error) => {
        props.dispatch(showSnackBar("warning", "Usuario no encontrado." || ""));
        props.dispatch(showBackdrop(false));
      }
    );
  }

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    //Password
    if (!loginPassword) {
      formIsValid = false;
      errors["password"] = "Contraseña requerida";
    }

    if (!loginUsername) {
      formIsValid = false;
      errors["username"] = "Usuario requerido";
    }

    setErrors(errors);
    return formIsValid;
  }

  const onChangePassword = (e) => {
    const password = e.target.value;
    setLoginPassword(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = {
      username: loginUsername,
      password: loginPassword,
      rut: loginRut
    }

    if (handleValidation()) {
      props.dispatch(showBackdrop(true));
      props.dispatch(loginUser(body, tokenNotify)).then(
        (res) => {
         
          props.dispatch(conteoChats()).then(res => {
            if(res)
            {
              // this.props.dispatch(count_chats(res.chats));
              props.dispatch(count_queries_slopes(res.consultasPendientes));
              props.dispatch(count_queries_actives(res.consultasActivas));
            }
          });
          if(props.countRx.active_pusher)
          {
            console.log(props.countRx.active_pusher)
            window.Echo = new Echo({
              broadcaster: 'pusher',
              key: config.pusherAppKey,
              wsHost: window.location.hostname,
              wsPort: 6001,
              forceTLS: false,
              disableStats: true,
              cluster: config.pusherCluster,
              encrypted: false,
               //comentar para las pruebas locales
              enabledTransports: ['ws', 'wss'],
              authEndpoint: config.commonHost + '/api/broadcasting/auth',
              auth: {
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  Authorization: 'Bearer ' + `${JSON.parse(localStorage.getItem('session')).token || ''}`
                },
              }
            });
            const audio = new Audio(sonido);
            let newExcitingAlerts = () => {
              var tiempo = window.setInterval(BlinkIt, 500);
              var msg = "¡Has recibido un mensaje!";
      
              function BlinkIt() {
                var titulo = document.getElementById('titulo')
                msg = (msg == 'Zendy') ? '¡Has recibido un mensaje!' : 'Zendy'
                titulo.textContent = msg;
                document.getElementById('favicon').href = icon2;
              }
      
              function stopInterval() {
                clearInterval(tiempo)
                document.getElementById('titulo').textContent = "Zendy";
                document.getElementById('favicon').href = icon;
                window.onmousemove = null;
                clearInterval(tiempo)
              }
              window.onmousemove = stopInterval
            }
            // var newExcitingAlerts = (function () {
            //   var msg = "Has recibido un mensaje!";
            //   var timeoutId;
            //   var blink = function () { 
            //     document.getElementById('titulo').textContent = document.getElementById('titulo').textContent == msg ? 'Zendy' : msg; 
            //     document.getElementById('favicon').href = icon2;
            //   };
            //   var clear = function () {
            //     clearInterval(timeoutId);
            //     document.getElementById('titulo').textContent = "Zendy";
            //     document.getElementById('favicon').href = icon;
            //     window.onmousemove = null;
            //     timeoutId = null;
            //   };
            //   return function () {
            //     if (!timeoutId) {
            //         timeoutId = setInterval(blink, 1);
            //         window.onmousemove = clear;
            //     }
            // };
            // }());
  
            const user = res.user || {};
            window.Echo.private("user." + user.id).listen('notificationMessage', (e) => {
              props.dispatch(listActiveChats("", "Vigente", false));
              audio.play();
              newExcitingAlerts();
            });

            var sectionsIds = session && session.role && session.role.sectionIds;
            var idHelpdesk = session && session.user && session.user.idHelpDesk;
            
            window.Echo.private("consulta." + user.id).listen('ConsultaNotification', (e) => {
              this.props.dispatch(listPendingQueries('', sectionsIds.indexOf("3") ? idHelpdesk : "")).then(res => {
                this.props.dispatch(showBackdrop(false));
              }).catch(err => this.props.dispatch(showBackdrop(false)));
              audio.play();
              console.log(e.contenido);
              console.log(this.props.dispatch)
              this.props.dispatch(count_queries_slopes(e.contenido.cantidadNoti));
              toast((t) => (
                <div
                className='Contorno'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width:'700px'
               }}>
                  <div 
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginRight:'15px'
                    }}>
                    <img src={`https://www.zendy.cl/${e.contenido.avatar}`} width={'50px'} height={'50px'} />
                  </div>
                 <div
                 style={{
                  marginRight:'15px',
                  width:'160px'
                }}>
                 <div
                    >
                  <p className='text'>{e.contenido.usuario}</p>
                  </div>
                  <div
                    >
                  <p className='text'>{e.contenido.mensaje}</p>
                  </div>
                 </div>
                  <button 
                  style={{
                    borderLeft: '1px solid #000',
                    padding:'10px',
                    color:'blue',
                    border: 'none',
                    background: '#fff'
                  }}
                  onClick={() => toast.dismiss(t.id)}>
                    Cerrar
                  </button>
                </div>
              ));
            })
            // window.Echo.private("cantidadNoti." + user.id).listen('ContarConsultas', (e) => {
            //   props.dispatch(count_queries_slopes(e.cantidadNoti));
            //   console.log(e)
            // })

            window.Echo.private("cantidadNoti." + user.id).listen('ContarConsultas', (e) => {
              props.dispatch(count_queries_slopes(e.cantidadNoti));
              this.props.dispatch(listPendingQueries('', sectionsIds.indexOf("3") ? idHelpdesk : "")).then(res => {
                this.props.dispatch(showBackdrop(false));
              }).catch(err => this.props.dispatch(showBackdrop(false)));
              console.log(e)
            })
      
            //Rehecho, solo recibe mensajes de chats normales NEW
        window.Echo.private("mensaje." + user.id).listen('messageNotification', (e) => {
          console.log(e)
          toast((t) => (
            <div
            className='Contorno'
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width:'700px'
           }}>
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginRight:'15px'
                }}>
                <img src={`https://www.zendy.cl/${e.contenido.avatar}`} width={'50px'} height={'50px'} />
              </div>
             <div
             style={{
              marginRight:'15px',
              width:'160px'
            }}>
             <div
                >
              <p className='text'>{e.contenido.usuario}</p>
              </div>
              <div
                >
              <p className='text'>{e.contenido.mensaje}</p>
              </div>
             </div>
              <button 
              style={{
                borderLeft: '1px solid #000',
                padding:'10px',
                color:'blue',
                border: 'none',
                background: '#fff'
              }}
              onClick={() => toast.dismiss(t.id)}>
                Cerrar
              </button>
            </div>
          ));
        })
  
        //Nuevo solo recibe mensajes de Consultas Activas NEW
        window.Echo.private("mensajeActivo." + user.id).listen('messageConsulta', (e) => {
          console.log(e)
          this.props.dispatch(count_queries_actives(e.contenido.cantidadNoti));
          toast((t) => (
            <div
            className='Contorno'
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width:'700px'
           }}>
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginRight:'15px'
                }}>
                <img src={`https://www.zendy.cl/${e.contenido.avatar}`} width={'50px'} height={'50px'} />
              </div>
             <div
             style={{
              marginRight:'15px',
              width:'160px'
            }}>
             <div
                >
              <p className='text'>{e.contenido.usuario}</p>
              </div>
              <div
                >
              <p className='text'>{e.contenido.mensaje}</p>
              </div>
             </div>
              <button 
              style={{
                borderLeft: '1px solid #000',
                padding:'10px',
                color:'blue',
                border: 'none',
                background: '#fff'
              }}
              onClick={() => toast.dismiss(t.id)}>
                Cerrar
              </button>
            </div>
          ));
        })
  
            window.Echo.private("aceptarConsulta." + user.id).listen('AceptarConsulta', (e) => {
              audio.play();
              console.log(e.contenido);
              toast((t) => (
                <div
                className='Contorno'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width:'900px'
               }}>
                  <div 
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginRight:'15px'
                    }}>
                    <img src={`https://www.zendy.cl/${e.contenido.avatar}`} width={'50px'} height={'50px'} />
                  </div>
                 <div
                 style={{
                  marginRight:'15px',
                  width:'180px'
                }}>
                 <div
                    >
                  <p><strong>CONSULTA ACEPTADA</strong></p>
                  </div>
                  <div
                    >
                  <p>{e.contenido.mensaje}</p>
                  </div>
                 </div>
                  <button 
                  style={{
                    borderLeft: '1px solid #000',
                    padding:'10px',
                    color:'blue',
                    border: 'none',
                    background: '#fff'
                  }}
                  onClick={() => toast.dismiss(t.id)}>
                    Cerrar
                  </button>
                </div>
              ));
            })
  
            window.Echo.private("cierreConsulta." + user.id).listen('CierreConsulta', (e) => {
              console.log(e.contenido);
              toast((t) => (
                <div
                className='Contorno'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width:'900px'
               }}>
                  <div 
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginRight:'15px'
                    }}>
                    <img src={`https://www.zendy.cl/${e.contenido.avatar}`} width={'50px'} height={'50px'} />
                  </div>
                 <div
                 style={{
                  marginRight:'15px',
                  width:'180px'
                }}>
                 <div>
                  <p><strong>CONSULTA FINALIZADA</strong></p>
                  </div>
                  <div
                    >
                  <p>{e.contenido.mensaje}</p>
                  </div>
                 </div>
                  <button 
                  style={{
                    borderLeft: '1px solid #000',
                    padding:'10px',
                    color:'blue',
                    border: 'none',
                    background: '#fff'
                  }}
                  onClick={() => toast.dismiss(t.id)}>
                    Cerrar
                  </button>
                </div>
              ));
            })
             props.dispatch(active_pusher(false));
          }
          
          props.history.push("/inicio",1);
          // window.location.reload();
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
      <Grid container className="all-heigth custom-login">
        <Grid className="md-show" item md={2} />
        <Grid item xs={12} md={4} className="login-logo">
          <img src={ZendyTitle} className={classes.image} />
          {/* <p className="login-text" style={{ fontSize:"50px", fontWeight:"bold", color: pColor, marginBottom: "5px"}}>
            ZENDY
          </p> */}
          <p className="login-text" style={{ fontSize: "26px", fontWeight: "bolder" }}>
            Zendy te ayuda a comunicarte con tus colaboradores, clientes, proveedores. Chat online, Mesa de Ayuda, Canal de Ventas.
          </p>
        </Grid>
        <Grid className="md-show" item md={1} />
        <Grid container item xs={12} md={3} style={{ textAlign: "center", justifyContent: "center", alignItems: "center" }}>
          <Paper elevation={3} className={classes.rootPaper}>
            <form style={{ padding: "20px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CssTextField
                    variant="outlined"
                    fullWidth
                    id="username"
                    placeholder="Usuario"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={(event) => { setLoginUsername(event.target.value); }}
                    value={loginUsername}
                    onKeyPress={event => { event.key === 'Enter' && handleLogin(event) }}
                    label="Nombre de Usuario"
                  />
                  <span style={{ color: "red" }}>{errors["username"]}</span>
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    variant="outlined"
                    fullWidth
                    id="rut"
                    placeholder="RUT de la empresa"
                    name="rut"
                    autoComplete="rut"
                    onChange={(event) => { setLoginRut(event.target.value) }}
                    value={loginRut}
                    onKeyPress={event => { event.key === 'Enter' && handleLogin(event) }}
                    label="RUT de la empresa"
                  />
                  {/* <span style={{color: "red"}}>{errors["rut"]}</span> */}
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    variant="outlined"
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
                            style={{ color: pColor }}
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
                    label="Contraseña"
                  />
                  <span style={{ color: "red" }}>{errors["password"]}</span>
                </Grid>
                <Grid item xs={12}>
                  <span onClick={() => { sendPassword() }} style={{ textAlign: "center", fontSize: "16px", color: pColor, cursor: "pointer" }}>¿Has olvidado la contraseña?</span>
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
        <Grid className="md-show" item md={2} />
        <ModalSendPassword
          {...props}
          open={showModalSendPassword}
          handleClose={handleClose}
          userData={userData}
        />
      </Grid>
    </>
  );
}

//export default LoginPage;
const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(withRouter(LoginPage));