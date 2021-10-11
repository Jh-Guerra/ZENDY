import React, { Component, createRef } from "react";
import config from 'config/Config';

import ItemAvatar from "./ItemAvatar";
import { getImageProfile } from 'utils/common';

const ItemCompanyRow = (props) => {

  const { company={} } = props;

  const image = company.avatar || '';
  const name = company.name || "";
  const usersCount = company.usersCount || 0;

  const onClickAction = (company) => {
    props.goTo && props.goTo(company);
  }

  return (
    <div className="item-row-content" onClick={() => { onClickAction(company) }} style={{cursor:'pointer'}}>
      <div className="item-row-user">
        <ItemAvatar
          image={image ? config.api+image : getImageProfile("Company")}
          isChatCompany
        />
        <div style={{width:"80%"}}>
            <div className="chat-mini-details">
              <span style={{fontSize:"18px"}}>{name}</span>
            </div>
            <p style={{fontSize:"16px", color:"silver"}}>
              {usersCount} usuarios
            </p>
        </div>
      </div>
    </div>
  );
}

export default ItemCompanyRow