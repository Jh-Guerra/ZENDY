import React, { useState } from "react";
import config from 'config/Config';
import { Checkbox, Divider, Grid, Typography, FormControl, InputLabel, Input, InputAdornment, Box } from '@material-ui/core';
import ItemAvatar from "./ItemAvatar";
import { getImageProfile, getSessionInfo } from 'utils/common';
import moment from 'moment';
import LogoZendy from 'assets/images/Zendy-logo.jpg';
import Photo from 'assets/icons/photo-icon.svg';
import File from 'assets/icons/file-icon.svg';
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { count_chats, count_queries_actives } from "services/actions/CountAction";
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ZendyIcon from 'assets/images/ZendyIcon.jpg';
import { pColor } from 'assets/styles/zendy-css';
import { createClientChat } from 'services/actions/ChatAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';

const ItemUserRow = (props) => {
    const { user = {} } = props;
    // console.log(props.user),
    console.log(user)
    const history = useHistory();

    const onConfirm = (user) => {
       let dataUser=[];
       dataUser.push(user);
      // if (selectedUsers.length == 0) {
      //   return props.dispatch(showSnackBar('warning', 'Necesita seleccionar un usuario'));
      // }
      props.dispatch(showBackdrop(true));
      props.dispatch(createClientChat(dataUser)).then(res => {
        // history.push(`/chats/${res.chat.id}`);
        props.goToChat&& props.goToChat(res.chat);
        props.dispatch(showBackdrop(false));
      }).catch(err => {
        props.dispatch(showBackdrop(false));
        props.dispatch(showSnackBar("error", err.response.data ? err.response.data.error : "ERROR"));
      });
    };

  return (
    // <div className="item-row" onClick={() => { alert('aaa') }}>


    <div className="item-row" onClick={() => {
      onConfirm(user)
      }}>
        <ItemAvatar
        // isOnline={isOnline}
        image={user.avatar ? config.api + user.avatar : ZendyIcon}
      />
        {/* <Avatar alt="" src={user.avatar ? config.api + user.avatar : ZendyIcon} /> */}
      <div style={{ width: "80%" }}>
        <div className="item-row-section">
          <Typography className="item-row-title" style={{ fontWeight: 'normal'}}>{`${user.firstName} ${user.lastName}`}</Typography>

        </div>
        <div className="item-row-section">
          <p className="item-row-description" style={{ fontWeight: 'normal', color: 'white'}}>
            
          </p>
        </div>
      </div>
    </div>

    
    // </div>
    // <Grid container spacing={3}>
    //       <Box  style={{ padding: '0px', overflow: 'auto', width:"100%",  maxHeight:"350px"}}>
    //         <Grid item xs={12} >
    //           <List>
    //                 <ListItem
    //                   button
    //                   divider
    //                   onClick={() => {
    //                     // onSelectUser(user);
    //                     alert('akakaka')
    //                   }}
    //                 >
    //                   <ListItemAvatar >
    //                     <Avatar alt="" src={user.avatar ? config.api + user.avatar : ZendyIcon} />
    //                   </ListItemAvatar>
    //                   <ListItemText
    //                     primary={`${user.firstName} ${user.lastName}`}
    //                     // secondary={<Typography className="list-sub-text">{user.idRole && getCustomRoleName(user.roleName) || ''}</Typography>}
    //                   />
    //                   <ListItemSecondaryAction>
    //                     <Checkbox
    //                     //   checked={selectedUsers.find(u => u.id == user.id) != null}
    //                       onChange={(e) => {
    //                         // onSelectUser(user);
    //                         console.log(e)
    //                       }}
    //                       icon={<RadioButtonUncheckedIcon />}
    //                       checkedIcon={<RadioButtonCheckedIcon style={{ color: pColor }} />}
    //                     />
    //                   </ListItemSecondaryAction>
    //                 </ListItem>
    //           </List>
    //         </Grid>
    //       </Box>

    //     </Grid>
  );
}

// export default ItemUserRow
const mapStateToProps = (state) => ({ ...state })
export default connect(mapStateToProps)(withRouter(ItemUserRow));