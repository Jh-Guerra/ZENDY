import React, { Component , useState} from "react";
import ChatAvatar from "./ChatAvatar";
import IconButton from '@material-ui/core/IconButton';
import ReplyIcon from '@material-ui/icons/Reply';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';


const ChatItem = props => {

   const [open, setOpen] = useState(false);
    
   const handleClickOpen = () => {
    setOpen((prev) => !prev);
   }
 
  const { user, message, image } = props;
  
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat-item ${user ? user : ""}`}
    >
      <Fade in={open} >
      <Tooltip title="Reenviar">
          <IconButton className="chat-input-button"> 
            <ReplyIcon className="chat-input-icon" />
         </IconButton>
      </Tooltip>
      </Fade>
      <div className="chat-item-content"  onClick={handleClickOpen} onChange={handleClickOpen}>
        <div className="chat-meta">
          <span>{user}</span>
          <span>12:05 PM</span>
        </div>
        <div className="chat-msg">{message}</div>
      </div>
      <ChatAvatar isOnline="active" image={image} />
    </div>
  );
}

export default ChatItem;