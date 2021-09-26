import React, { createRef, useRef } from "react";

import "assets/styles/zendy-app.css";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ImageIcon from '@material-ui/icons/Image';
import DescriptionIcon from '@material-ui/icons/Description';
import ChatItem from "../Components/ChatItem";
import EmojiPicker from "emoji-picker-react";
// import ScrollToBottom from "react-scroll-to-bottom";
import ModalUploadImage from "components/Modals/ModalUploadImage";
import { createMessage, listMessage } from "services/actions/MessageAction";
import { showBackdrop } from "services/actions/CustomAction";
import { useHistory, withRouter } from "react-router-dom";
import InputBase from '@material-ui/core/InputBase';
import config from "../../../config/Config";

const MainFooter = props => {
  console.log("props",props);
  //const messagesEndRef = useRef(null);
  const inputRef = createRef();

  const {user={}, chat={}, messages=[], message={}} = props;

  const [msg, setMsg] = React.useState("");
  const [resend, setResend] = React.useState(false);
  const [showEmoji, setShowEmoji] = React.useState();
  const [cursorPosition, setCursorPosition] = React.useState();
  const [showPreviewImage, setShowPreviewImage] = React.useState(false);
  const [uploadImage, setUploadImage] = React.useState(null);
  const [uploadFile, setUploadFile] = React.useState(null);

  /* const scrollToBottom = () => {
    // using scrollIntoView
    messagesEndRef.current.scrollIntoView({
      behavior: 'smooth'
    })
  } */

  React.useEffect(() => {
    props.onListMessages(chat.id);
  }, [chat.id]);

  React.useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  React.useEffect(() => {
    //saveMessage();
  }, []);

  const sendMessageWithEnter = (event) => {
   
      if (event.key === 'Enter' && msg !== "") { 
        console.log("chat",chat);

        const contentMessage = {
          idChat: chat.id,
          message: msg,
          resend: resend,
          image: null,
          file: null,
        };
        
        setMsg("");
        setShowEmoji(null); 
        
        props.dispatch(createMessage(contentMessage)).then((res) => {
          console.log("res",res);
          props.onListMessages(contentMessage.idChat);
        }).catch(error => {
            console.error('error', error);
          });   
      }
     
  }

  const sendMessage = () => {   
    if (msg !== "") { 

      const contentMessage = {
        idChat: chat.id,
        message: msg,
        resend: resend,
        image: null,
        file: null,
      };
      
      setMsg("");
      setShowEmoji(null); 
      
      props.dispatch(createMessage(contentMessage)).then((res) => {
        console.log("res",res);
        props.onListMessages(contentMessage.idChat);
      }).catch(error => {
          console.error('error', error);
        });      
    }
  }

  const sendMessageWithImage = () => {   
    if (uploadImage !== "" || msg !== "") { 

      const contentMessage = {
        idChat: chat.id,
        message: msg,
        resend: resend,
        image: uploadImage,
        file: uploadFile,
      };

      const imageInput = document.querySelector('#upload-image');
      const fileInput = document.querySelector('#file');

      const formData = new FormData();
      formData.append("idChat", contentMessage.idChat);
      formData.append("message", contentMessage.message);
      formData.append("resend", contentMessage.resend);
      formData.append('image', imageInput.files[0] || '');
      formData.append('file', fileInput.files[0] || '');
      
      setMsg("");
      setShowEmoji(null);
      setShowPreviewImage(false); 
      
      props.dispatch(createMessage(formData)).then((res) => {
        console.log("res",res);
        props.onListMessages(contentMessage.idChat);
      }).catch(error => {
          console.error('error', error);
        });      
    }
  }

  const pickEmoji = (e, {emoji}) => {
    const ref = inputRef.current;
    ref.focus();
    const start = msg.substring(0, ref.selectionStart);
    const end = msg.substring(ref.selectionStart);
    const message = start + emoji + end;
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

  const closeModalUploadImage = () => {
    setShowPreviewImage(false);
    setMsg("");
    setUploadImage(null);
    setUploadFile(null);
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
        setShowPreviewImage(true);
    }else{
        setUploadFile(null)
    }
  }

  return (   
      <div>

        <div className="main-chat-content" style={{overflow:'auto'}} /* ref={messagesEndRef} */>
              {messages.map((message, index) => {
                return (
                  <ChatItem
                  user={chat.user.firstName}       
                  msg={message.message}    
                  resend={message.resend}   
                  imageUpload={uploadImage ? uploadImage : (message.image ? (config.api+message.image) : "")}
                  file={uploadFile ? uploadFile : (message.file ? (config.api+message.file) : "")}
                  />
                )
              })}
                 
        </div>    

        <div className="chat-footer">
          <IconButton className="chat-input-button" onClick={handleShowEmojis}> 
            <EmojiEmotionsIcon className="chat-input-icon"  />
            {showEmoji && (
                <div className="emojiPicker-wrapper">
                  <EmojiPicker onEmojiClick={pickEmoji} />              
                </div>
            )}
          </IconButton>

          <input accept="image/*" style={{display:'none'}} id="upload-image" type="file" onChange={processImage}/>
            <label htmlFor="upload-image">
              <IconButton className="chat-input-button" component="span">
                <ImageIcon style={{fontSize:"53px", color: "white", paddingBottom:"27px"}} />     
              </IconButton>
            </label>

          <input style={{display:'none'}} id="file" type="file" onChange={processFile}/>
            <label htmlFor="file">      
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
            onKeyPress={sendMessageWithEnter}     
          />
          <IconButton className="chat-input-button">
            <SendIcon className="chat-icon-send" onClick={sendMessage} />
          </IconButton>
         
        </div>

        <ModalUploadImage
            open={showPreviewImage}
            handleClose={closeModalUploadImage}
            uploadImage={uploadImage}
            msg={msg}
            onChangeMessage={onStateChange}
            sendMessageWithImage={sendMessageWithImage}
        >
        </ModalUploadImage>

      </div>         
  );
}

export default withRouter(MainFooter);
