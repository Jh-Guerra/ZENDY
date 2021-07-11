import { Button } from "@material-ui/core";
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

    return (
        <div className="mini-drawer-content">
            <div className="mini-drawer-user">
              <Avatar
                isOnline="active"
                image="https://www.fundacionpersonasyempresas.org/wp-content/uploads/2013/10/images_curiosita_homer-2.jpg"
              />
              <div>
                <p>Homero Simpons</p>
                <Button className={classes.root} variant="outlined" size="small" onClick={() => (this.props.Logout())}>Cerrar Sesión</Button>
              </div>
            </div>
          </div>
    );
  }
}
export default withStyles(styles, {withTheme: true})(AvatarHeader);
