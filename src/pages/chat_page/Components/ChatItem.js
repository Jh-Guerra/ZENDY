import React, { Component } from "react";
import ChatAvatar from "./ChatAvatar";

const ChatItem = props => {

  const { user, message, image } = props;

  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${user ? user : ""}`}
    >
      <div className="chat__item__content">
        <div className="chat__msg">{message}</div>
        <div className="chat__meta">
          <span>16 mins ago</span>
          <span>Seen 1.03PM</span>
        </div>
      </div>
      <ChatAvatar isOnline="active" image={image} />
    </div>
  );
}

export default ChatItem;