import React, { Component, useState, createRef, useEffect } from "react";

import "assets/styles/zendy-app.css";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ImageIcon from '@material-ui/icons/Image';
import DescriptionIcon from '@material-ui/icons/Description';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";

const styles = theme => ({
  svg: {
    width: '25px',
    height: '25px',
    marginRight: '5px',
  },
  miniDrawerButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    width: '100%',
    color: '#fff',
    padding: '10px',
    marginTop: '15px',
  }
});

class ChatFooter extends Component {
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
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        if (this.state.msg != "") {
          this.chatItms.push({
            key: 1,
            type: "",
            msg: this.state.msg,
            image:
              "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
          });
          this.setState({ chat: [...this.chatItms] });
        
          this.setState({ msg: "" });
        }
      }
    });
   
  }
  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container >
        <div className={`chat-footer ${classes.miniDrawerButtons}`} style={{ paddingTop: '10px'}}>
          <Grid item xs={12} alignItems="center" justify="center">
            <div className="chat__button" style={{ marginTop: '5px' }}>
              <VolumeUpIcon className={`${classes.svg}`}/>
              Recomendar Otro Usuario
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="chat__button" style={{ marginTop: '5px' }}>
              <CheckCircleOutlineIcon className={`${classes.svg}`} />
              Aceptar Consulta e Iniciar Chat
            </div>
          </Grid>
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(ChatFooter);
