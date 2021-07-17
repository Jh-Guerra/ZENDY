import React from 'react'
import ChatListBarEnterprise from './ChatListBarEnterprise'
import NewChatCall from './NewChatCall'

const EnterpriseChat = (props) => {
    return (
        <div>
            <div className="mini-drawer-current-chat">
                <NewChatCall
                    isChatCompany={true} />
                <ChatListBarEnterprise
                    {...props}
                    goToView={props.goToView}
                />
            </div>
        </div>
    )
}

export default EnterpriseChat
