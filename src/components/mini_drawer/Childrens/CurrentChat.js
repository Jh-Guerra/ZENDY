import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import ChatListBar from "./ChatListBar";
import NewChatCall from "./NewChatCall";

class CurrentChat extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="mini-drawer-current-chat">
                <NewChatCall />
                <ChatListBar />
            </div>
        )
    }
}
export default CurrentChat