import React, { Component } from 'react';
import { Grid, Typography, Box, Button, Avatar } from "@material-ui/core";
import CustomTable from 'components/CustomTable';
import { dangerColor, successButtonColor, pColor } from 'assets/styles/zendy-css';
import moment from 'moment';
import ModalDelete from 'components/Modals/ModalDelete';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { useHistory } from 'react-router';
import { deleteNotification, findNotification } from 'services/actions/NotificationAction';
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
import ThemeError from 'components/ThemeSettings/ThemeError';

const OneDayAgo= (date) => {
  const today = Math.round(new Date().getTime() / 1000);
  const rest = today - date;
  const oneDayAgo = (rest / 60 / 60 / 24).toFixed(2);
  return oneDayAgo >= 1;
}

const columns = [
  { type: 'text', field: 'name', label: 'Nombre', format: (row) => `${row.firstName} ${row.lastName}` },
  { type: 'text', field: 'rol', label: 'Rol', format: (row) => getCustomRoleName(row.rol) },
  { type: 'text', field: 'email', label: 'Correo' },
  { type: 'text', field: 'viewedDate', label: 'Visto', align: 'center', format: (row) => row.viewedDate ? (OneDayAgo(row.viewedDate) ? moment(row.viewedDate*1000).format("DD/MM/YYYY") : moment(row.viewedDate*1000).format('LT')) : " " },
];

const useStyles = makeStyles((theme) => ({
  fontNotification: {
    color: '#000000',
    marginTop: '20px',
    alignItems: 'center',
    fontSize: '18px',
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
      <Grid item xs={12} className="top-header" style={{height:"64px"}}></Grid>
      {
        notification.id && ((notification.idCompany && (notification.idCompany == session.user.idCompany) && checkPermission(session, "createCompanyNotifications")) || (!notification.idCompany && checkPermission(session, "createAdminNotifications"))) && (
          <Grid item xs={12} style={{padding: "0px 20px"}}>
            <p style={{textAlign:'start'}}>
              <Button
                onClick={onOpenEditNotification}
                variant="contained"
                color="secondary"
                startIcon={<EditIcon />}
                style={{marginRight: "10px"}}
              >
                Editar
              </Button>
              <ThemeError>
                <Button
                  onClick={onOpenModalDelete}
                  variant="contained"
                  color="primary"
                  startIcon={<DeleteIcon />}
                >
                  Eliminar
                </Button>
              </ThemeError>
              
            </p>
          </Grid>
        )
      }

      <Grid item xs={12}>
        <Typography variant="h4" component="h4" className="page-title">
          {notification.reason || ""}
        </Typography>
      </Grid>

      <Grid container item xs={12} style={{padding: "0px 20px"}}>
          <Grid item xs={6} container spacing={0} direction="column" alignItems="flex-start" justify="flex-start">
                <Box style={{ margin: '5vh 3vh' }}>
                  <Grid item xs={12} style={{ textAlign: "left", marginTop: '15px' }}>
                    <span className={classes.fontNotification} style={{ fontWeight: 'bold', alignItems: 'flex-end', marginTop: '10px' }}>Asunto: </span>
                    <span className={classes.fontNotification} style={{ alignItems: 'flex-start', marginTop: '10px' }}>{notification.reason || ""}</span>
                  </Grid>

                  <Grid item xs={12} style={{ textAlign: "left", marginTop: '15px' }}>
                    <span className={classes.fontNotification} style={{ fontWeight: 'bold', alignItems: 'flex-end' }}>Descripción: </span>
                    <span className={classes.fontNotification} style={{ alignItems: 'flex-start', marginTop: '10px' }}>{
                      notification.description && notification.description.length > 200 ? notification.description.substring(0,197) + "..." : notification.description
                    }</span>
                  </Grid>
                  {
                    notification.file &&
                    <Grid item xs={12} style={{ textAlign: "left", marginTop: '15px' }}>
                      <span className={classes.fontNotification} style={{ fontWeight: 'bold', alignItems: 'flex-end' }}>Archivo Adjunto:</span>
                      <p style={{textAlign:"flex-start"}}>
                        <Button 
                          variant="contained"
                          href={(config.api + notification.file)} target="_blank"
                          endIcon={<GetAppIcon />}
                          color="secondary"
                        >
                          Descargar
                        </Button>
                      </p>
                    </Grid>
                  }
                </Box>
          </Grid>
          <Grid item xs={6} style={{display:"flex", justifyContent:"end"}}>
            <Avatar
              variant="rounded"
              style={{ height: "200px", width: "350px", cursor: notification.image ? "pointer" : "default" }}
              src={notification.image ? (config.api + notification.image) : defaultImage}
              onClick={openImage}
            />
          </Grid>
      </Grid>

      {
        notification.id && ((notification.idCompany && (notification.idCompany == session.user.idCompany) && checkPermission(session, "createCompanyNotifications")) || (!notification.idCompany && checkPermission(session, "createAdminNotifications"))) && (
          <Grid item xs={12} style={{padding: "0px 20px"}}>
            
            <p style={{textAlign:"right"}}>
              <Button
                onClick={openNotificationTo}
                variant="contained"
                color="secondary"
                startIcon={<AddCircleOutlineIcon />}
              >
                Notificar a
              </Button>
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
        setNotification={setNotification}
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
        setNotification={setNotification}
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
