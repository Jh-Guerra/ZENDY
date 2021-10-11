import { Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles"
import config from "config/Config";
import React, { Component, useState, createRef, useEffect } from "react";

import Avatar from "../Components/Avatar";
import { getImageProfile, getSessionInfo } from "utils/common";

 class AvatarHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    
  }
  

  render() {
    const session = getSessionInfo();
    const user = session && session.user || {};

    return (
        <div className="mini-drawer-header">
          <Avatar
            isOnline={user.isOnline ? "active" : ""}
            image={user.avatar ? (config.api + (user.avatar) ) : getImageProfile(user.sex)}
            style={{maxHeight:"10vh", minHeight:'10vh',position:'static'}}
          />
          <div>
            <div>               
              <Typography style={{fontSize:'19px'}}>{`${user.firstName} ${user.lastName}`}</Typography>               
            </div>
            <Button className="close-session-button" variant="outlined" size="small" onClick={() => (this.props.logout())}>Cerrar Sesión</Button>
          </div>
        </div>
    );
  }
}
export default AvatarHeader;
