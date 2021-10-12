import React from "react";
import config from 'config/Config';
import { Typography } from "@material-ui/core";
import ItemAvatar from "./ItemAvatar";
import { getImageProfile, getSessionInfo } from 'utils/common';
import moment from 'moment';
import { itemRowText, itemRowTitle } from "assets/styles/zendy-css";

const ItemChatHistoryRow = (props) => {
  const session = getSessionInfo();
  const user = session && session.user;

  const { chat = {} } = props;

  const OneDayAgo= (date) => {
    const today = Math.round(new Date().getTime() / 1000);
    const rest = today - date;
    const oneDayAgo = (rest / 60 / 60 / 24).toFixed(2);
    return oneDayAgo >= 1;
  }


  var name =  chat.name && chat.name.length > 33 ? chat.name.substring(0,30) + "..." : chat.name || "";
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
  const hour = (chat && chat.finalizeDate) ? (OneDayAgo(chat.finalizeDate) ? moment(chat.finalizeDate*1000).format("DD/MM/YYYY") : moment(chat.finalizeDate*1000).format('LT')) : " ";
  const lastMessageUser = chat.lastMessageUser || {};
  const prefixMessage = lastMessageUser.id == user.id ? "Tú :" : (chat.scope == "Grupal" ? (lastMessageUser.firstName + " " + lastMessageUser.lastName) : "");

  const onClickAction = (chat) => {
    props.goToChat && props.goToChat(chat);
  }

  return (
    <div className="item-row" onClick={() => { onClickAction(chat) }}>
      <ItemAvatar
        isOnline={isOnline}
        image={image ? config.api + image : getImageProfile(defaultImageType)}
      />
      <div style={{ width: "80%" }}>
        <div className="item-row-section">
        <Typography noWrap style={{ fontSize:itemRowTitle, wordWrap: "break-word" }}>{name}</Typography>
          <span className="item-row-time">{hour}</span>
        </div>
        <div className="item-row-section">
          <p style={{ fontSize:itemRowText }}>
            {
              message ? ( prefixMessage + " " + message ) : " "
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemChatHistoryRow