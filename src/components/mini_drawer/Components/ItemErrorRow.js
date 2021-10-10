import React, { Component, createRef } from "react";
import config from 'config/Config';

import ItemAvatar from "./ItemAvatar";
import { getImageProfile } from 'utils/common';
import moment from "moment";
import { Typography } from "@material-ui/core";

const ItemErrorRow = (props) => {

  const { error={} } = props;

  const user = error.createdByUser;

  const image = user && user.avatar || "";
  const defaultImageType = user && user.sex || "O";
  const name = user && (user.firstName + ' ' + user.lastName) || "";

  const description = error.description || '...';

  const OneDayAgo= (date) => {
    const today = Math.round(new Date().getTime() / 1000);
    const rest = today - date;
    const oneDayAgo = (rest / 60 / 60 / 24).toFixed(2);
    return oneDayAgo >= 1;
  }

 const dateTimeStamp = ( Date.parse(error.created_at));
 const dateTSseg = Math.round(dateTimeStamp / 1000)
 const hour = (error && error.created_at) ? (OneDayAgo((dateTSseg)) ? moment((dateTSseg)*1000).format("DD/MM/YYYY") : moment((dateTSseg)*1000).format('LT')) : " ";

  const onClickAction = (error) => {
    props.goTo && props.goTo(error);
  }

  return (
    <div className="mini-drawer-content" onClick={() => { onClickAction(error) }}>
      <div className="mini-drawer-user">
        <ItemAvatar
          image={image ? config.api+image : getImageProfile(defaultImageType)}
        />
        <div style={{width:"80%"}}>
            <div className="chat-mini-details">
            <Typography noWrap style={{ fontSize:"17px", wordWrap: "break-word" }}>{error.reason}</Typography>
              <span className="chat-mini-time">{hour}</span>
            </div>
            <Typography noWrap style={{ fontSize:"16px", wordWrap: "break-word", color:"silver" }}>{description}</Typography>        
        </div>
      </div>
    </div>
  );
}

export default ItemErrorRow