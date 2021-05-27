import React, { Component, useState, createRef, useEffect } from "react";

import ItemAvatar from "./ItemAvatar";

 class ItemAvatarDate extends Component {
  messagesEndRef = createRef(null);

  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatItms,
      msg: "",
    };
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    
  }
  

  render() {
    return (
        <div className="mini-drawer-content">
            <div className="mini-drawer-user">
              <ItemAvatar
                isOnline={this.props.isOnline}
                image={this.props.image ? this.props.image : "http://placehold.it/80x80"}
              />
              <div className="itemData">
                  <div className="HeaderAvatar">
                    <p>{this.props.name}...........</p>
                    <p className="hora">{this.props.hour}</p>
                  </div>                
                <p>{this.props.message}</p>
              </div>
            </div>
          </div>
    );
  }
}
export default ItemAvatarDate