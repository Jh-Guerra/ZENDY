import React from "react";
import config from 'config/Config';
import { Typography } from "@material-ui/core";
import ItemAvatar from "./ItemAvatar";
import { getImageProfile, getSessionInfo } from 'utils/common';
import moment from 'moment';
import { textDescripcion, textTitulo } from "assets/styles/zendy-css";

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

  var name = chat.name && chat.name.length > 33 ? chat.name.substring(0,30) + "..." : chat.name || "";
  var image;
  var defaultImageType;
  var isOnline = '';

  if(chat.scope == "Grupal"){
    image = chat.company && chat.company.avatar || "";
    defaultImageType = "Company";
  }else{
    var receiver = chat.participants && chat.participants.find(p => p.id != user.id) || {};
    image = receiver.user && receiver.user.avatar || "";
    defaultImageType = receiver.user && receiver.user.sex || "O";
    isOnline = receiver.user && receiver.user.isOnline ? "active" : "";
  }

  const message = chat.lastMessage && chat.lastMessage.message  && chat.lastMessage.message.length > 48 ? chat.lastMessage.message.substring(0,45) + "..." :  (chat.lastMessage && chat.lastMessage.message) || "";
  const hour = (chat.lastMessage && chat.lastMessage.createdDate) ? (OneDayAgo(chat.lastMessage.createdDate) ? moment(chat.lastMessage.createdDate*1000).format("DD/MM/YYYY") : moment(chat.lastMessage.createdDate*1000).format('LT')) : " ";

  const lastMessageUser = chat.lastMessageUser || {};
  const prefixMessage = lastMessageUser.id == user.id ? "Tú :" : (chat.scope == "Grupal" ? (lastMessageUser.firstName + " " + lastMessageUser.lastName) : "");

  const onClickAction = (chat) => {
    props.goToChat && props.goToChat(chat);
  }

  var iconStatus;
  return (
    <div className="mini-drawer-content" onClick={() => { onClickAction(chat) }}>
      <div className="mini-drawer-user">
        <ItemAvatar
          isOnline={isOnline}
          image={image ? config.api + image : getImageProfile(defaultImageType)}
          iconStatus = {true}
        />
        <div style={{ width: "80%" }}>
          <div className="chat-mini-details">
          <Typography style={{ fontSize:textTitulo, wordWrap: "break-word" }}>{name}</Typography>
            <span className="chat-mini-time">{hour}</span>
          </div>
          <div className="chat-mini-details">
            <p style={{ fontSize:textDescripcion, color: "silver" }}>
              {
                message ? ( prefixMessage + " " + message ) : " "
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemChatRow