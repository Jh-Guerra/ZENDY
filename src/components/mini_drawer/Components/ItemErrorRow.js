import React, { Component, createRef } from "react";
import config from 'config/Config';

import ItemAvatar from "./ItemAvatar";
import { getImageProfile } from 'utils/common';
import moment from "moment";

const ItemErrorRow = (props) => {

  const { error={} } = props;

  const user = error.createdByUser;

  const image = user && user.avatar || "";
  const defaultImageType = user && user.sex || "O";
  const name = user && (user.firstName + ' ' + user.lastName) || "";

  const description = error.description || '...';
  const hour = error.createdDate && moment(error.createdDate).format("DD/MM/YYYY") || '00:00';

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
              <span style={{fontSize:"18px"}}>{name}</span>
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

export default ItemErrorRow