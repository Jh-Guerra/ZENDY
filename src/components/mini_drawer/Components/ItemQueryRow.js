import React, { Component, createRef } from "react";
import config from 'config/Config';

import ItemAvatar from "./ItemAvatar";
import { getImageProfile } from 'utils/common';

const ItemQueryRow = (props) => {

  const { query={} } = props;

  const image =  '';
  const description = query.description || "";
  const reason = query.reason || 0;

  const onClickAction = (query) => {
    props.goTo && props.goTo(query);
  }

  return (
    <div className="mini-drawer-content" onClick={() => { onClickAction(query) }} style={{cursor: "pointer"}}>
      <div className="mini-drawer-user">
        <ItemAvatar
          image={image ? config.api+image : getImageProfile("Company")}
          isChatCompany
        />
        <div style={{width:"80%"}}>
            <div className="chat-mini-details">
              <span style={{fontSize:"18px"}}>{reason}</span>
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