import React, { Component, createRef } from "react";
import ItemAvatarT from "./ItemAvatarText";

class ItemAvatarNotifyRow extends Component {
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
                    <ItemAvatarT
                    isOnline={this.props.isOnline}
                    Area={this.props.Area ? this.props.Area : "http://placehold.it/80x80"}/>
            <div style={{width:"80%"}}>
                <div className="chat-mini-details">
                    <span style={{fontSize:"18px"}}>{this.props.Title}</span>
                    <span className="chat-mini-time">{this.props.hour}</span>
                </div>                
                    <p style={{fontSize:"14px", color:"gray"}}>
                    {this.props.message}
                    </p>
                </div>
            </div>
        </div>
    );
}
}
export default ItemAvatarNotifyRow