import React, { Component, useState, createRef, useEffect } from "react";
import ItemAvatarDate from "../Components/ItemAvatarDate";

class ChatListBar extends Component {
  allChatUsers = [
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      name: "Tim Hover",
      message: "hola..............",
      hour: "10:20 pm",
      active: true,
      isOnline: true,
    },
    {
      image:"https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
      name: "Ayub Rossi",
      message: "..............hola",
      hour: "10:20 pm",
      active: false,
      isOnline: false,
    },
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      name: "Tim Hover",
      message: "hola..............",
      hour: "10:20 pm",
      active: true,
      isOnline: true,
    },
    {
      image:"https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
      name: "Ayub Rossi",
      message: "..............hola",
      hour: "10:20 pm",
      active: false,
      isOnline: false,
    },{
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      name: "Tim Hover",
      message: "hola..............",
      hour: "10:20 pm",
      active: true,
      isOnline: true,
    },
    {
      image:"https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
      name: "Ayub Rossi",
      message: "..............hola",
      hour: "10:20 pm",
      active: false,
      isOnline: false,
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      allChats: this.allChatUsers,
    };
  }
  render() {
    return (
      <div className="mini-drawer-chatlist">
        <div className="chatlist__heading">
          <h2>--------Chats----------------</h2>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Buscar..." />
          </div>
        </div>
        <div className="chatlist__items">
          {this.state.allChats.map((item, index) => {
            return (

              <div key={index}>
                <ItemAvatarDate 
                  image={item.image}
                  name={item.name}
                  message={item.message}
                  hour= {item.hour}
                  active={item.active ? "active" : ""}
                  isOnline={item.isOnline ? "active" : ""}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default ChatListBar
