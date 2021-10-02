import React, { createRef } from 'react';
import 'assets/styles/zendy-app.css';
import ChatItem from '../Components/ChatItem';
import CustomModal from 'components/Modals/common/CustomModal';
import { useHistory, withRouter } from 'react-router-dom';
import config from "config/Config";

/* const scrollToBottom = () => {
    // using scrollIntoView
    messagesEndRef.current.scrollIntoView({
      behavior: 'smooth'
    })
  } */

const MainBody = props => {
  const { messages = [], chat, user } = props;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="main-chat-content" >
      {messages.map((message, index) => {
        return (
          <ChatItem
            key={index}
            user={message.userFirstName + " " + message.userLastName}
            msg={message.message}
            resend={message.resend}
            image={message.userAvatar ? (config.api + message.userAvatar) : ""}
            isMyMessage={message.userId == user.id}
            imageUpload={message.image ? (config.api + message.image) : ""}
            file={message.file  ? (config.api + message.file) : ''}
            hour={message.created_at}
          />
        );
      })}
    </div>
  );
};

export default MainBody;
