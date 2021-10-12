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

  const reason =  error.reason && error.reason.length > 33 ? error.reason.substring(0,30) + "..." : error.reason || "";
  const description = error.description && error.description.length > 48 ? error.description.substring(0,45) + "..." : error.description || "";
  const hour = error.updated_at && moment(error.updated_at).format('LT') || '00:00';

  const onClickAction = (error) => {
    props.goTo && props.goTo(error);
  }

  return (
    <div className="item-row" onClick={() => { onClickAction(error) }}>
      <ItemAvatar
        image={image ? config.api+image : getImageProfile(defaultImageType)}
      />
      <div style={{width:"80%"}}>
          <div className="item-row-section">
          < Typography className="item-row-title">{reason}</Typography>
            <span className="item-row-time">{hour}</span>
          </div>
          <Typography className="item-row-description">{description}</Typography>        
      </div>
    </div>
  );
}

export default ItemErrorRow