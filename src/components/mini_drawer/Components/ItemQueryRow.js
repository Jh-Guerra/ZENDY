import React, { Component, createRef } from "react";
import config from 'config/Config';

import ItemAvatar from "./ItemAvatar";
import { getImageProfile } from 'utils/common';
import moment from 'moment';
import { itemRowText, itemRowTitle } from "assets/styles/zendy-css";

const ItemQueryRow = (props) => {

  const { query={} } = props;

  const image =  query.avatar;
  const description = query.description && query.description.length > 48 ? query.description.substring(0,45) + "..." : query.description || "";
  const reason = query.reason && query.reason.length > 33 ? query.reason.substring(0,30) + "..." : query.reason || "";

  
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
    <div className="item-row" onClick={() => { onClickAction(query) }} style={{cursor: "pointer"}}>
      <ItemAvatar
        image={image ? config.api+image : getImageProfile(query.sex)}
        isChatCompany
      />
      <div style={{width:"80%"}}>
          <div className="item-row-section">
            <span style={{fontSize:itemRowTitle}}>{reason}</span>
            <span className="item-row-time">{hour}</span>
          </div>
          <p style={{fontSize:itemRowText}}>
            {description}
          </p>
      </div>
    </div>
  );
}

export default ItemQueryRow