import React, { createRef } from "react";

import "assets/styles/zendy-app.css";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ImageIcon from '@material-ui/icons/Image';
import DescriptionIcon from '@material-ui/icons/Description';
import ChatItem from "../Components/ChatItem";
import EmojiPicker from "emoji-picker-react";

const MainFooter = props => {
  var messagesEndRef = createRef(null);
  const inputRef = createRef();

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
  ];

  const [chat, setChat] = React.useState([]);
  const [msg, setMsg] = React.useState("");
  const [showEmoji, setShowEmoji] = React.useState();
  const [cursorPosition, setCursorPosition] = React.useState();

  React.useEffect(() => {
    setChat([...chatItems]);
    //scrollToBottom();
  }, []);

  React.useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  /* const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }; */

  React.useEffect(() => {
      window.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
          if (msg != "") {  
          chatItems.push({
            key: 1,
            image:
            "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
            type: "",
            msg: msg,   
            });
            setChat([...chatItems]);
            //scrollToBottom();
            setMsg("");
          }
        }
      //scrollToBottom();
      });  
  }, [msg]);

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
 
  return ( 
      <div>
        <div className="main-chat-content">
        {chat.map((itm, index) => {
              return (
                <ChatItem
                  key={index}
                  animationDelay={index + 2}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.msg}
                  image={itm.image}
                />
              );
            })}

            <div ref={messagesEndRef} />
        </div>

        <div className="chat-footer">
          <IconButton className="chat-input-button"> 
            <EmojiEmotionsIcon className="chat-input-icon" onClick={handleShowEmojis} />
            {showEmoji && (
                <div className="emojiPicker-wrapper">
                  <EmojiPicker onEmojiClick={pickEmoji} />              
                </div>
            )}
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
            onChange={onStateChange}
            value={msg}
            ref={inputRef}
          />
          <IconButton className="chat-input-button">
            <SendIcon className="chat-icon-send" />
          </IconButton>
        </div>
      </div>     
  );
}

export default MainFooter;
