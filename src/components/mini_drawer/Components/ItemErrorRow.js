import React, { Component, createRef } from "react";
import config from 'config/Config';

import ItemAvatar from "./ItemAvatar";
import { getImageProfile } from 'utils/common';
import moment from "moment";
import { Typography } from "@material-ui/core";
import { textDescripcion, textTitulo } from "assets/styles/zendy-css";

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
    <div className="item-row-content" onClick={() => { onClickAction(error) }}>
      <div className="item-row-user">
        <ItemAvatar
          image={image ? config.api+image : getImageProfile(defaultImageType)}
        />
        <div style={{width:"80%"}}>
            <div className="chat-mini-details">
            <Typography noWrap style={{ fontSize:textTitulo, wordWrap: "break-word" }}>{reason}</Typography>
              <span className="chat-mini-time">{hour}</span>
            </div>
            <Typography noWrap style={{ fontSize:textDescripcion, wordWrap: "break-word", color:"silver" }}>{description}</Typography>        
        </div>
      </div>
    </div>
  );
}

export default ItemErrorRow