import React, { useState} from "react";
import ChatAvatar from "./ChatAvatar";
import IconButton from '@material-ui/core/IconButton';
import ReplyIcon from '@material-ui/icons/Reply';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import CustomModal from "components/Modals/common/CustomModal";

const ChatItem = props => {

   const [open, setOpen] = useState(false);
   const [showResendMessage, setShowResendMessage] = useState(false)

    
   const handleClickOpen = () => {
    setOpen((prev) => !prev);
   }


  const handleResendMessage = () => {
    setShowResendMessage(true);
}
 
  const { isMyMessage, msg, image, imageUpload, user, file } = props;
  
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat-item ${isMyMessage ? "me" : "other"}`}
    >
      <Fade in={open} >
      <Tooltip title="Reenviar">
          <IconButton onClick={handleResendMessage} className="chat-input-button"> 
            <ReplyIcon className="chat-input-icon" />
         </IconButton>
      </Tooltip>
      </Fade>
      <div className="chat-item-content"  onClick={handleClickOpen} onChange={handleClickOpen}>
        <div className="chat-meta">
          <span>{isMyMessage ? "Yo" : user}</span>
          <span>12:05 PM</span>
        </div>
        <div className="chat-msg">{msg}</div>
        <br />
        <img style={{height:120, width:120, display:imageUpload ? "flex" : "none"}} src={imageUpload} />

        <br/>
        <a href={file} target="_blank"> 
        <img style={{height:120, width:120, display:file ? "flex" : "none"}} src={file} />
        </a>
      </div>
      <ChatAvatar isOnline="active" image={image} />
      <CustomModal
        customModal="ModalResendMessage"
        open={showResendMessage} 
        handleClose={() => { setShowResendMessage(false); }}
      />
    </div>
  );
}

export default ChatItem;