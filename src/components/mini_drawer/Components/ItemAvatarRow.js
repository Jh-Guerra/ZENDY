import React, { Component, createRef } from "react";
import config from 'config/Config';

import ItemAvatar from "./ItemAvatar";

const ItemAvatarRow = (props) => {

  const { chat={} } = props;

  const getChatName = () => {
    switch(chat.type){
      case "Cliente":
      case "Interno":
        return chat.receiver && (chat.receiver.firstName + ' ' + chat.receiver.lastName) || '';
      case "Empresa":
        return chat.company && (chat.company.name) || '';
      default:
        return "";
    }
  }

  const image = chat.receiver && chat.receiver.avatar || '';
  const name = getChatName();
  const message = chat.lastMessage || '...';
  const hour = chat.lastMessageHour || '00:00';
  const isOnline = chat.isOnline ? 'active' : '';

  const onClickAction = (chat) => {
    props.goToChat && props.goToChat(chat);
  }

  return (
    <div className="mini-drawer-content" onClick={() => { onClickAction(chat) }}>
      <div className="mini-drawer-user">
        <ItemAvatar
          isOnline={isOnline}
          image={image ? (config.api+image) : "http://placehold.it/80x80"}
        />
        <div style={{width:"80%"}}>
            <div className="chat-mini-details">
              <span style={{fontSize:"18px"}}>{name}</span>
              <span className="chat-mini-time">{hour}</span>
            </div>                
            <p style={{fontSize:"16px", color:"silver"}}>
              {message}
            </p>
        </div>
      </div>
    </div>
  );
}

export default ItemAvatarRow