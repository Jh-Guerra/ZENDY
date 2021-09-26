import React, { Component, createRef } from "react";
import config from 'config/Config';
import { Grid, TextField, Tooltip, Typography } from "@material-ui/core";
import ItemAvatar from "./ItemAvatar";
import { getImageProfile, getSessionInfo } from 'utils/common';

const ItemAvatarRow = (props) => {
  const session = getSessionInfo();
  const user = session && session.user;

  const { chat = {} } = props;

  var name = chat.name || "";
  var image;
  var defaultImageType;
  var isOnline = '';

  if(chat.scope == "Grupal"){
    image = chat.company && chat.company.avatar || "";
    defaultImageType = "Company";
  }else{
    chat.participants.map(participant => {
      if(participant.id != user.id && participant.user){
        image = participant.user.avatar || "";
        defaultImageType = participant.user.sex || "O";
        isOnline = (participant.user.isOnline) ? 'active' : '';
      }
    })
  }

  const message = chat.lastMessage || '...';
  const hour = chat.lastMessageHour || '00:00';

  const onClickAction = (chat) => {
    props.goToChat && props.goToChat(chat);
  }

  return (
    <div className="mini-drawer-content" onClick={() => { onClickAction(chat) }}>
      <div className="mini-drawer-user">
        <ItemAvatar
          isOnline={isOnline}
          image={image ? config.api + image : getImageProfile(defaultImageType)}
        />
        <div style={{ width: "80%" }}>
          <div className="chat-mini-details">
          <Typography noWrap style={{ fontSize:"17px", wordWrap: "break-word" }}>{name}</Typography>
            <span className="chat-mini-time">{hour}</span>
          </div>
          <div className="chat-mini-details">
            <p style={{ fontSize: "16px", color: "silver" }}>
              {message}
            </p>
            <p style={{ fontSize: "14px" }} className="border-number">
              {"8"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemAvatarRow