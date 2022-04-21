import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Routes } from 'routes';
import { connect } from 'react-redux';
import 'assets/styles/zendy-app.css';
import 'assets/styles/zendy-app.scss';
import { StylesProvider } from '@material-ui/core/styles';
import { setCurrentSession, logOut, renewToken } from 'services/actions/AuthAction';
import CustomSnackbar from 'components/CustomSnackbar';
import CustomBackdrop from 'components/CustomBackdrop';
import moment from 'moment'
import { withRouter } from 'react-router-dom';
import 'date-fns';
import { getSessionInfo } from 'utils/common';
import { updateStatus } from 'services/actions/UserAction';
import { onHideSnackBar, showBackdrop } from 'services/actions/CustomAction';
import Echo from "laravel-echo";
import config from "config/Config";
import { listActiveChats } from 'services/actions/ChatAction';
import { useHistory } from 'react-router-dom';
import { findUser } from 'services/actions/UserAction';
import sonido from 'assets/sound/notificacion.mp3';
import icon from 'assets/images/logo.png';
import icon2 from 'assets/images/logo2.png';
import { Toaster, toast } from 'react-hot-toast';
import './ZendyAppShell.css'
import { active_pusher, count_chats, count_queries_actives, count_queries_slopes, id_chats } from 'services/actions/CountAction';
import { conteoChats } from 'services/actions/NotificationAction';

window.Pusher = require('pusher-js');

class ZendyAppShell extends Component {

  constructor(props) {
    super(props);

    this.state = {
      estado: false
    }
  }

  componentDidMount() {
    const session = getSessionInfo();
    console.log(this.props)
    let dt = moment();
    dt.subtract(dt.parseZone().utcOffset(), 'minutes');

    if (session && session.token) {
      const userId = session && session.user && session.user.id || "";
      this.props.dispatch(findUser(userId)).then(res => {
        if (res && res.deleted == 1) {
          this.props.dispatch(logOut());
          window.location.href = config.commonHost;
        }
      });
      this.props.dispatch(setCurrentSession(session));
      window.addEventListener('beforeunload', this.alertUser)
      window.addEventListener('unload', this.handleEndConcert)
      
      this.props.dispatch(conteoChats()).then(res => {
        if (res) {
          // this.props.dispatch(count_chats(res.chats));
          this.props.dispatch(count_queries_slopes(res.consultasPendientes));
          this.props.dispatch(count_queries_actives(res.consultasActivas));
        }
      });
    }

   
      console.log(this.props.countRx.active_pusher)
      // if(!this.props.countRx.active_pusher)
      // {
        if (localStorage.getItem('session')) {
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
            // enabledTransports: ['ws', 'wss'], 
            // authEndpoint: config.commonHost + '/api/broadcasting/auth',
            auth: {
              headers: {
                'Access-Control-Allow-Origin': '*',
                Authorization: 'Bearer ' + `${JSON.parse(localStorage.getItem('session')).token || ''}`
              },
            }
          });
    
          const changePestaña = () => {
            document.getElementById('favicon').href = icon;
            document.getElementById('titulo').textContent = "Zendy";
          }
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
            }
            window.onmousemove = stopInterval
          }
    
          // var newExcitingAlerts = (function () {
          //   var msg = "Has recibido un mensaje!";
          //   var timeoutId;
          //   var blink = function () { 
          //     document.getElementById('titulo').textContent = document.getElementById('titulo').textContent == msg  ? 'Zendy' : msg; 
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
    
          const redirectConsulta = (consulta) => {
            // document.location.href = 'http://localhost:3000/consultas/' + consulta
            // this.history.push("/consultas/" + consulta);
          }
          const redirectChat = (chat) => {
            document.location.href = 'http://localhost:3000/chats/' + chat
            // useHistory.push("/chats/" + chat);
            // this.history.push("/chats/" + chat);
          }
          //chats
          const onListActiveChats = term => {
            this.props.dispatch(showBackdrop(true));
            this.props.dispatch(listActiveChats(term, "Vigente", false)).then(res => {
              this.props.dispatch(showBackdrop(false));
            }).catch(err => this.props.dispatch(showBackdrop(false)));
          };
          const goToChat = (chat) => {
           //const history = useHistory();
            // setTerm("");
             console.log(`/chats/${chat}`)
             this.props.history.push(`/chats/${chat}`);
             this.props.dispatch(id_chats(chat));
            onListActiveChats('');
          }

          //fin chats
    
          const user = session && session.user || {};
          window.Echo.private("user." + user.id).listen('notificationMessage', (e) => {
            // console.log(e)
            (e.chatId == localStorage.getItem("currentChatId")) && this.props.history.push("/inicio");
            this.props.dispatch(listActiveChats("", "Vigente", false));
            // this.props.dispatch(count_chats(3));
            audio.stop();
            audio.play();
            newExcitingAlerts();
          })
          
          window.Echo.private("consulta." + user.id).listen('ConsultaNotification', (e) => {
            console.log(e);
            audio.stop();
            audio.play();
            this.props.dispatch(count_queries_slopes(e.contenido.cantidadNoti));
            toast((t) => (
              <div
                className='Contorno'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '700px'
                }}>
                <div
                  // onClick={() => redirectConsulta(e.contenido.idConsulta)}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginRight: '15px'
                  }}>
                  <img src={`https://www.zendy.cl/${e.contenido.avatar}`} width={'50px'} height={'50px'} />
                </div>
                <div
                  // onClick={() => redirectConsulta(e.contenido.idConsulta)}
                  style={{
                    marginRight: '15px',
                    width: '160px'
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
                    padding: '10px',
                    color: 'blue',
                    border: 'none',
                    background: '#fff'
                  }}
                  onClick={() => toast.dismiss(t.id)}>
                  Cerrar
                </button>
              </div>
            )
            );
          })
          //Escucha las cantidad de consultas pendientes NEW2
          window.Echo.private("cantidadNoti." + user.id).listen('ContarConsultas', (e) => {
            this.props.dispatch(count_queries_slopes(e.cantidadNoti));
            console.log(e)
          })
    
          //Rehecho, solo recibe mensajes de chats normales NEW2
          window.Echo.private("mensaje." + user.id).listen('messageNotification', (e) => {
            this.props.dispatch(count_chats(e.contenido.cantidadNoti));
            toast((t) => (
              <div
                className='Contorno'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '700px'
                }}>
                <div
                // onClick={() =>goToChat(e.contenido.idChat)}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginRight: '15px'
                  }}>
                  <img src={`https://www.zendy.cl/${e.contenido.avatar}`} width={'50px'} height={'50px'} />
                </div>
                <div
                  // onClick={() => goToChat(e.contenido.idChat)}
                  style={{
                    marginRight: '15px',
                    width: '160px'
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
                    padding: '10px',
                    color: 'blue',
                    border: 'none',
                    background: '#fff'
                  }}
                  onClick={() => toast.dismiss(t.id)}>
                  Cerrar
                </button>
              </div>
            ));
          })
          //Nuevo solo recibe mensajes de Consultas Activas NEW2 ESTE CANAL PARA REDIRECCION
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
                  width: '700px'
                }}>
                <div
                  // onClick={() => goToChat(e.contenido.idChat)}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginRight: '15px'
                  }}>
                  <img src={`https://www.zendy.cl/${e.contenido.avatar}`} width={'50px'} height={'50px'} />
                </div>
                <div
                  // onClick={() => goToChat(e.contenido.idChat)}
                  style={{
                    marginRight: '15px',
                    width: '160px'
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
                    padding: '10px',
                    color: 'blue',
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
            console.log(e)
            audio.stop();
            audio.play();
            toast((t) => (
              <div
                className='Contorno'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '900px'
                }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginRight: '15px'
                  }}>
                  <img src={`https://www.zendy.cl/${e.contenido.avatar}`} width={'50px'} height={'50px'} />
                </div>
                <div
                  style={{
                    marginRight: '15px',
                    width: '180px'
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
                    padding: '10px',
                    color: 'blue',
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
            console.log(e)
            toast((t) => (
              <div
                className='Contorno'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '900px'
                }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginRight: '15px'
                  }}>
                  <img src={`https://www.zendy.cl/${e.contenido.avatar}`} width={'50px'} height={'50px'} />
                </div>
                <div
                  style={{
                    marginRight: '15px',
                    width: '180px'
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
                    padding: '10px',
                    color: 'blue',
                    border: 'none',
                    background: '#fff'
                  }}
                  onClick={() => toast.dismiss(t.id)}>
                  Cerrar
                </button>
              </div>
            ));
          })

          // this.props.dispatch(active_pusher(true));
        }
      // }
   

  }

  componentWillUnmount() {
    const session = getSessionInfo();
    if (session && session.token) {
      const userId = session && session.user && session.user.id || "";
      this.props.dispatch(findUser(userId)).then(res => {
        if (res && res.deleted) {
          this.props.dispatch(logOut());
          window.location.href = config.commonHost;
        }
      });
    }
    window.removeEventListener('beforeunload', this.alertUser)
    window.removeEventListener('unload', this.handleEndConcert)

  }

  componentDidUpdate(prevProps) {
  }

  alertUser = e => {
    // e.preventDefault()
    e.returnValue = ''
    this.handleEndConcert()
  }


  handleEndConcert = async () => {
    const session = getSessionInfo();
    await this.props.dispatch(updateStatus(session.user.id, '0'))
  }

  render() {
    const { custom = {} } = this.props;
    const { snackbar = {}, backdrop = {} } = custom;
    const isMain = this.useIsMainWindow;
    return (
      <StylesProvider injectFirst>
        <div className="App" style={{ height: "100%" }}>
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
          <Helmet>
            <title id="titulo">Zendy</title>
          </Helmet>
          <Routes
            {...this.props}
          />
          {
            snackbar.show && (
              <CustomSnackbar
                open={snackbar.show || false}
                message={snackbar.message || ""}
                alertType={snackbar.alertType || "info"}
                onClose={(event, reason) => {
                  this.props.dispatch(onHideSnackBar())
                }}
                duration={5000}
              />
            )
          }
          <CustomBackdrop
            open={backdrop.show || false}
          />
        </div>
      </StylesProvider>
    )
  }
}

const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(withRouter(ZendyAppShell));
