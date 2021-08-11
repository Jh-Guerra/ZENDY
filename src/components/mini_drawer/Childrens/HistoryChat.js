import React, { Component } from "react";
import NewChatCall from "./NewChatCall";
import CheckHistory from "../Components/CheckHistory";
 
 

class HistoryChat extends Component {
    render() {
        return (
            <div style={{height: "79vh"}}>
                <NewChatCall />
                {/* <ChatListBar txt='Historial De Chats' itemxx={<CheckHistory/>}/> */}
            </div>
        )
    }
}
export default HistoryChat 