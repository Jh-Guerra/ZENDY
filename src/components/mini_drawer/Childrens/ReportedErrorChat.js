import React from 'react'
import ChatListBarEnterprise from './ChatListBarEnterprise'
import ChatListBarReportedError from './ChatListBarReportedError'
import NewChatCall from './NewChatCall'

const ReportedErrorChat = () => {
    return (
        <div>
            <div className="mini-drawer-current-chat">
                <NewChatCall />
                <ChatListBarReportedError />
            </div>
        </div>
    )
}

export default ReportedErrorChat
