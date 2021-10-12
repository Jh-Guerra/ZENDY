import React, { Component, createRef } from "react";
import config from 'config/Config';
import moment from 'moment';

import ItemAvatar from "./ItemAvatar";
import { getImageProfile } from 'utils/common';

const ItemNotificationRow = (props) => {

  const { notification={} } = props;

  const description = notification.description && notification.description.length > 33 ? notification.description.substring(0,30) + "..." : notification.description || "";
  const reason = notification.reason && notification.reason.length > 48 ? notification.reason.substring(0,45) + "..." : notification.reason || "";
  const hour = notification.created_at ? moment(notification.created_at).format("DD/MM/YYYY") : "--/--/----";

  const onClickAction = (notification) => {
    props.goTo && props.goTo(notification);
  }

  return (
    <div className="item-row" onClick={() => { onClickAction(notification) }} style={{cursor: "pointer"}}>
      <ItemAvatar
        image={getImageProfile()}
        isChatCompany
      />
      <div style={{width:"80%"}}>
          <div className="item-row-section">
            <span className="item-row-title">{reason}</span>
            <span className="item-row-time">{hour}</span>
          </div>
          <p className="item-row-description">
            {description}
          </p>
      </div>
    </div>
  );
}

export default ItemNotificationRow;