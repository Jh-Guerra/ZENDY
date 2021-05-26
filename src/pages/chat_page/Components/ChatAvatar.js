import React, { Component } from "react";
import "assets/styles/zendy-app.css";

const ChatAvatar = props => {

  const { image, isOnline } = props;

  return (
    <div className="avatar">
      <div className="avatar-img">
        <img src={image} alt="#" />
      </div>
      <span className={`is-online ${isOnline}`}></span>
    </div>
  );

}

export default ChatAvatar;