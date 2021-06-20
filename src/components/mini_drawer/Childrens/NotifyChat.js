import React, { Component } from "react";
import NewNotify from "./NewNotify";
import ChartListBarNotify from "./ChartListBarNotify";

class NotifyChat extends Component {
    render() {
        return (
            <div className="mini-drawer-current-chat">
                <NewNotify />
                <ChartListBarNotify   txt='Notificaciones'  />
            </div>
        )
    }
}
export default NotifyChat 