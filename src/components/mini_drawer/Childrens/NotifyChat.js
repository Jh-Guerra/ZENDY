import React, { Component } from "react";
import NewNotify from "./NewNotify";
import ChartListBarNotify from "./ChartListBarNotify";

class NotifyChat extends Component {
    render() {
        return (
            <div style={{height: "79vh"}}>
                <NewNotify />
                <ChartListBarNotify   txt='Notificaciones'  />
            </div>
        )
    }
}
export default NotifyChat 