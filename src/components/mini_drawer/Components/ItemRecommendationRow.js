import React, { Component, createRef } from "react";
import config from 'config/Config';

import ItemAvatar from "./ItemAvatar";
import { getImageProfile } from 'utils/common';
import { textDescripcion, textTitulo } from "assets/styles/zendy-css";

const ItemRecommendationRow = (props) => {
  const { recommendation={} } = props;

  const image = recommendation.userAvatar || '';
  const name = recommendation.userFirstName + " " + recommendation.userLastName;
  const defaultImageType = recommendation.userSex || "0";

  const onClickAction = (recommendation) => {
    props.goTo && props.goTo(recommendation);
  }

  return (
    <div className="item-row-content" onClick={() => { onClickAction(recommendation) }} style={{cursor:'pointer'}}>
      <div className="item-row-user">
        <ItemAvatar
          image={image ? config.api+image : getImageProfile(defaultImageType)}
        />
        <div style={{width:"80%"}}>
            <div className="chat-mini-details">
              <span style={{fontSize:textTitulo}}>{name}</span>
            </div>
            <p style={{fontSize:textDescripcion}}>
              {recommendation.queryReason || ""}
            </p>
        </div>
      </div>
    </div>
  );
}

export default ItemRecommendationRow