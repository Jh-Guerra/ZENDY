import React, { Component } from "react";
import ChatAvatar from "./ChatAvatar";

const ChatItem = props => {

  const { user, message, image } = props;

  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat-item ${user ? user : ""}`}
    >
      <div className="chat-item-content">
        <div className="chat-meta">
          <span>{user}</span>
          <span>12:05 PM</span>
        </div>
        <div className="chat-msg">{message}</div>
      </div>
      <ChatAvatar isOnline="active" image={image} />
    </div>
  );
}

export default ChatItem;