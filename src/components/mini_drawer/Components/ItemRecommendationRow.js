import React, { Component, createRef } from "react";
import config from 'config/Config';

import ItemAvatar from "./ItemAvatar";
import { getImageProfile } from 'utils/common';

const ItemRecommendationRow = (props) => {
  const { recommendation={} } = props;

  const image = recommendation.userAvatar || '';
  const name = recommendation.userFirstName + " " + recommendation.userLastName;
  const defaultImageType = recommendation.userSex || "0";

  const onClickAction = (recommendation) => {
    props.goTo && props.goTo(recommendation);
  }

  return (
    <div className="mini-drawer-content" onClick={() => { onClickAction(recommendation) }} style={{cursor:'pointer'}}>
      <div className="mini-drawer-user">
        <ItemAvatar
          image={image ? config.api+image : getImageProfile(defaultImageType)}
        />
        <div style={{width:"80%"}}>
            <div className="chat-mini-details">
              <span style={{fontSize:"18px"}}>{name}</span>
            </div>
            <p style={{fontSize:"16px", color:"silver"}}>
              {recommendation.queryReason || ""}
            </p>
        </div>
      </div>
    </div>
  );
}

export default ItemRecommendationRow