import { Button, Typography } from "@material-ui/core";
import config from "config/Config";
import React, { Component } from "react";

import Avatar from "../Components/Avatar";
import { getImageProfile, getSessionInfo } from "utils/common";
import { pLetterColor } from "assets/styles/zendy-css";

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
            />
            <div>
              <div>               
                <Typography style={{fontSize:'18px', color: pLetterColor}}>{`${user.firstName} ${user.lastName}`}</Typography>               
              </div>
              <Button color="secondary" variant="contained" size="small" onClick={() => (this.props.logout())}>Cerrar Sesión</Button>
            </div>
        </div>
    );
  }
}
export default AvatarHeader;
