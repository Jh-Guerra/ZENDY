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
import { onHideSnackBar } from 'services/actions/CustomAction';
import Echo from "laravel-echo";
import config from "config/Config";
import { listActiveChats } from 'services/actions/ChatAction';
import { useHistory } from 'react-router-dom';
import {findUser } from 'services/actions/UserAction';
import sonido from 'assets/sound/notificacion.mp3';
import icon from 'assets/images/logo.png';
import icon2 from 'assets/images/logo2.png';
import {Toaster, toast} from 'react-hot-toast';
import './ZendyAppShell.css'

window.Pusher = require('pusher-js');

class ZendyAppShell extends Component {

  constructor(props) {
    super(props);

    this.state = {
      estado:false
    }
  }

  componentDidMount() {
    const session = getSessionInfo();

    let dt = moment();
    dt.subtract(dt.parseZone().utcOffset(), 'minutes');

    if (session && session.token) {
      const userId = session && session.user && session.user.id || "";
      this.props.dispatch(findUser(userId)).then(res => {
        if(res && res.deleted == 1){
          this.props.dispatch(logOut());
          window.location.href = config.commonHost;
        }
      });
      this.props.dispatch(setCurrentSession(session));
      window.addEventListener('beforeunload', this.alertUser)
      window.addEventListener('unload', this.handleEndConcert)
    }

    if(localStorage.getItem('session')){
      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: config.pusherAppKey,
        wsHost: window.location.hostname,
        wsPort: 6001,
        forceTLS: false,
        disableStats: true,
        cluster: config.pusherCluster,
        encrypted: false,
        enabledTransports: ['ws', 'wss'],
        authEndpoint: config.commonHost + '/api/broadcasting/auth',
        auth: {
          headers: {
            'Access-Control-Allow-Origin': '*',
              Authorization: 'Bearer ' + `${JSON.parse(localStorage.getItem('session')).token || ''}`
          },
        }
      });

      const changePestaña = ()=>{
        document.getElementById('favicon').href = icon;
        document.getElementById('titulo').textContent = "Zendy";
      }

      const user = session && session.user || {};
      window.Echo.private("user." + user.id).listen('notificationMessage', (e) => {
        (e.chatId == localStorage.getItem("currentChatId")) && this.props.history.push("/inicio");
        this.props.dispatch(listActiveChats("", "Vigente", false));
        const audio = new Audio(sonido);
        audio.play();
        document.getElementById('favicon').href = icon2;
        document.getElementById('titulo').textContent = "Haz recibido un mensaje";
        setInterval(()=>{
          changePestaña()
        },9000)
      })
      window.Echo.private("consulta." + user.id).listen('ConsultaNotification', (e) => {
        console.log(e.contenido);
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

      window.Echo.private("mensaje." + user.id).listen('messageNotification', (e) => {
        console.log(e.contenido);
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
        // toast.custom((t) => (
        //   <div
        //     className={`${
        //       t.visible ? 'animate-enter' : 'animate-leave'
        //     } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        //   >
        //     <div className="flex-1 w-0 p-4">
        //       <div className="flex items-start">
        //         <div className="flex-shrink-0 pt-0.5">
        //           <img
        //             className="h-10 w-10 rounded-full"
        //             src={`https://www.zendy.cl/${e.contenido.avatar}`}
        //             alt=""
        //             width="2.5rem"
        //           />
        //         </div>
        //         <div className="ml-3 flex-1">
        //           <p className="text-sm font-medium text-gray-900">
        //             {e.contenido.usuario}
        //           </p>
        //           <p className="mt-1 text-sm text-gray-500">
        //             {e.contenido.mensaje}
        //           </p>
        //         </div>
        //       </div>
        //     </div>
        //     <div className="flex border-l border-gray-200">
        //       <button
        //         onClick={() => toast.dismiss(t.id)}
        //         className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        //       >
        //         Close
        //       </button>
        //     </div>
        //   </div>
        // ))
      })
    }
     
    }

  componentWillUnmount() {
    const session = getSessionInfo();
    if (session && session.token) {
      const userId = session && session.user && session.user.id || "";
      this.props.dispatch(findUser(userId)).then(res => {
        if(res && res.deleted){
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
  e.preventDefault()
  e.returnValue = ''
  this.handleEndConcert()
}
 handleEndConcert = async () => {
  const session = getSessionInfo();
  await this.props.dispatch(updateStatus(session.user.id, '0'))
}

  render() {
    const { custom={} } = this.props;
    const { snackbar={}, backdrop={} } = custom;
    const isMain = this.useIsMainWindow;
    return (
      <StylesProvider injectFirst>
        <div className="App" style={{height:"100%"}}>
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
                onClose={(event, reason) => {this.props.dispatch(onHideSnackBar())
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
