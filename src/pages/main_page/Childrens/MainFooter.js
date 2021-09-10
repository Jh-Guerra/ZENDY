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

const MainFooter = props => {
  const messagesEndRef = useRef(null);
  const inputRef = createRef();

  const chatItems = [
    {
      key: 1,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Hi Homero, How are you?",
      uploadImage: null,
    },
    {
      key: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I am fine.",
      uploadImage: null,
    },
    {
      key: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "What about you?",
      uploadImage: null,
    },
  ];

  const [chat, setChat] = React.useState([]);
  const [msg, setMsg] = React.useState("");
  const [showEmoji, setShowEmoji] = React.useState();
  const [cursorPosition, setCursorPosition] = React.useState();
  const [showPreviewImage, setShowPreviewImage] = React.useState(false);
  const [uploadImage, setUploadImage] = React.useState();


  /* const scrollToBottom = () => {
    // using scrollIntoView
    messagesEndRef.current.scrollIntoView({
      behavior: 'smooth'
    })
  } */

  React.useEffect(() => {
    setChat([...chatItems]);
    //scrollToBottom();
  }, []);

  React.useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const sendMessageWithEnter = () => {
    window.addEventListener("keydown", (event) => {
      if (event.key === 'Enter' && msg !== "") { 
          chatItems.push({
            key: 1,
            image:
            "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
            type: "",
            msg: msg,   
          });
          setChat([...chatItems]);
          setMsg("");
          setShowEmoji(null);   
      }
    });  
  }

  const sendMessage = () => {   
    if (msg !== "") {  
      chatItems.push({
        key: 1,
        image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
        type: "",
        msg: msg,   
      });
      setChat([...chatItems]);
      setMsg("");
      setShowEmoji(null);
      inputRef.current.focus();
    }  
  }

  const sendMessageWithImage = () => {   
    if (uploadImage !== null) {     
      chatItems.push({
        key: 1,
        image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
        type: "",
        msg: msg,
        uploadImage: uploadImage,   
      });
      setChat([...chatItems]);
      setMsg("");
      setShowPreviewImage(false);
      inputRef.current.focus();  
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
 
  return (   
      <div>

        <div className="main-chat-content" style={{overflow:'auto'}} ref={messagesEndRef}>
        
        {chat.map((itm, index) => {
              return (
                <ChatItem
                  key={index}
                  animationDelay={index + 2}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                  imageUpload={itm.uploadImage}
                />
              );
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
                     
          <IconButton className="chat-input-button"> 
            <DescriptionIcon className="chat-input-icon" />
          </IconButton>
          
          <input
            type="text"
            placeholder="Escribe un mensaje aquí."
            onChange={onStateChange}
            value={msg}
            ref={inputRef}
            onKeyDown={sendMessageWithEnter}     
          />
          <IconButton className="chat-input-button">
            <SendIcon className="chat-icon-send" onClick={sendMessage}/>
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

export default MainFooter;
