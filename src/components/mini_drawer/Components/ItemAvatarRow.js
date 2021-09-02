import React, { Component, createRef } from "react";
import config from 'config/Config';

import ItemAvatar from "./ItemAvatar";
import { getImageProfile } from 'utils/common';

const ItemAvatarRow = (props) => {

  const { chat={} } = props;

  const type = chat.type;
  var image;
  var name;
  var defaultImageType;

  if(type == "Empresa"){
    image = chat.company && chat.company.avatar || "";
    defaultImageType = "Company";
    name = chat.company && (chat.company.name) || '';
  }else{
    image = chat.receiver && chat.receiver.avatar || "";
    defaultImageType = chat.receiver && chat.receiver.sex || "O";
    name = chat.receiver && (chat.receiver.firstName + ' ' + chat.receiver.lastName) || "";
  }

  const message = chat.lastMessage || '...';
  const hour = chat.lastMessageHour || '00:00';
  const isOnline = (chat.receiver.isOnline == "1") ? 'active' : '';

  const onClickAction = (chat) => {
    props.goToChat && props.goToChat(chat);
  }

  return (
    <div className="mini-drawer-content" onClick={() => { onClickAction(chat) }}>
      <div className="mini-drawer-user">
        <ItemAvatar
          isOnline={isOnline}
          image={image ? config.api+image : getImageProfile(defaultImageType)}
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