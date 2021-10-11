import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase, FormControlLabel } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom';
import { showBackdrop } from 'services/actions/CustomAction';
import CustomModal from 'components/Modals/common/CustomModal';
import ItemNotificationRow from '../Components/ItemNotificationRow';
import { listNotificationsByCompany, listNotificationsByUser } from 'services/actions/NotificationAction';
import { checkPermission, getSessionInfo } from 'utils/common';
import TabOptions from './TabOptions';
import CustomCheckbox from 'components/CustomCheckbox';


const NotificationSection = (props) => {

    const { classes = {}, notificationRx } = props;
    const session = getSessionInfo();
    const user = session && session.user || {};
    const history = useHistory();
  
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [searchTimeout, setSearchTimeout] = React.useState(null);
    const [showNewCompanyNotification, setShowNewCompanyNotification] = React.useState(false);
    const [isPending, setIsPending] =React.useState(false);
    const [search, setSearch] = React.useState("");
  
    React.useEffect(() => {
      onList("");
    }, []);

    const onList = (term, status) => {
        props.dispatch(showBackdrop(true));
        if(checkPermission(session, "createCompanyNotifications")){
          setIsAdmin(true);
          props.dispatch(listNotificationsByCompany(term)).then(res => {
            props.dispatch(showBackdrop(false));
          }).catch(err => props.dispatch(showBackdrop(false)));
        }else{
          props.dispatch(listNotificationsByUser(term, status)).then(res => {
            props.dispatch(showBackdrop(false));
          }).catch(err => props.dispatch(showBackdrop(false)));
        }
    };

    const onSearch = term => {
      setSearch(term)
        clearTimeout(searchTimeout);
        setSearchTimeout(
          setTimeout(() => {
            onList(term, isPending && "Visto" );
          }, 1000)
        );
    };

    const goTo = (notification) => {
        if(notification && notification.id){
            history.push("/notificaciones/" + notification.id + "/viewed");
        } else {
          history.push("/no-encontrado");
        }
    }

    const openNewCompanyNotification = () => {
      setShowNewCompanyNotification(true);
    }

    const onSaveForm = () => {
      onList('');
    }

    const onChangeCheck = (value) => {

        setIsPending(!isPending)
        setSearch("")
        onList('', value ? 'Visto': 'Pendiente')
    }

    const notifications = notificationRx && notificationRx.notifications || [];

    return (
        <div style={{height: "79vh"}}>
          <Grid container style={{height: "100%"}}>
            {
              checkPermission(session, "createCompanyNotifications") ? (
                <Grid item xs={12} style={{height: "8vh"}}>
                  <TabOptions
                    onSaveForm={onSaveForm}
                    onOpenModal={openNewCompanyNotification}
                    view="adminNotifications"
                  />
                </Grid>
              ) : null
            }
            <Grid item xs={12} style={{height: "7vh"}}>
              <div className="chatlist__heading">
                <span className="divider-line"></span>
                <p className="divider-content"> Notificaciones </p>
                <span className="divider-line"></span>
              </div>
              <br />
            </Grid>
            <Grid item xs={12} style={{ padding: '10px 10px', height: "7vh" }}>
              <Input
                fullWidth
                className="search_wrap"
                style={{margin: "0px 0px 20px 0px"}}
                type="text"
                value={search}
                placeholder="Buscar notificación"
                onChange={event => onSearch(event.target.value)}
                disableUnderline
                startAdornment= {
                  <InputAdornment position="start">
                    <IconButton type="button" aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12} style={{height: "5vh"}}>
              {
                !isAdmin && (
                  <FormControlLabel
                    control={
                      <CustomCheckbox
                        checked={isPending}
                        value={'Pendiente'}
                        onChange={(e) => onChangeCheck(e.target.checked)
                        }
                      />
                    }
                    label="Vistos"
                    className="custom-checkbox-text"
                  />
                )
              }
            </Grid>
            <Grid item xs={12} style={{height: checkPermission(session, "createCompanyNotifications") ? "52vh" : "60vh"}}>
              <div className="items-section">
                {notifications.map((notificationViewed, i) => {
                  return (
                    <ItemNotificationRow
                      key={i}
                      notification={notificationViewed}
                      goTo={goTo}
                    />
                  );
                })}
              </div>
            </Grid>
          </Grid>
          <CustomModal 
              customModal="ModalNewCompanyNotification"
              open={showNewCompanyNotification} 
              handleClose={() => { setShowNewCompanyNotification(false); }}
              onSaveForm={() => {
                  setShowNewCompanyNotification(false);
                  onSaveForm();
              }}
              headerText="Nueva notificación"
              idCompany={user.idCompany}
            />
        </div>
    );

}

export default NotificationSection;