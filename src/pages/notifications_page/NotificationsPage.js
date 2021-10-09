import React, { Component } from 'react';
import { Grid, Typography } from "@material-ui/core";
import CustomTable from 'components/CustomTable';
import CustomButton from 'components/CustomButton';
import { dangerColor, successButtonColor } from 'assets/styles/zendy-css';
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

const columns = [
  { type: 'text', field: 'name', label: 'Nombre', format: (row) => `${row.firstName} ${row.lastName}` },
  { type: 'text', field: 'rol', label: 'Rol', format: (row) => getCustomRoleName(row.rol) },
  { type: 'text', field: 'companyName', label: 'Empresa' },
  { type: 'text', field: 'email', label: 'Correo' },
  { type: 'text', field: 'viewedDate', label: 'Visto', align: 'center', format: (row) => row.viewedDate ? moment(row.viewedDate).format("DD/MM/YYYY") : "" },
];

const NotificationsPage = (props) => {
  const { } = props;

  const session = getSessionInfo();
  const history = useHistory();

  const [ showNewCompanyNotification, setShowNewCompanyNotification ] = React.useState(false);
  const [ showNewCompaniesNotification, setShowNewCompaniesNotification ] = React.useState(false);
  const [ showNotificationTo, setShowNotificationTo] = React.useState(false);
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
    setShowNotificationTo(true);
  };  

  return (
    <Grid container>
      <Grid item xs={12} className="top-header">
        <Typography variant="h4" component="h4" gutterBottom style={{textAlign:'center'}}>
          {notification.reason}
        </Typography>
      </Grid>
      {
        ((notification.idCompany && checkPermission(session, "createNotifications")) || checkPermission(session, "createAdminNotifications")) && (
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
      {
        ((notification.idCompany && checkPermission(session, "createNotifications")) || checkPermission(session, "createAdminNotifications")) && (
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
    </Grid>
  );

}

export default NotificationsPage;
