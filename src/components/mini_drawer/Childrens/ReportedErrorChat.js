import React from 'react'
import ChatListBarReportedError from './ChatListBarReportedError'
import NewChatCall from './NewChatCall'

const ReportedErrorChat = () => {
    return (
        <div>
            <div style={{height: "79vh"}}>
                <NewChatCall />
                <ChatListBarReportedError />
            </div>
        </div>
    )
}

export default ReportedErrorChat
