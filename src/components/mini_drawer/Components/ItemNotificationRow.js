import React, { Component, createRef } from "react";
import config from 'config/Config';
import moment from 'moment';

import ItemAvatar from "./ItemAvatar";
import { getImageProfile } from 'utils/common';
import { textDescripcion, textTitulo } from "assets/styles/zendy-css";

const ItemNotificationRow = (props) => {

  const { notification={} } = props;

  const description = notification.description && notification.description.length > 33 ? notification.description.substring(0,30) + "..." : notification.description || "";
  const reason = notification.reason && notification.reason.length > 48 ? notification.reason.substring(0,45) + "..." : notification.reason || "";
  const hour = notification.created_at ? moment(notification.created_at).format("DD/MM/YYYY") : "--/--/----";

  const onClickAction = (notification) => {
    props.goTo && props.goTo(notification);
  }

  return (
    <div className="mini-drawer-content" onClick={() => { onClickAction(notification) }} style={{cursor: "pointer"}}>
      <div className="mini-drawer-user">
        <ItemAvatar
          image={getImageProfile()}
          isChatCompany
        />
        <div style={{width:"80%"}}>
            <div className="chat-mini-details">
              <span style={{fontSize:textTitulo}}>{reason}</span>
              <span className="chat-mini-time">{hour}</span>
            </div>
            <p style={{fontSize:textDescripcion, color:"silver"}}>
              {description}
            </p>
        </div>
      </div>
    </div>
  );
}

export default ItemNotificationRow;