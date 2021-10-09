import React, { createRef, useRef } from "react";

import "assets/styles/zendy-app.css";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ImageIcon from '@material-ui/icons/Image';
import DescriptionIcon from '@material-ui/icons/Description';
import EmojiPicker from "emoji-picker-react";
import ModalUploadImage from "components/Modals/ModalUploadImage";
import { listMessage } from "services/actions/MessageAction";
import { showBackdrop } from "services/actions/CustomAction";
import { useHistory, withRouter } from "react-router-dom";
import InputBase from '@material-ui/core/InputBase';
import config from "../../../config/Config";
import ModalUploadFile from "components/Modals/ModalUploadFile";

const CHMainFooter = props => {
  const inputRef = createRef();

  const {user={}, chat={}, message={}} = props;

  const [msg, setMsg] = React.useState("");
  const [resend, setResend] = React.useState(false);
  const [showEmoji, setShowEmoji] = React.useState();
  const [cursorPosition, setCursorPosition] = React.useState();
  const [showPreviewImage, setShowPreviewImage] = React.useState(false);
  const [uploadImage, setUploadImage] = React.useState(null);
  const [showPreviewFile, setShowPreviewFile] = React.useState(false);
  const [uploadFile, setUploadFile] = React.useState(null);
  const [fileExtension, setFileExtension] = React.useState(null);

  React.useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const sendMessage = (type) => {   

  }

  const pickEmoji = (e, {emoji}) => {

  };

  const handleShowEmojis = () => {
 
  };

  const onStateChange = (e) => {
 
  };

  const closeModalUpload = () => {

  }

  function processImage(event){

  }

  function processFile(event){

  }

  return (
      <>
        <div className="chat-footer">
          <IconButton disabled className="chat-input-button" onClick={handleShowEmojis}> 
            <EmojiEmotionsIcon className="chat-input-icon"  />
            {showEmoji && (
                <div className="emojiPicker-wrapper">
                  <EmojiPicker onEmojiClick={pickEmoji} />              
                </div>
            )}
          </IconButton>

          <input disabled accept="image/*" style={{display:'none'}} id="upload-image" type="file" onChange={processImage}/>
            <label htmlFor="upload-image">
              <IconButton className="chat-input-button" component="span">
                <ImageIcon style={{fontSize:"53px", color: "white", paddingBottom:"27px"}} />     
              </IconButton>
            </label>

          <input disabled style={{display:'none'}} id="upload-file" type="file" onChange={processFile}/>
            <label htmlFor="upload-file">      
              <IconButton className="chat-input-button" component="span"> 
                <DescriptionIcon style={{fontSize:"53px", color: "white", paddingBottom:"27px"}} />
              </IconButton>
            </label>
          
          <InputBase
            disabled
            style={{ flex: 1, width: '80%' }}
            type="text"
            placeholder="Escribe un mensaje aquí."
            onChange={onStateChange}
            value={msg}
            ref={inputRef}
            onKeyPress={event => { event.key === 'Enter' && sendMessage("text") }}
          />
          <IconButton className="chat-input-button" onClick={() => { sendMessage("text") }}>
            <SendIcon className="chat-icon-send" />
          </IconButton>
         
        </div>


      </>     
  );
}

export default withRouter(CHMainFooter);
