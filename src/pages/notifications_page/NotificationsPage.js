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
import { listNotificationViewed } from 'services/actions/NotificationViewAction';
import CustomModal from 'components/Modals/common/CustomModal';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { checkPermission, getSessionInfo } from 'utils/common';

const columns = [
  { type: 'text', field: 'name', label: 'Nombre', format: (row) => `${row.firstName} ${row.lastName}` },
  { type: 'text', field: 'roleName', label: 'Rol' },
  { type: 'text', field: 'companyName', label: 'Empresa', format: (row) => `${row.company && row.company.name || ""}` },
  { type: 'text', field: 'email', label: 'Correo' },
  { type: 'text', field: 'viewed_at', label: 'Visto', align: 'center', format: (row) => moment(row.viewed_at || "").format("DD/MM/YYYY, h:mm") },
];

const NotificationsPage = (props) => {
  const { } = props;

  const session = getSessionInfo();
  const history = useHistory();

  const [ showNewCompanyNotification, setShowNewCompanyNotification ] = React.useState(false);
  const [ showNewCompaniesNotification, setShowNewCompaniesNotification ] = React.useState(false);
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
    }).catch(err => props.dispatch(showBackdrop(false)));

    props.dispatch(listNotificationViewed(notificationId)).then(res => {
      setNotificationsViewed(res || []);
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));
  };

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
        console.error('error', error);
      });
  };

  return (
    <Grid container>
      <Grid item xs={12} className="top-header">
        <Typography variant="h4" component="h4" gutterBottom style={{textAlign:'center'}}>
          {notification.reason}
        </Typography>
      </Grid>
      {
        checkPermission(session, "createNotifications") && (
          <Grid item xs={12} style={{padding: "0px 20px"}}>
            <p style={{textAlign:'start'}}>
              <CustomButton
                variant="contained"
                startIcon={<EditIcon />}
                customColor={successButtonColor}
                onClick={onOpenEditNotification}
                style={{marginRight: "10px"}}
              >
                Editar Notificatión
              </CustomButton>
              <CustomButton
                variant="contained"
                startIcon={<DeleteIcon />}
                customColor={dangerColor}
                onClick={onOpenModalDelete}
              >
                Eliminar Notificatión
              </CustomButton>
            </p>
          </Grid>
        )
      }
      <Grid item xs={12} style={{padding: "0px 20px"}}>
        <Typography variant="h6"> Notificaciones entregadas </Typography>
        <CustomTable 
          columns={columns}
          rows={notificationsViewed || []}
          onRowClick={() => {}}
          loading={loading}
        />
      </Grid>
      <ModalDelete
        open={showModalDelete}
        title="Eliminar Notificación"
        handleClose={() => { this.setState({showModalDelete: false }) }}
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
    </Grid>
  );

}

export default NotificationsPage;
