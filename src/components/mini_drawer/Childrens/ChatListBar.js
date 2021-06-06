import React, { Component, useState, createRef, useEffect } from "react";
import ItemAvatarRow from "../Components/ItemAvatarRow";
import { withStyles } from "@material-ui/core/styles";
import { Input, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  search: {
    position: 'relative',
    marginBottom: '30px'
  }
});


class ChatListBar extends Component {
  allChatUsers = [
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      name: "Tim Hover",
      message: "hola",
      hour: "10:20 pm",
      active: true,
      isOnline: true,
    },
    {
      image:"https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
      name: "Ayub Rossi",
      message: "hola",
      hour: "10:20 pm",
      active: false,
      isOnline: false,
    },
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      name: "Tim Hover",
      message: "hola",
      hour: "10:20 pm",
      active: true,
      isOnline: true,
    },
    {
      image:"https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
      name: "Ayub Rossi",
      message: "hola",
      hour: "10:20 pm",
      active: false,
      isOnline: false,
    },{
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      name: "Tim Hover",
      message: "hola",
      hour: "10:20 pm",
      active: true,
      isOnline: true,
    },
    {
      image:"https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
      name: "Ayub Rossi",
      message: "hola",
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
    const { classes } = this.props;
    return (  
      <div className="mini-drawer-chatlist">  
      <br />
          <div className="chatlist__heading">
            <span className="divider-line"></span>
              <p className="divider-content">
                  Chats Vigentes
              </p>
            <span className="divider-line"></span>
          </div>  
        <br />   
        <div className={`chatList__search ${classes.search}`}>
          {/* <div> */}
            <SearchIcon />
            <Input className="chatList__search search_wrap" 
              style={{paddingLeft: '10px', width: '90%', position: 'absolute',top: '0', left: '0', right: '0', margin: 'auto'}}
              // className={`${classes.search}`}
              type="text"
              placeholder="Buscar..."
              startAdornment= {
                <InputAdornment position="start" InputProps={{ disableUnderline: true }}>
                  <SearchIcon />
                </InputAdornment>
              }
              disableUnderline={true}
            />
            {/* <input type="text" placeholder="Buscar" className={`${classes.search}`} /> */}
          {/* </div> */}
        </div>
        <div className="chat-list-items">
          {this.state.allChats.map((item, index) => {
            return (

              <div key={index}>
                <ItemAvatarRow
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
export default withStyles(styles, { withTheme: true })(ChatListBar);
