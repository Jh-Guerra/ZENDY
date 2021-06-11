import React, { Component } from "react";
import "assets/styles/zendy-app.css";

const ChatAvatar = props => {

  const { image, isOnline, imgClassName="" } = props;

  return (
    <div className={imgClassName || "avatar"}>
      <div className="avatar-img">
        <img src={image} alt="#" />
      </div>
    </div>
  );

}

export default ChatAvatar;