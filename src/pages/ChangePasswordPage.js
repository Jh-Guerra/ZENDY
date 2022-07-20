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
import { connect } from 'react-redux';
import { getSessionInfo } from "utils/common";
import { Link, withRouter } from 'react-router-dom';
import { updatePassword } from 'services/actions/UserAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import * as qs from 'query-string';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import { CircularProgress } from '@material-ui/core';
import CustomModal from 'components/Modals/common/CustomModal';
import { loginErp } from 'services/actions/LoginAction';
import firebase from 'config/firebase';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { VerifyCompanies, RequestRegisterNewCompanies} from 'services/actions/CompanyAction';
import { VerifyUser } from 'services/actions/UserAction';
import  {updateChangePasswordByErp}  from 'services/actions/UserAction';


const ChangePasswordPage = props => {

  const { rut_empresa = '', usuario = "", password = ""} = props.location && qs.parse(props.location.search);
  const [ChangePassExit, setChangePassExit] = React.useState(true);
  const [timeInterval, setTimeInterval] = React.useState(9)
  const [loading, setLoading] = React.useState(false);
  const [loadingSavePassword, setLoadingSavePassword] = React.useState(false);
  const [loadingCompany, setLoadingCompany] = React.useState(false);
  const [Redireccion,setRedireccion] = React.useState(6);//6 por defecto
  const [tokenNotify, setTokenNotify] = React.useState();
  const [dataUser, setDataUser] = React.useState();
  const [dataEntity, setDataEntity] = React.useState();
  const [statusPassword,setStatusPassword] = React.useState(false);
  const [solicitudCompany,setSolicitudCompany] = React.useState(0);
  // const [showModal, setShowModal] = React.useState(true);
//   const session = getSessionInfo();
//   const user = session && session.user || {};

//   React.useEffect(() => {
// console.log(password);
// console.log(atob(password))
// setOldPassword('zendy2022')
// setNewPassword(atob(password))
// setVerifyPassword(atob(password))
//   }, [])

  const [showPasswordActual, setShowPasswordActual] = React.useState(false);
//   const [showPasswordNew, setShowPasswordNew] = React.useState(false);
//   const [showPasswordRepitNew, setShowPasswordRepitNew] = React.useState(false);

  const [oldPassword, setOldPassword] = React.useState("");
//   const [newPassword, setNewPassword] = React.useState("");
//   const [verifyPassword, setVerifyPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const onChangeOldPassword = (e) => {
    const oldPassword = e.target.value;
    setOldPassword(oldPassword);
  };

//   const onChangeNewPassword = (e) => {
//     const newPassword = e.target.value;
//     setNewPassword(newPassword);
//   };

//   const onChangeVerifyPassword = (e) => {
//     const verifyPassword = e.target.value;
//     setVerifyPassword(verifyPassword);
//   };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    //Password
    if (!oldPassword) {
      formIsValid = false;
      errors["oldPassword"] = "Contraseña requerida";
    }
    setErrors(errors);
    return formIsValid;
  }

const CompararAndEnviarPassword = () =>{
  if (handleValidation()) {
    setLoadingSavePassword(true)
    // setTimeout(() => {
      ChangePasswordByErp(dataUser)  
    //  }, 1000);
  }
}
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

const RegistrerCompany = () =>
{
  console.log(solicitudCompany)
  if(solicitudCompany==1)
  {
    let decodeRutEmpresa = atob(rut_empresa);
    const body = {
      ruc: decodeRutEmpresa,
    }; 
      props.dispatch(RequestRegisterNewCompanies(body)).then(
        (res) => {
          if(res.status)
          {
            setRedireccion(4)
          }else
          {
            props.dispatch(showSnackBar("success", "Su empresa ya solicitó acceso" || ""));
          }
        },
        (error) => {
          // props.dispatch(showSnackBar("warning", "Usuario no encontrado." || ""));
          //props.dispatch(showBackdrop(false));
        }
      );
  }
  if(solicitudCompany==2)
  {
    console.log('userrr')
    let decodeRutEmpresa = atob(rut_empresa);
    let decodeUser = atob(usuario);
  
    const body = {
      ruc: decodeRutEmpresa,
      username: decodeUser,
    }; 
      props.dispatch(RequestRegisterNewCompanies(body)).then(
        (res) => {
          console.log(res);
          if(res.status)
          {
            setRedireccion(4)
          }else
          {
            props.dispatch(showSnackBar("success", "ya has registrado tu solicitud anteriormente" || ""));
          }
        },
        (error) => {
          // props.dispatch(showSnackBar("warning", "Usuario no encontrado." || ""));
          //props.dispatch(showBackdrop(false));
        }
      );
  }
 
}

const [progress, setProgress] = React.useState(10);
const session = getSessionInfo();

  React.useEffect(() => {
    VerifiCompanies()
  }, []);

  const VerifiCompanies = () => {
    if(Redireccion==6)
    {
      setSolicitudCompany(1)
      // setTimeout(() => {
      if (rut_empresa) {
        props.dispatch(VerifyCompanies(atob(rut_empresa))).then(
          (res) => {
            if (res.status==true) {//true
              setDataEntity(res.empresa)
              VerifiUser()
            }else{
              setRedireccion(3)
            }
          },
          (error) => {
            props.dispatch(showSnackBar("warning", error.response.data.error || ""));
            props.dispatch(showBackdrop(false));
          }
        );
      }
    //  }, 1000);
    }
    
  }

  const ChangePasswordByErp = (user)=>{
    const body = {
      password: 'zendy2022',
      newPassword: oldPassword,
      encryptPassword: atob(password)
    }

    props.dispatch(updateChangePasswordByErp(user.id, body)).then( res => {
      console.log(res)
      if(res.estado==false)
      {
        setLoadingSavePassword(false)
        setStatusPassword(true);
        props.dispatch(showSnackBar('error', 'La contraseña ingresada no es igual que ERP'));
      }
      else if(res.estado==true)
      {
        console.log('TRUEEEE')
        setRedireccion(2)
        changeAutoLogin()
      }
      // props.dispatch(showSnackBar('success', 'Cambio de contraseña exitosa.'));
    }
    ).catch(err => {
      props.dispatch(showSnackBar("error", err.response.data ? err.response.data.error : "ERROR"));
    });  
  } 

  const VerifiUser = () => {
    setSolicitudCompany(2)
    props.dispatch(VerifyUser(atob(usuario), atob(rut_empresa))).then(
      (res) => {
        setDataUser(res.data)
        if(res.estado=='Contraseña no cambiada')
        {
         setRedireccion(1)
         setTimeout(() => {
          setRedireccion(7)
          // ChangePasswordByErp(res.data)
        }, 1000);
        
        }
        else if(res.estado=='Contraseña cambiada')
        {
          setRedireccion(5)
          // setTimeout(() => {
            let Tokent_Notificacion = ''
            const msg = firebase.messaging();
            msg.requestPermission().then(() => {
              return msg.getToken();
            }).then((data) => {
              Tokent_Notificacion = data
              setTokenNotify(data);
            });
            if (usuario && password) {
              console.log('entree')
              var decodeRutEmpresa;
              var decodeUser;
              var decodePassword;
              try {
                decodeRutEmpresa = atob(rut_empresa);
                decodeUser = atob(usuario);
                decodePassword = atob(password);
    
                const body = {
                  rut: decodeRutEmpresa,
                  username: decodeUser,
                  password: decodePassword
                };
                props.dispatch(loginErp(body, Tokent_Notificacion)).then(
                  (res) => {
                    props.history.push("/inicio",1);
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
                setLoading(false);
              }
            }
            else {
              if (session && session.token) {
                props.history.push("/inicio",1);
              } else {
                props.history.push("/");
              }
            }
          // }, 1000);
          
        }
        else
        {
          //redireeccion
          setRedireccion(3)
        }
      },
      (error) => {
        props.dispatch(showSnackBar("warning", error.response.data.error || ""));
        props.dispatch(showBackdrop(false));
      }
    );
  }


  // const SaveRegistrer = () =>{
  //   setLoadingCompany(true);
  //   setTimeout(() => {
  //     setLoadingCompany(false);
  //     setRedireccion(4)
  //   }, 9000);
  // }


  const changeAutoLogin = () => {
    if (Redireccion == 2) {
      console.log('entre')
      setLoading(true);
      // setTimeout(() => {
        let Tokent_Notificacion = ''
        const msg = firebase.messaging();
        msg.requestPermission().then(() => {
          return msg.getToken();
        }).then((data) => {
          console.log("token", data)
          Tokent_Notificacion = data
          setTokenNotify(data);
        });
        if (usuario && password) {
          console.log('entree')
          var decodeRutEmpresa;
          var decodeUser;
          var decodeFecha;
          var decodePassword;
          try {
            decodeRutEmpresa = atob(rut_empresa);
            decodeUser = atob(usuario);
            decodePassword = atob(password);

            const body = {
              rut: decodeRutEmpresa,
              username: decodeUser,
              password: decodePassword
            };
            props.dispatch(loginErp(body, Tokent_Notificacion)).then(
              (res) => {
                props.history.push("/inicio",1);
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
            setLoading(false);
          }

        }
        else {
          if (session && session.token) {
            props.history.push("/inicio",1);
          } else {
            props.history.push("/");
          }
        }
        // setLoading(false);
      // }, 1000);
    }
  }

  const EstadoView = (estado) => {
    switch (estado) {
      case 1:
        return(
          <div className='formulario'
          style={{
            padding: '35px',
            borderRadius: '15px',
            background: '#fff',
            width: '40%',
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
            Su cuenta zendy se está creando por favor espere...
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
         )
      case 2:
        return(
          <div className='formulario'
          style={{
            padding: '35px',
            borderRadius: '15px',
            background: '#fff',
            width: '40%',
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
            Gracias por esperar, tu registro fue exitoso, podrás acceder a zendy con tus credenciales de Erp
          </p>
          <div className='formulario-imagen'
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '30px',
            }}>
            <img src={ZendyTitle} width={'300px'} height={'150px'} />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              style={{
                width: '50%',
                padding: '15px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                position: 'relative'
              }}
              disabled={loading}
              onClick={()=>{changeAutoLogin()}}
            >
              <span>Realizando login automatico espere porfavor</span>
              <span
                style={{
                  width: '20%',
                  marginLeft: '4px',
                  padding: '6px 5px',
                  borderRadius: '100%',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#fff'
                }}>
                {loading &&
                  <CircularProgress
                    size={24}
                    color={'secondary'}
                    sx={{
                      position: 'absolute',
                      top: '10%',
                      left: '10%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />}
              </span>
            </button>
          </div>
        </div>
        )
      case 3:
        return(
          <div className='formulario'
          style={{
            padding: '35px',
            borderRadius: '15px',
            background: '#fff',
            width: '40%',
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
              {solicitudCompany==1?'Su compañia no esta registrada, por favor Envianos una solicitud para que sea parte de Zendy':
              `Su compañia ${dataEntity.name.toLowerCase()} es parte de zendy pero su Usuario no está registrado, por favor envianos una solicitud para que sea parte de Zendy`}
          </p>
          <div className='formulario-imagen'
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '30px',
            }}>
            <img src={ZendyTitle} width={'300px'} height={'150px'} />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <p
            className='formulario-title'
            style={{
              textAlign: 'center',
              fontSize: '20px',
              fontFamily: 'sans-serif',
              textAlign:'center'
            }}>
              click Aqui
              
          </p> 
          <div
          style={{
            marginLeft:'10px',
            marginTop:'22px'
          }}
          >
          <ArrowDownwardIcon/>
          </div>
          
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              style={{
                width: '50%',
                padding: '15px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                // background:'#DD843A'
              }}
              onClick={()=>{RegistrerCompany()}}
            >
              <span >{loadingCompany?`Procesando su Solicitud Espere un Momento`:`Enviar solicitud de registro`}</span>
              <span
                style={{
                  width: '20%',
                  marginLeft: '4px',
                  padding: '6px 5px',
                  borderRadius: '100%', 
                  border: 'none',
                  cursor: 'pointer',
                  color: '#fff',
                }}>
                {loadingCompany &&
                  <CircularProgress
                    size={24}
                    color={'secondary'}
                    sx={{
                      position: 'absolute',
                      top: '10%',
                      left: '10%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />}
              </span>
            </button>
          </div>
        </div>
        )
      case 4:
        return(
          <div className='formulario'
          style={{
            padding: '35px',
            borderRadius: '15px',
            background: '#fff',
            width: '40%',
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
            Su solicitud ha sido enviada, se lo atenderá lo mas pronto posible
          </p>
          <div className='formulario-imagen'
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '30px',
            }}>
            <img src={ZendyTitle} width={'300px'} height={'150px'} />
          </div>
          {/* <LinearProgress /> */}
          <p
            className='formulario-title'
            style={{
              paddingBottom: '30px',
              fontWeight: 700,
              textAlign: 'center',
              fontSize: '20px',
              fontFamily: 'sans-serif'
            }}>
              ¡Muchas gracias!
          </p>
        </div>
        )
      case 5:
        return (
          <div className='formulario'
            style={{
              padding: '35px',
              borderRadius: '15px',
              background: '#fff',
              width: '40%',
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
              Bienvenido Nuevamente a Zendy, Estamos Listos para ayudarlo
            </p>
            <div className='formulario-imagen'
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '30px',
              }}>
              <img src={ZendyTitle} width={'300px'} height={'150px'} />
            </div>
            <p
              className='formulario-title'
              style={{
                paddingBottom: '30px',
                fontWeight: 600,
                textAlign: 'center',
                fontSize: '20px',
                fontFamily: 'sans-serif'
              }}>
              Iniciando Sesion...
            </p>
            <LinearProgress />
          </div>
        )
      case 6:
        return (
          <div className='formulario'
            style={{
              padding: '35px',
              borderRadius: '15px',
              background: '#fff',
              width: '40%',
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
                Bienvenido a Zendy
            </p>
            <p
              className='formulario-title'
              style={{
                paddingBottom: '30px',
                fontWeight: 600,
                textAlign: 'center',
                fontSize: '20px',
                fontFamily: 'sans-serif'
              }}>
              Zendy te ayuda a comunicarte con tus colaboradores, clientes, proveedores. Chat online, Mesa de Ayuda, Canal de Ventas.
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
        )
      case 7:
        return (
          <div className='formulario'
            style={{
              padding: '35px',
              borderRadius: '15px',
              background: '#fff',
              width: '40%',
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
                {statusPassword?'No coincide con la contraseña de ERP porfavor vuelva a ingresar':'Ingrese su contraseña de ERP'}
              
            </p>
            <TextField
            placeholder='Contraseña de ERP'
            // name={value.name}
            type={showPasswordActual ? "text" : "password"}
            onChange={onChangeOldPassword}
            value={oldPassword}
            style={{
              width: '100%',
              padding: '10px',
              boxShadow: 'rgb(0 0 0 / 4%) 5px 1px 3px',
              borderRadius: '10px' //opcional
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => { setShowPasswordActual(!showPasswordActual) }}
                    edge="end"
                    style={{ color: pColor }}
                  >
                    {showPasswordActual ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <span style={{
              color: "red", display: 'flex', flexDirection: 'column',
              alignItems: 'center'
            }}>{errors["oldPassword"]}</span>

            <div className='formulario-imagen'
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '30px',
              }}>
              <img src={ZendyTitle} width={'300px'} height={'150px'} />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button
                style={{
                  width: '50%',
                  padding: '15px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              disabled={loadingSavePassword}
 
                onClick={()=>CompararAndEnviarPassword()}
              >
                <span>Continuar creando su Perfil </span>
                <span
                  style={{
                    width: '20%',
                    marginLeft: '4px',
                    padding: '6px 5px',
                    borderRadius: '100%',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#fff'
                  }}>
                  {loadingSavePassword &&
                    <CircularProgress
                      size={24}
                      color={'secondary'}
                      sx={{
                        position: 'absolute',
                        top: '10%',
                        left: '10%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                      }}
                    />}
                </span>
              </button>
            </div>
          </div>
        )
    }
  }
  return (
    <div id='section-formulario'
      style={{
        height: '100vh',
        display: 'flex',
        background: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      
  {EstadoView(Redireccion)}
    </div>
  )
}

const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(withRouter(ChangePasswordPage));