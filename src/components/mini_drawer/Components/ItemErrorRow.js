import React, { Component, createRef } from "react";
import config from 'config/Config';

import ItemAvatar from "./ItemAvatar";
import defaultCompany from 'assets/images/defaultCompany.png';
import moment from "moment";
import { Typography } from "@material-ui/core";

const ItemErrorRow = (props) => {

  const { error={} } = props;

  const image = error && error.company && error.company.avatar || "";
  const description = error.description || '...';
  const hour = error.updated_at && moment(error.updated_at).format('LT') || '00:00';

  const onClickAction = (error) => {
    props.goTo && props.goTo(error);
  }

  return (
    <div className="mini-drawer-content" onClick={() => { onClickAction(error) }}>
      <div className="mini-drawer-user">
        <ItemAvatar
          image={image ? config.api+image : defaultCompany}
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