import React, { Component, createRef } from "react";

import "./chatContent.css";
import ChatItem from "./ChatItem";

const ChatBody = props => {
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

  const [chat, setChat] = React.useState([]);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    setChat([...chatItems]);
    setMessage("");
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <div className="main__chatcontent">
      <div className="content__body">
        <div className="chat__items">
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
        </div>
      </div>
    </div>
  );

}

export default ChatBody;