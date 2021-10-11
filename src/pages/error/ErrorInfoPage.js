import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ChatAvatar from "pages/main_page/Components/ChatAvatar";
import Box from '@material-ui/core/Box';
import { confirmError, deleteError, fakeError, findError, listErrors, listErrorsByUser } from 'services/actions/ErrorAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { useHistory } from 'react-router';
import config from "../../config/Config";
import defaultImage from 'assets/images/defaultImage.png';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@material-ui/core';
import { getImageProfile, getSessionInfo, isClientUser } from 'utils/common';
import GetAppIcon from '@material-ui/icons/GetApp';
import CustomModal from 'components/Modals/common/CustomModal';
import ModalDelete from 'components/Modals/ModalDelete';
import ModalFakeError from 'components/Modals/ModalFakeError';
import ModalConfirmError from 'components/Modals/ModalConfirmError';
import moment from 'moment';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import { pColor,successButtonColor } from 'assets/styles/zendy-css';
import CustomTable from 'components/CustomTable';


const useStyles = makeStyles((theme) => ({
  reportBtn: {
    fontSize: '15px',
    width: '200px',
    height: '50px',
    borderRadius: '20px',
    backgroundColor: successButtonColor,
    color: '#ffff'
  },
  fontError: {
    color: '#000000',
    marginTop: '20px',
    alignItems: 'center',
    fontSize: '20px',
  },
  fontDescription: {
    color: '#000000',
    marginTop: '20px',
    alignItems: 'center',
    fontSize: '17px',
  },
  headerName: {
    width: '100%',
    backgroundColor: pColor,
    color: 'white',
    height: '130px',
    justifyContent: 'center'
  }
}));

const columns = [
  { type: 'text', field: 'reason', label: 'Asunto' },
  { type: 'text', field: 'description', label: 'Descripcion', format: (row) => row.description && row.description.length > 70 ? row.description.substring(0,67) + "..." : row.description },
  { type: 'text', field: 'created_at', label: 'Fecha de Envio', format: (row) => moment(row.created_at || "").format("DD/MM/YYYY")},
];

const ErrorInfoPage = props => {
  const session = getSessionInfo();
  const classes = useStyles();
  const history = useHistory();
  const [modulo, setModulo] = React.useState('');
  const [error, setError] = React.useState({});
  const [showReportedErrorModal, setShowReportedErrorModal] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);
  const [showFakeError, setShowFakeError] = React.useState(false);
  const [showConfirmError, setShowConfirmError] = React.useState(false);
  const [showNewCompanyNotification, setShowNewCompanyNotification] = React.useState(false);
  const isClient = isClientUser(session.role);
  const isTheCreator = ((session.user && session.user.id) == (error.user && error.user.id)) ? true : false

  React.useEffect(() => {
    if (props.location.pathname) {
      const pathArray = props.location.pathname.split("/");
      const errorId = pathArray && pathArray[2];
      if (errorId) {
        onGetErrorData(errorId);
      } else {
        history.push("/");
      }
    }
  }, [props.location.pathname]);

  const showDetails = row => {
    row.id && history.push("/notificaciones/"+row.id);
  };

  const onGetErrorData = (errorId) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(findError(errorId)).then(res => {
      if(res.error){
        setError(res.error || {});
        props.dispatch(showBackdrop(false));
      }  
    }).catch(err => {
       history.push("/");
       props.dispatch(showBackdrop(false));
       props.dispatch(showSnackBar("error", err.response.data ? err.response.data.error : "ERROR")); 
    });
  }

  const onDelete = () => {
    props.dispatch(showBackdrop(true));
    props.dispatch(deleteError(error.id)).then(res => {
      setShowModalDelete(false)
      setError({})
      props.dispatch(showSnackBar("success", res && res.success || ""));
      props.dispatch(showBackdrop(false));
      if (isClient) {
        props.dispatch(listErrorsByUser(""));
      } else {
        props.dispatch(listErrors(""));
      }
      history.push("/inicio");
    }).catch(error => {
      props.dispatch(showBackdrop(false));
    });
  }

  const onFakeError = () => {
    props.dispatch(showBackdrop(true));
    props.dispatch(fakeError(error.id)).then(res => {
      setShowFakeError(false)
      setError({})
      props.dispatch(showSnackBar("success", res && res.success || ""));
      props.dispatch(showBackdrop(false));
      if (isClient) {
        props.dispatch(listErrorsByUser(""));
      } else {
        props.dispatch(listErrors(""));
      }
      history.push("/inicio");
    }).catch(error => {
      props.dispatch(showBackdrop(false));
    });
  }

  const onConfirmError = () => {
    props.dispatch(showBackdrop(true));
    props.dispatch(confirmError(error.id)).then(res => {
      setError(res.error)
      setShowConfirmError(false)
      props.dispatch(showSnackBar("success", "Error Aceptado"));
      props.dispatch(showBackdrop(false));
      if (isClient) {
        props.dispatch(listErrorsByUser(""));
      } else {
        props.dispatch(listErrors(""));
      }
    }).catch(error => {
      props.dispatch(showBackdrop(false));
    });
  }

  const handleChange = (event) => {
    setModulo(event.target.value);
  };

  const showEditError = () => {
    setShowReportedErrorModal(true)
  }

  const showDeletedError = () => {
    setShowModalDelete(true)
  }

  const ShowFakeError = () => {
    setShowFakeError(true)
  }

  const ShowConfirmError = () => {
    setShowConfirmError(true)
  }

  const ShowNewCompanyNotification = () => {
    setShowNewCompanyNotification(true)
  }

  const openImage = () => {
    if(error.image){
      const imagePath = config.api + error.image;
      window.open(imagePath, "_blank")
    }
  }

  return (
    <>
      {/* <CssBaseline /> */}
      <Grid container className="all-heigth">
        <Grid item xs={12} className="report-form">
          <Grid item xs={12} className="top-header"></Grid>
          {
            error && error.id && (
              <>
                <Grid item xs={12} style={{ textAlign: "right", marginTop: '20px' }}>
                  <span className={classes.fontError} style={{ fontWeight: 'bold', fontStyle: 'italic', alignItems: 'flex-end' }} >Estado: </span>
                  {
                    !isClient ?
                      <span className={classes.fontError} style={{ alignItems: 'flex-center', marginRight: "8vh" }}>{(error.status == "Pendiente") ? "Pendiente" : "Aceptado"}</span> :
                      <span className={classes.fontError} style={{ alignItems: 'flex-center', marginRight: "8vh" }}>{error.fake ? "El error reportado ha considerado como falso" : ((error.status == "Pendiente") ? "Pendiente" : ((error.status == "Resuelto") ? "El error notificado ya fue resuelto" : "Aceptado"))}</span>
                  }

                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={6} container spacing={0} direction="column" alignItems="flex-start" justify="flex-start">
                    <Box style={{ margin: '2vh 8vh' }}>
                      <Grid item xs={12} style={{ textAlign: "left", marginTop: '15px' }}>
                        <span className={classes.fontError} style={{ fontWeight: 'bold', fontStyle: 'italic', alignItems: 'flex-end', marginTop: '10px' }} >Nombre de Empresa: </span>
                        <span className={classes.fontError} style={{ alignItems: 'flex-start', marginTop: '10px' }}>{error.company && error.company.name || ""}</span>
                      </Grid>

                      <Grid item xs={12} style={{ textAlign: "left", marginTop: '15px' }}>
                        <span className={classes.fontError} style={{ fontWeight: 'bold', fontStyle: 'italic', alignItems: 'flex-end' }} >Usuario: </span>
                        <span className={classes.fontError} style={{ alignItems: 'flex-start', marginTop: '10px' }}>{error.company && error.user.firstName + " " + error.user.lastName || ""}</span>
                      </Grid>

                      <Grid item xs={12} style={{ textAlign: "left", marginTop: '15px' }}>
                        <span className={classes.fontError} style={{ fontWeight: 'bold', fontStyle: 'italic', alignItems: 'flex-end' }} >Fecha de Reporte: </span>
                        <span className={classes.fontError} style={{ alignItems: 'flex-start', marginTop: '10px' }}>{(error.created_at) && moment(error.created_at).format("DD/MM/YYYY") || ""}</span>
                      </Grid>

                      <Grid item xs={12} style={{ textAlign: "left", marginTop: '15px' }}>
                        <span className={classes.fontError} style={{ fontWeight: 'bold', fontStyle: 'italic', alignItems: 'flex-end' }} >Modulo: </span>
                        <span className={classes.fontError} style={{ alignItems: 'flex-start', marginTop: '10px' }}>{error.module && error.module.name || ""}</span>
                      </Grid>

                      <Grid item xs={12} style={{ textAlign: "left", marginTop: '15px' }}>
                        <span className={classes.fontError} style={{ fontWeight: 'bold', fontStyle: 'italic', alignItems: 'flex-end' }} >Asunto: </span>
                        <span className={classes.fontError} style={{ alignItems: 'flex-start', marginTop: '10px' }}>{error.reason || ""}</span>
                      </Grid>

                      <Grid item xs={12} style={{ textAlign: "left", marginTop: '15px' }}>
                        <span className={classes.fontError} style={{ fontWeight: 'bold', fontStyle: 'italic', alignItems: 'flex-end' }} >Descripción: </span>
                        <span className={classes.fontDescription} style={{ alignItems: 'flex-start', marginTop: '10px' }}>{
                          error.description && error.description.length > 200 ? error.description.substring(0,197) + "..." : error.description
                        }</span>
                      </Grid>

                      {
                        error.file && (
                          <Grid item xs={6} style={{ textAlign: "left", marginTop: '15px' }}>
                            <span className={classes.fontError} style={{ fontWeight: 'bold', fontStyle: 'italic', alignItems: 'flex-end' }} >Archivo Adjunto:</span>
                            <p style={{textAlign:"flex-start"}}>
                              <Button variant="contained"
                                style={{ marginLeft: "0px" }}
                                href={(config.api + error.file)} target="_blank"
                                endIcon={<GetAppIcon />}
                                color="primary"
                              >
                                Descargar
                              </Button>
                            </p>
                          </Grid>
                        )
                      }

                      <Grid container direction="row" style={{ marginTop: '20px' }}>
                        {
                          (isClient && isTheCreator && error.status == "Pendiente" && !error.fake) && (
                            <>
                              <Grid item xs={6}>
                                <Button className={classes.reportBtn} onClick={() => { showEditError() }}>Editar</Button>
                              </Grid>
                              <Grid item xs={6}>
                                <Button className={classes.reportBtn} onClick={() => { showDeletedError() }}>Eliminar</Button>
                              </Grid>
                            </>
                          )
                          
                        }
                        {
                          (!isClient && error.received) ? (
                            <Grid item>
                              <Button className={classes.reportBtn} onClick={() => { ShowNewCompanyNotification() }}>Notificar Error Reportado</Button>
                            </Grid>
                          ) : null
                        }
                        {
                          (!isClient && !error.received) ? (
                            <>
                              <Grid item xs={6}>
                                <Button className={classes.reportBtn} onClick={() => { ShowConfirmError() }}>Confirmar error</Button>
                              </Grid>
                              <br />
                              <Grid item xs={6}>
                                <Button className={classes.reportBtn} onClick={() => { ShowFakeError() }}>Reportar error falso</Button>
                              </Grid>
                            </>
                          ) : null
                        }
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box>
                      <Avatar
                        variant="rounded"
                        style={{ height: "60%", width: "60%", justifyContent:'flex-end', alignItems:'flex-end', marginLeft:"30%", marginTop:"5%", cursor: error.image ? "pointer" : "default" }}
                        src={error.image ? (config.api + error.image) : defaultImage}
                        onClick={openImage}
                      />
                    </Box>
                  </Grid>
                </Grid>
                {
                  (error.notifications && error.notifications.length > 0) ?
                    <Grid item xs={12}>
                      <Box display='flex' flexDirection='column' style={{ height: "100%", width: "100%", textAlign: "left",  padding: '0vh 9vh' }}>
                        <span className={classes.fontError} style={{ fontWeight: 'bold' }} >{error.notifications && error.notifications.length == 1 ? "Notificación" : "Notificaciones"}</span>
                        <CustomTable columns={columns} rows={error.notifications} onRowClick={showDetails}/>
                      </Box>
                    </Grid> : null
                }
              </>
            )          }
        </Grid>
      </Grid>
      <CustomModal
        customModal={'ModalReportedErrors'}
        open={showReportedErrorModal}
        handleClose={() => setShowReportedErrorModal(false)}
        error={error}
        onGetErrorData={onGetErrorData}
      />
      <CustomModal
        customModal="ModalNewCompanyNotification"
        open={showNewCompanyNotification}
        idCompany={error.idCompany}
        idError={error.id}
        handleClose={() => { setShowNewCompanyNotification(false); }}
        onGetErrorData={onGetErrorData}
      />
      <ModalConfirmError
        open={showConfirmError}
        handleClose={() => setShowConfirmError(false)}
        onConfirm={onConfirmError}
      />
      <ModalFakeError
        open={showFakeError}
        handleClose={() => setShowFakeError(false)}
        onConfirm={onFakeError}
      />
      <ModalDelete
        open={showModalDelete}
        title="Eliminar Error Reportado"
        handleClose={() => setShowModalDelete(false)}
        onDelete={onDelete}
      />
    </>
  );
}

export default ErrorInfoPage;