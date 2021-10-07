import React, { createRef } from 'react';
import 'assets/styles/zendy-app.css';
import ChatItem from '../Components/ChatItem';
import CustomModal from 'components/Modals/common/CustomModal';
import { useHistory, withRouter } from 'react-router-dom';
import config from "config/Config";
import { getImageProfile } from 'utils/common';

const MainBody = props => {
  const { messages = [], chat, user } = props;
  const messagesEndRef = React.useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(scrollToBottom, [messages]);

  return (
    <div className="main-chat-content" >
      {messages.map((message, index) => {
        var defaultImageType = message.userSex || "O";

        return (
          <ChatItem
            key={index}
            user={message.userFirstName + " " + message.userLastName}
            msg={message.message}
            resend={message.resend}
            image={message.userAvatar ? (config.api + message.userAvatar) : getImageProfile(defaultImageType)}
            isMyMessage={message.userId == user.id}
            imageUpload={message.image ? (config.api + message.image) : ""}
            file={message.file  ? (config.api + message.file) : ''}
            hour={message.created_at}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MainBody;
