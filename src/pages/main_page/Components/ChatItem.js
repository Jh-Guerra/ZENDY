import React, { useState} from "react";
import ChatAvatar from "./ChatAvatar";
import IconButton from '@material-ui/core/IconButton';
import ReplyIcon from '@material-ui/icons/Reply';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import CustomModal from "components/Modals/common/CustomModal";
import { Button, withStyles} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import moment from 'moment';

const ChatItem = props => {

   const [open, setOpen] = useState(false);
   const [showResendMessage, setShowResendMessage] = useState(false)

   const handleClickOpen = () => {
    setOpen((prev) => !prev);
   }


  const handleResendMessage = () => {
    setShowResendMessage(true);
}
 
    const { isMyMessage, msg, image, imageUpload, user, file, hour } = props;
    
    const hourChat =  moment(hour).format('LT')|| "00:00";
    
  
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat-item ${isMyMessage ? "me" : "other"}`}
    >
      <div className="chat-item-content">
        <div className="chat-meta">
          <span>{isMyMessage ? "Yo" : user}</span>
          <span>{hourChat}</span>
        </div>
        <div className="chat-msg">{msg}</div>
        <br />
        <a href={imageUpload} target="_blank"> 
        <img style={{height:120, width:120, display:imageUpload ? "flex" : "none"}} src={imageUpload} />
        </a>
        <br/>
        {
          file && (
            <Button variant="contained"
              href={file} target="_blank"
              endIcon={<GetAppIcon />}
              color="primary"
            >
              Descargar
            </Button>
          )
        }
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