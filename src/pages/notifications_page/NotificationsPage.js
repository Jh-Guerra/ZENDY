import React, { Component } from 'react';
import { Grid, Typography, Box, Button, Avatar } from "@material-ui/core";
import CustomTable from 'components/CustomTable';
import CustomButton from 'components/CustomButton';
import { dangerColor, successButtonColor, pColor } from 'assets/styles/zendy-css';
import moment from 'moment';
import ModalDelete from 'components/Modals/ModalDelete';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { useHistory } from 'react-router';
import { deleteNotification, findNotification, updateNotification } from 'services/actions/NotificationAction';
import { listNotificationViewed, registerViewed } from 'services/actions/NotificationViewAction';
import CustomModal from 'components/Modals/common/CustomModal';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { checkPermission, getCustomRoleName, getSessionInfo } from 'utils/common';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import config from "../../config/Config";
import defaultImage from 'assets/images/defaultImage.png';

const columns = [
  { type: 'text', field: 'name', label: 'Nombre', format: (row) => `${row.firstName} ${row.lastName}` },
  { type: 'text', field: 'rol', label: 'Rol', format: (row) => getCustomRoleName(row.rol) },
  { type: 'text', field: 'companyName', label: 'Empresa' },
  { type: 'text', field: 'email', label: 'Correo' },
  { type: 'text', field: 'viewedDate', label: 'Visto', align: 'center', format: (row) => row.viewedDate ? moment(row.viewedDate).format("DD/MM/YYYY") : "" },
];

const useStyles = makeStyles((theme) => ({
  fontNotification: {
    color: '#000000',
    marginTop: '20px',
    alignItems: 'center',
    fontSize: '20px',
  },
  fontReason: {
    color: '#000000',
    marginTop: '20px',
    alignItems: 'center',
    fontSize: '35px',
  },
}));

const NotificationsPage = (props) => {
  const { } = props;

  const session = getSessionInfo();
  const history = useHistory();
  const classes = useStyles();

  const [ showNewCompanyNotification, setShowNewCompanyNotification ] = React.useState(false);
  const [ showNewCompaniesNotification, setShowNewCompaniesNotification ] = React.useState(false);
  const [ showNotificationTo, setShowNotificationTo] = React.useState(false);
  const [ showNotificationCompanyTo, setShowNotificationCompanyTo] = React.useState(false);
  const [ isViewed, setIsViewed ] = React.useState(false);
  const [ showModalDelete, setShowModalDelete] = React.useState(false);
  const [ notification, setNotification ] = React.useState({});
  const [ notificationsViewed, setNotificationsViewed ] = React.useState([]);
  const [ loading, setLoading ] = React.useState(false);

  React.useEffect(() => {
    if(props.location.pathname){
      const pathArray = props.location.pathname.split("/");
      const notificationId = pathArray && pathArray[2];
      const isViewByUser = pathArray && pathArray[3] == "viewed" || false;
      setIsViewed(isViewByUser);

      if(isViewByUser){
        onSaveViewed(notificationId);
      }

      if(notificationId){
        onGetData(notificationId);
      }else{
        history.push("/");
      }
    }
  }, [props.location.pathname]);

  const onGetData = (notificationId) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(findNotification(notificationId)).then(res => {
      setNotification(res.notification|| {}); 
      props.dispatch(showBackdrop(false));
    }).catch(err => {
      history.push("/inicio"); 
      props.dispatch(showBackdrop(false));
    });

    onListNotificationViews(notificationId);
  };

  const onListNotificationViews = (notificationId) => {
    props.dispatch(showBackdrop(true));  
    props.dispatch(listNotificationViewed(notificationId)).then(res => {
      setNotificationsViewed(res || []);
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));
  };

  const onSaveViewed = (notificationId) => {
    props.dispatch(registerViewed(notificationId)).then(res => {
      onListNotificationViews(notificationId);
      props.dispatch(showBackdrop(false));
    }).catch(err => {
      history.push("/inicio");
      props.dispatch(showBackdrop(false))
    });
  }

  const onOpenEditNotification = () => {
    if(notification.companiesNotified.length > 1){
      setShowNewCompaniesNotification(true);
    }else{
      setShowNewCompanyNotification(true);
    }
  }

  const onOpenModalDelete = () => {
    setShowModalDelete(true);
  }

  const onDelete = async () => {
    props.dispatch(showBackdrop(true));
    props.dispatch(deleteNotification(notification && notification.id))
      .then(res => {
        setNotification({});
        setShowModalDelete(false);

        props.dispatch(showSnackBar("error", "Notificación eliminada"));
        props.dispatch(showBackdrop(false));
        history.push("/inicio");

      }).catch(error => {
        props.dispatch(showBackdrop(false));
        console.log('error', error);
      });
  };

  const openNotificationTo = () => {
    if(notification.companiesNotified.length == 1){
      setShowNotificationTo(true);
    }else{
      setShowNotificationCompanyTo(true);
    }
  };

  const openImage = () => {
    if(notification.image){
      const imagePath = config.api + notification.image;
      window.open(imagePath, "_blank")
    }
  }

  return (
    <Grid container>
      <Grid item xs={12} className="top-header"></Grid>
  
      {
        notification.id && ((notification.idCompany && (notification.idCompany == session.user.idCompany) && checkPermission(session, "createCompanyNotifications")) || (!notification.idCompany && checkPermission(session, "createAdminNotifications"))) && (
          <Grid item xs={12} style={{padding: "0px 20px"}}>
            <p style={{textAlign:'start'}}>
              <CustomButton
                variant="contained"
                startIcon={<EditIcon />}
                color={successButtonColor}
                onClick={onOpenEditNotification}
                style={{marginRight: "10px"}}
              >
                Editar Notificación
              </CustomButton>
              <CustomButton
                variant="contained"
                startIcon={<DeleteIcon />}
                color={dangerColor}
                onClick={onOpenModalDelete}
              >
                Eliminar Notificación
              </CustomButton>
            </p>
          </Grid>
        )
      }

      <Grid container item xs={12}>
          <Grid item xs={6} container spacing={0} direction="column" alignItems="flex-start" justify="flex-start">
                <Box style={{ margin: '5vh 3vh' }}>
                  <Grid item xs={12} style={{ textAlign: "left", marginTop: '15px' }}>
                    <span className={classes.fontReason} style={{ fontWeight: 'bold', fontStyle: 'italic', alignItems: 'flex-end', marginTop: '10px' }}>Asunto: </span>
                    <span className={classes.fontReason} style={{ alignItems: 'flex-start', marginTop: '10px' }}>{notification.reason || ""}</span>
                  </Grid>

                  <Grid item xs={12} style={{ textAlign: "left", marginTop: '30px' }}>
                    <span className={classes.fontNotification} style={{ fontWeight: 'bold', fontStyle: 'italic', alignItems: 'flex-end' }}>Descripción: </span>
                    <span className={classes.fontNotification} style={{ alignItems: 'flex-start', marginTop: '10px' }}>{
                      "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo Contenido aquí, contenido aquí. Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de Lorem Ipsum va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).".length > 200 ? "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo Contenido aquí, contenido aquí. Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de Lorem Ipsum va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).".substring(0,197) + "..." : "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo Contenido aquí, contenido aquí. Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de Lorem Ipsum va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo)."
                    }</span>
                  </Grid>
                  {
                    notification.file &&
                    <Grid item xs={12} style={{ textAlign: "left", marginTop: '15px' }}>
                      <span className={classes.fontNotification} style={{ fontWeight: 'bold', fontStyle: 'italic', alignItems: 'flex-end' }}>Archivo Adjunto:</span>
                      <p style={{textAlign:"flex-start"}}>
                        <Button variant="contained"
                          href={(config.api + notification.file)} target="_blank"
                          endIcon={<GetAppIcon />}
                          color="primary"
                        >
                          Descargar
                        </Button>
                      </p>
                    </Grid>
                  }
                </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Avatar
                variant="rounded"
                style={{ height: "60%", width: "60%", justifyContent:'flex-end', alignItems:'flex-end', marginLeft:"37%", marginTop:"10%", cursor: notification.image ? "pointer" : "default" }}
                src={notification.image ? (config.api + notification.image) : defaultImage}
                onClick={openImage}
              />
            </Box>
          </Grid>
      </Grid>

      {
        notification.id && ((notification.idCompany && (notification.idCompany == session.user.idCompany) && checkPermission(session, "createCompanyNotifications")) || (!notification.idCompany && checkPermission(session, "createAdminNotifications"))) && (
          <Grid item xs={12} style={{padding: "0px 20px"}}>
            
            <p style={{textAlign:"right"}}>
              <CustomButton
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  color={successButtonColor}
                  onClick={openNotificationTo}                 
              >
                Notificar a
              </CustomButton>
            </p>
            <br />
            <CustomTable 
              columns={columns}
              rows={notificationsViewed || []}
              onRowClick={() => {}}
              loading={loading}
            />
          </Grid>
        )
      }
      <ModalDelete
        open={showModalDelete}
        title="Eliminar Notificación"
        handleClose={() => { setShowModalDelete(false); }}
        onDelete={onDelete}
      />
      <CustomModal 
        customModal="ModalNewCompaniesNotification"
        open={showNewCompaniesNotification}
        notification={notification}
        handleClose={() => { setShowNewCompaniesNotification(false); }}
        onSaveForm={(updatedNotification) => {
          setShowNewCompaniesNotification(false);
          setNotification(updatedNotification || {});
        }}
      />
      <CustomModal
        customModal="ModalNewCompanyNotification"
        open={showNewCompanyNotification}
        notification={notification}
        handleClose={() => { setShowNewCompanyNotification(false); }}
        onSaveForm={(updatedNotification) => {
          setShowNewCompanyNotification(false);
          setNotification(updatedNotification || {});
        }}
      />
      <CustomModal
        customModal="ModalNotificationTo"
        open={showNotificationTo}
        handleClose={() => {
          setShowNotificationTo(false);
        }}
        notificationsViewed={notificationsViewed}
        notification={notification}
        onListNotificationViews={onListNotificationViews}
        session={session}
      />
      <CustomModal
        customModal="ModalNotificationCompanyTo"
        open={showNotificationCompanyTo}
        handleClose={() => {
          setShowNotificationCompanyTo(false);
        }}
        notificationsViewed={notificationsViewed}
        notification={notification}
        onListNotificationViews={onListNotificationViews}
        session={session}
      />
    </Grid>
  );

}

export default NotificationsPage;
