import React, { createRef, useRef } from "react";

import "assets/styles/zendy-app.css";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ImageIcon from '@material-ui/icons/Image';
import DescriptionIcon from '@material-ui/icons/Description';
import EmojiPicker from "emoji-picker-react";
import ModalUploadImage from "components/Modals/ModalUploadImage";
import { createMessage } from "services/actions/MessageAction";
import { withRouter } from "react-router-dom";
import InputBase from '@material-ui/core/InputBase';
import ModalUploadFile from "components/Modals/ModalUploadFile";
import { Box } from "@material-ui/core";
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOff';
import { listActiveChats } from "services/actions/ChatAction";

const MainFooter = props => {
  const inputRef = createRef();

  const {user={}, chat={}} = props;

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

    if(type == "text" && !msg){
      return;
    }

    if(type == "image" && !uploadImage){
      return;
    }

    if(type == "file" && !uploadFile){
      return;
    }

    const imageInput = document.querySelector('#upload-image');
    const fileInput = document.querySelector('#upload-file');

    const formData = new FormData();
    formData.append("idChat", chat.id);
    formData.append("message", msg);
    formData.append("resend", resend);
    formData.append('image', imageInput.files[0] || null);
    formData.append('file', fileInput.files[0] || null);

    props.dispatch(createMessage(formData)).then((res) => {
      setMsg("");
      setShowEmoji(null);
      setShowPreviewImage(false);
      setShowPreviewFile(false);
      setUploadImage(null);
      setUploadFile(null);
      props.dispatch(listActiveChats("", "Vigente"));
      document.getElementById('upload-image').value = "";
      document.getElementById('upload-file').value = "";
    }).catch(error => {
      setUploadImage(null);
      setUploadFile(null);
      document.getElementById('upload-image').value = "";
      document.getElementById('upload-file').value = "";
    });
  }

  const pickEmoji = (e, {emoji}) => {
    const ref = inputRef.current;
    ref.focus();

    const start = msg.substring(0, ref.selectionStart);
    
    const message = msg + emoji;
    setMsg(message);
    setCursorPosition(start.length + emoji.length);
  };

  const handleShowEmojis = () => {
    inputRef.current.focus();
    setShowEmoji(!showEmoji);
  };

  const onStateChange = (e) => {
    setMsg(e.target.value);
  };

  const closeModalUpload = () => {
    setShowPreviewImage(false);
    setShowPreviewFile(false);
    setMsg("");
    setUploadImage(null);
    setUploadFile(null);
    setFileExtension(null);
    document.getElementById('upload-image').value = "";
    document.getElementById('upload-file').value = "";
  }

  function processImage(event){
    if(event && event.target.files && event.target.files.length > 0){
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setUploadImage(imageUrl)
        setShowPreviewImage(true);
    }else{
        setUploadImage(null)
    }
  }

  function processFile(event){
    if(event && event.target.files && event.target.files.length > 0){
        const file = event.target.files[0];
        const fileUrl = URL.createObjectURL(file);
        setUploadFile(fileUrl)
        setShowPreviewFile(true);
        setFileExtension(file.type);
    }else{
        setUploadFile(null)
    }
  }

  return (
      <>
        <div className="chat-footer">
          <Box>
            { showEmoji &&
              <IconButton className="chat-input-button" onClick={handleShowEmojis}> 
                <HighlightOffTwoToneIcon className="chat-input-icon" />
              </IconButton>
            }
            <IconButton className="chat-input-button" onClick={handleShowEmojis}> 
              <EmojiEmotionsIcon className="chat-input-icon"  />
            </IconButton>

            {showEmoji && (
                <div className="emojiPicker-wrapper">
                  <EmojiPicker onEmojiClick={pickEmoji} />              
                </div>
            )}
          </Box>

          <input accept="image/*" style={{display:'none'}} id="upload-image" type="file" onChange={processImage}/>
            <label htmlFor="upload-image">
              <IconButton className="chat-input-button" component="span">
                <ImageIcon style={{fontSize:"53px", color: "white", paddingBottom:"27px"}} />     
              </IconButton>
            </label>

          <input style={{display:'none'}} id="upload-file" type="file" onChange={processFile}/>
            <label htmlFor="upload-file">      
              <IconButton className="chat-input-button" component="span"> 
                <DescriptionIcon style={{fontSize:"53px", color: "white", paddingBottom:"27px"}} />
              </IconButton>
            </label>
          
          <InputBase
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

        {
          showPreviewImage && (
            <ModalUploadImage
              open={showPreviewImage}
              handleClose={closeModalUpload}
              uploadImage={uploadImage}
              msg={msg}
              onChangeMessage={onStateChange}
              sendMessage={() => { sendMessage("image") }}
            />
          )
        }
        {
          showPreviewFile && (
            <ModalUploadFile
              open={showPreviewFile}
              handleClose={closeModalUpload}
              uploadImage={uploadFile}
              fileExtension={fileExtension}
              msg={msg}
              onChangeMessage={onStateChange}
              sendMessage={() => { sendMessage("file") }}
            />
          )
        }
      </>     
  );
}

export default withRouter(MainFooter);
