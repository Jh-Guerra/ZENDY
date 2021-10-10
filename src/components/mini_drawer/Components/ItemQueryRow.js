import React, { Component, createRef } from "react";
import config from 'config/Config';

import ItemAvatar from "./ItemAvatar";
import { getImageProfile } from 'utils/common';
import moment from 'moment';

const ItemQueryRow = (props) => {

  const { query={} } = props;

  const image =  query.avatar;
  const description = query.description || "";
  const reason = query.reason || 0;

  
  const OneDayAgo= (date) => {
    const today = Math.round(new Date().getTime() / 1000);
    const rest = today - date;
    const oneDayAgo = (rest / 60 / 60 / 24).toFixed(2);
    return oneDayAgo >= 1;
  }

  const hour = (query && query.startDate) ? (OneDayAgo(query.startDate) ? moment(query.startDate*1000).format("DD/MM/YYYY") : moment(query.startDate*1000).format('LT')) : " ";

  const onClickAction = (query) => {
    props.goTo && props.goTo(query);
  }

  return (
    <div className="mini-drawer-content" onClick={() => { onClickAction(query) }} style={{cursor: "pointer"}}>
      <div className="mini-drawer-user">
        <ItemAvatar
          image={image ? config.api+image : getImageProfile(query.sex)}
          isChatCompany
        />
        <div style={{width:"80%"}}>
            <div className="chat-mini-details">
              <span style={{fontSize:"18px"}}>{reason}</span>
              <span className="chat-mini-time">{hour}</span>
            </div>
            <p style={{fontSize:"16px", color:"silver"}}>
              {description}
            </p>
        </div>
      </div>
    </div>
  );
}

export default ItemQueryRow