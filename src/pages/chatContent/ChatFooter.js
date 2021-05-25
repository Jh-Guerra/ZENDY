import React, { Component, useState, createRef, useEffect } from "react";

import "assets/styles/zendy-app.css";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

export default class ChatFooter extends Component {
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
    return (
      <div className="chat-footer">
        <IconButton className="chat-input-button"> 
          <EmojiEmotionsIcon className="chat-input-icon" />
        </IconButton>
        <input
          type="text"
          placeholder="Escribe un mensaje aquí."
          onChange={this.onStateChange}
          value={this.state.msg}
        />
        <IconButton className="chat-input-button">
          <SendIcon className="chat-input-icon" />
        </IconButton>
      </div>
    );
  }
}
