import { Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles"
import React, { Component, useState, createRef, useEffect } from "react";

import Avatar from "../Components/Avatar";

const styles = theme => ({
  root: {
    '&:hover': {
      backgroundColor: '#FF7878',
    }
  }
})

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
    const sessionUser = JSON.parse(localStorage.getItem('user'));
    const user = sessionUser.user;

    return (
        <div className="mini-drawer-content" style={{minHeight:"110px", maxHeight:"110px"}}>
            <div className="mini-drawer-user">
              <Avatar
                isOnline="active"
                image={process.env.REACT_APP_API+user.avatar || ""}
                style={{maxHeight:"10vh", minHeight:'10vh',position:'static'}}
              />
              <div>
                <div>               
                <Typography style={{fontSize:'19px'}}>{`${user.firstName} ${user.lastName}`}</Typography>               
                </div>
                <Button className={classes.root} variant="outlined" size="small" onClick={() => (this.props.Logout())}>Cerrar Sesión</Button>
              </div>
            </div>
        </div>
    );
  }
}
export default withStyles(styles, {withTheme: true})(AvatarHeader);
