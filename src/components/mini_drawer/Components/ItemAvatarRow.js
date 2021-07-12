import React, { Component, createRef } from "react";

import ItemAvatar from "./ItemAvatar";

 class ItemAvatarRow extends Component {
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
                isChatCompany={this.props.isChatCompany}
              />
              <div style={{width:"80%"}}>
                  <div className="chat-mini-details">
                    <span style={{fontSize:"18px"}}>{this.props.name}</span>
                    {
                      (this.props.hour) 
                        && 
                      <span className="chat-mini-time">{this.props.hour}</span>
                    }
                  </div>                
                  <p style={{fontSize:"16px", color:"silver"}}>
                    {this.props.message}
                  </p>
              </div>
            </div>
          </div>
    );
  }
}
export default ItemAvatarRow