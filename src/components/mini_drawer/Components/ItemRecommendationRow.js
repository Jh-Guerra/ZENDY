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
    <div className="item-row" onClick={() => { onClickAction(recommendation) }} style={{cursor:'pointer'}}>
      <ItemAvatar
        image={image ? config.api+image : getImageProfile(defaultImageType)}
      />
      <div style={{width:"80%"}}>
          <div className="item-row-section">
            <span className="item-row-title">{name}</span>
          </div>
          <p className="item-row-description">
            {recommendation.queryReason || ""}
          </p>
      </div>
    </div>
  );
}

export default ItemRecommendationRow