import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase, FormControlLabel } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom';
import { showBackdrop } from 'services/actions/CustomAction';
import CustomModal from 'components/Modals/common/CustomModal';
import ItemNotificationRow from '../Components/ItemNotificationRow';
import { listNotificationsByCompany, listNotificationsByUser } from 'services/actions/NotificationAction';
import { checkPermission } from 'utils/common';
import TabOptions from './TabOptions';
import CustomCheckbox from 'components/CustomCheckbox';


const NotificationSection = (props) => {

    const { classes = {}, session, notificationRx } = props;
    const user = session && session.user || {};
    const history = useHistory();
  
    const [searchTimeout, setSearchTimeout] = React.useState(null);
    const [showNewCompanyNotification, setShowNewCompanyNotification] = React.useState(false);
    const [isPending, setIsPending] =React.useState(false);
  
    React.useEffect(() => {
      onList("");
    }, []);

    const onList = (term, status) => {
        props.dispatch(showBackdrop(true));

        if(checkPermission(session, "createNotifications")){
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
        clearTimeout(searchTimeout);
        setSearchTimeout(
          setTimeout(() => {
            onList(term);
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
        onList('', value ? 'Visto': 'Pendiente')
    }

    const notifications = notificationRx && notificationRx.notifications || [];

    return (
        <div style={{height: "79vh"}}>
          <Grid container>
            <Grid item xs={12}>
              <TabOptions
                onSaveForm={onSaveForm}
                onOpenModal={openNewCompanyNotification}
                view="adminNotifications"
              />
            </Grid>
            <Grid item xs={12}>
              <div className="chatlist__heading">
                <span className="divider-line"></span>
                <p className="divider-content"> Notificaciones </p>
                <span className="divider-line"></span>
              </div>
              <br />
            </Grid>
            <Grid item xs={12} style={{padding: '0px 10px'}}>
              <Input
                fullWidth
                className="search_wrap"
                style={{margin: "0px 0px 20px 0px"}}
                type="text"
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
            <Grid item xs={12} style={{ padding: '0px 10px' }}>
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
            style={{ color: 'white', marginLeft: '10px' }}
          />
          </Grid>
            <Grid item xs={12}>
              {notifications.map((notificationViewed, i) => {
                return (
                   <ItemNotificationRow
                     key={i}
                     notification={notificationViewed}
                     goTo={goTo}
                   />
                );
              })}
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