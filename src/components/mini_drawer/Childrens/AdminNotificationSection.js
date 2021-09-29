import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom';
import { showBackdrop } from 'services/actions/CustomAction';
import { listAdminNotifications } from 'services/actions/NotificationAction';
import TabOptions from './TabOptions';
import CustomModal from 'components/Modals/common/CustomModal';
import ItemNotificationRow from '../Components/ItemNotificationRow';

const AdminNotificationSection = (props) => {

    const { classes = {}, session } = props;
    const history = useHistory();
  
    const [notifications, setNotifications] = React.useState([]);
    const [searchTimeout, setSearchTimeout] = React.useState(null);
    const [showNotificationOptions, setShowNotificationOptions] = React.useState(false);
  
    React.useEffect(() => {
      onList("");
    }, []);

    const onList = (term) => {
        props.dispatch(showBackdrop(true));
        props.dispatch(listAdminNotifications(term)).then(res => {
            setNotifications(res || []);
            props.dispatch(showBackdrop(false));
        }).catch(err => props.dispatch(showBackdrop(false)));;
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
            
        }
    }

    const openNotificationOptions = () => {
      setShowNotificationOptions(true);
    }

    const onSaveForm = () => {
      onList('');
    }

    return (
        <div style={{height: "79vh"}}>
          <Grid container>
            <Grid item xs={12}>
                <TabOptions
                    onSaveForm={onSaveForm}
                    onOpenModal={openNotificationOptions}
                    view="adminNotifications"
                />
            </Grid>
            <Grid item xs={12}>
              <div className="chatlist__heading">
                <span className="divider-line"></span>
                <p className="divider-content"> Mis Notificaciones </p>
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
            <Grid item xs={12}>
              {notifications.map((notification, i) => {
                return (
                   <ItemNotificationRow
                     key={i}
                     notification={notification}
                     goTo={goTo}
                   />
                );
              })}
            </Grid>
          </Grid>
          <CustomModal
            customModal={'ModalNotificationOptions'}
            open={showNotificationOptions}
            handleClose={() => { setShowNotificationOptions(false) }}
            onSaveForm={() => {
              setShowNotificationOptions(false);
              onSaveForm();
          }}
          />
        </div>
    );

}

export default AdminNotificationSection;