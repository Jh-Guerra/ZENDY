import React from 'react'
import ChatListBarEntryQuery from './ChatListBarEntryQuery'
import NewChatCall from './NewChatCall'

const EntryQueryChat = () => {
    return (
        <div>
            <div className="mini-drawer-current-chat">
                <NewChatCall />
                <ChatListBarEntryQuery />
            </div>
        </div>
    )
}

export default EntryQueryChat
