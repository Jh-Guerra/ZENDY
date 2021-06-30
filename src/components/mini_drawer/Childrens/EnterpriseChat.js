import React from 'react'
import ChatListBarEnterprise from './ChatListBarEnterprise'
import NewChatCall from './NewChatCall'

const EnterpriseChat = () => {
    return (
        <div>
            <div className="mini-drawer-current-chat">
                <NewChatCall />
                <ChatListBarEnterprise />
            </div>
        </div>
    )
}

export default EnterpriseChat
