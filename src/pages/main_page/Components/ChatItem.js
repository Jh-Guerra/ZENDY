import React, { useState } from "react";
import ChatAvatar from "./ChatAvatar";
import IconButton from '@material-ui/core/IconButton';
import ReplyIcon from '@material-ui/icons/Reply';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import CustomModal from "components/Modals/common/CustomModal";
import { Button, withStyles } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import moment from 'moment';
import { Markup } from 'interweave';
import linkifyHtml from 'linkify-html';

const urlTextToHTML = (txt) => {
  txt = txt.replace('</', '&lt;/');
  txt = txt.replace('<', '&lt;');
  txt = txt.replace('>', '&gt;');
  return txt.replace(/(https?:\/\/(www\.[\w\.\-]+\.[a-z]{2,}[\/\w\.\-]*|[^www\.][\w\.\-]+\.[a-z]{2,}[\/\w\.\-]*))/gi, function (url) {
    return `<a href='` + url + `' target="_blank">` + url + `</a>`;
  });
}

// const urlTextToHTML = (txt) => {
//   var linkified = linkifyHtml(txt, {
//     defaultProtocol: 'https'
//   });
//   return linkified;
// };



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

  const hourChat = moment(hour).format('LT') || "00:00";


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
        {
          msg && (
            <div className="chat-msg">
              <Markup content={urlTextToHTML(msg)} />
            </div>
          )
        }
        {
          imageUpload && (
            <>
              <br />
              <a href={imageUpload} target="_blank">
                <img style={{ height: 120, width: 120, display: imageUpload ? "flex" : "none" }} src={imageUpload} />
              </a>
            </>
          )
        }
        {
          file && (
            <>
              <br />
              <Button
                variant="contained"
                color="secondary"
                href={file} target="_blank"
                endIcon={<GetAppIcon />}
              >
                Descargar
              </Button>
            </>
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