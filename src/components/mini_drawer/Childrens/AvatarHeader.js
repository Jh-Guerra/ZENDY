import { Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles"
import config from "config/Config";
import React, { Component, useState, createRef, useEffect } from "react";

import Avatar from "../Components/Avatar";
import { getImageProfile, getSessionInfo } from "utils/common";

 class AvatarHeader extends Component {
  messagesEndRef = createRef(null);

  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatItms,
      msg: "",
    };
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    
  }
  

  render() {

    const { classes } = this.props
    const session = getSessionInfo();
    const user = session && session.user || {};

    return (
        <div className="mini-drawer-content" style={{height:"13vh", minHeight:"110px"}}>
            <div className="mini-drawer-user">
              <Avatar
                isOnline="active"
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
        </div>
    );
  }
}
export default AvatarHeader;
