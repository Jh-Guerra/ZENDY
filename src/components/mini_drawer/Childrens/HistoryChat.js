import React, { Component } from "react";
import ChatListBar from "./ChatListBar";
import NewChatCall from "./NewChatCall";
import CheckHistory from "./CheckHistory";
 
 

class HistoryChat extends Component {

 
    render() {
        return (
            
            <div className="mini-drawer-current-chat">
                
                <NewChatCall />
                <ChatListBar txt='Historial De Chats' itemxx={<CheckHistory/>}/>
                
            </div>
        )
    }
}
export default HistoryChat 