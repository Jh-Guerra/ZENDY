import React, { createRef } from "react";
import "assets/styles/zendy-app.css";
import ChatItem from "../Components/ChatItem";
import CustomModal from "components/Modals/common/CustomModal";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ImageIcon from '@material-ui/icons/Image';
import DescriptionIcon from '@material-ui/icons/Description';
import EmojiPicker from 'emoji-picker-react'

const MainBody = () => {
  var messagesEndRef = createRef(null);

  const chatItems = [
    {
      key: 1,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Hi Homero, How are you?",
    },
    {
      key: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I am fine.",
    },
    {
      key: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "What about you?",
    },
    {
      key: 4,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Awesome these days.",
    },
    {
      key: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "Finally. What's the plan?",
    },
    {
      key: 6,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "what plan mate?",
    },
    {
      key: 7,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I'm taliking about the tutorial",
    },
  ];

  const inputRef = createRef();
  const [chat, setChat] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [showEmoji, setShowEmoji] = React.useState();
  const [cursorPosition, setCursorPosition] = React.useState();

  React.useEffect(() => {
    setChat([...chatItems]);
    scrollToBottom();
  }, []);

  React.useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const pickEmoji = (e, {emoji}) => {
    const ref = inputRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const msg = start + emoji + end;
    setMessage(msg);
    setCursorPosition(start.length + emoji.length);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = e => {
    setMessage(e.target.value);
  };

  const handleShowEmojis = () => {
    inputRef.current.focus();
    setShowEmoji(!showEmoji);
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }; 

  return (

    <div showEmoji={showEmoji}>

      <div className="main-chat-content">
        {chat.map((itm, index) => {
              return (
                <ChatItem
                  key={index}
                  animationDelay={index + 2}
                  user={itm.type ? itm.type : "me"}
                  message={itm.msg}
                  image={itm.image}
                />
              );
            })}
            
        <div ref={messagesEndRef} />
              
        <CustomModal 
          customModal="ModalAcceptChat"
          open={open} 
          handleClose={handleClose}
        />
   
      </div>

        {!showEmoji && (
        <div>
          <EmojiPicker onEmojiClick={pickEmoji} />
            {showEmoji}
        </div>
        )} 

        <div className="chat-footer">
        
            <IconButton className="chat-input-button"> 
              <EmojiEmotionsIcon className="chat-input-icon" onClick={handleShowEmojis} />
            </IconButton>
            <IconButton className="chat-input-button"> 
              <ImageIcon className="chat-input-icon" />
            </IconButton>
            <IconButton className="chat-input-button"> 
              <DescriptionIcon className="chat-input-icon" />
            </IconButton>
        
            <input
              type="text"
              placeholder="Escribe un mensaje aquí."
              onChange={handleChange}
              value={message}
              ref={inputRef}
            />
            <IconButton className="chat-input-button">
              <SendIcon className="chat-icon-send" />
            </IconButton>
        </div>

    </div>
  );

}

export default MainBody;