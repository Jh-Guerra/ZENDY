import React from "react";
import config from 'config/Config';
import { Typography } from "@material-ui/core";
import ItemAvatar from "./ItemAvatar";
import { getImageProfile, getSessionInfo } from 'utils/common';
import moment from 'moment';
import LogoZendy from 'assets/images/Zendy-logo.jpg';
import Photo from 'assets/icons/photo-icon.svg';
import File from 'assets/icons/file-icon.svg';


const ItemChatRow = (props) => {
  const session = getSessionInfo();
  const user = session && session.user;

  const { chat = {} } = props;

  const OneDayAgo= (date) => {
    const today = Math.round(new Date().getTime() / 1000);
    const rest = today - date;
    const oneDayAgo = (rest / 60 / 60 / 24).toFixed(2);
    return oneDayAgo >= 1;
  }

  var name = chat.name && chat.name.length > 31 ? chat.name.substring(0,28) + "..." : chat.name || "";
  var image;
  var defaultImageType;
  var isOnline = '';

  if(chat.scope == "Grupal"){
    image = chat.company && chat.company.avatar || "";
    defaultImageType = LogoZendy;
  }else{
    var receiver = chat.participants && chat.participants.find(p => p.id != user.id) || {};
    image = receiver.user && receiver.user.avatar || "";
    defaultImageType = receiver.user && receiver.user.sex || "O";
    isOnline = receiver.user && receiver.user.isOnline ? "active" : "";
  }

  if(chat.type == "Empresa"){
    image = chat.company && chat.company.avatar || "";
    defaultImageType = "Company";
  }

  const message = chat.lastMessage && chat.lastMessage.message  && chat.lastMessage.message.length > 29 ? chat.lastMessage.message.substring(0,26) + "..." :  (chat.lastMessage && chat.lastMessage.message) || "";
  const hour = (chat.lastMessage && chat.lastMessage.createdDate) ? (OneDayAgo(chat.lastMessage.createdDate) ? moment(chat.lastMessage.createdDate*1000).format("DD/MM/YYYY") : moment(chat.lastMessage.createdDate*1000).format('LT')) : " ";
  const lastMessageUser = chat.lastMessageUser || {};
  const prefixMessage = lastMessageUser.id == user.id ? "Tú :" : (chat.scope == "Grupal" ? (lastMessageUser.firstName + ": ") : "");
  const sentImage = chat.lastMessage && chat.lastMessage.image;
  const sentFile = chat.lastMessage && chat.lastMessage.file;

  const onClickAction = (chat) => {
    props.goToChat && props.goToChat(chat);
  }
  const bold = chat.participation && chat.participation.pendingMessages && chat.participation.pendingMessages != 0 ;

  return (
    <div className="item-row" onClick={() => { onClickAction(chat) }}>
      <ItemAvatar
        isOnline={isOnline}
        image={image ? config.api + image : getImageProfile(defaultImageType)}
      />
      <div style={{ width: "80%" }}>
        <div className="item-row-section">
          <Typography className="item-row-title" style={{ fontWeight: bold ? 'bold' : '' }}>{name}</Typography>
          <span className="item-row-time" style={{fontWeight: bold ? 'bold' : '' }}>{hour}</span>
        </div>
        <div className="item-row-section">
          <p className="item-row-description" style={{ fontWeight: bold ? 'bold' : '', color: bold ? 'white' : '' }}>
            {prefixMessage + " "} 
            {message ? message + " " : ""}
            {sentImage ? <img alt="" className="icon-item-chat-row" src={Photo} /> : sentFile ? <img alt="" className="icon-item-chat-row" src={File} /> : ""}
            {sentImage ? " Foto" : sentFile ? " Archivo" : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemChatRow