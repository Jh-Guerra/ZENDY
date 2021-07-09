import React, { Component } from "react";
import ItemAvatarRow from "../Components/ItemAvatarRow";
import { withStyles } from "@material-ui/core/styles";
import { Input, InputAdornment } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  search: {
    position: 'relative',
    marginBottom: '30px'
  }
});


class ChatListBarEntryQuery extends Component {
  allChatUsers = [
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      name: "Tim Hover",
      message: "Buen dia. tengo la siguiente consulta ...",
      hour: "20:00 pm",
      active: true,
      isOnline: false,
    },
    {
      image:"https://picsum.photos/id/1029/200/300",
      name: "Mason Connor",
      message: "Buen dia. tengo la siguiente consulta ...",
      hour: "23:16 pm",
      active: false,
      isOnline: false,
    },
    {
      image:"https://picsum.photos/id/1032/200/300",
      name: "Moe's Enterprise",
      message: "Buen dia. tengo la siguiente consulta ...",
      hour: "ayer",
      active: true,
      isOnline: false,
    },
    {
      image:"https://picsum.photos/id/1064/200/300",
      name: "Harry Liam",
      message: "Buen dia. tengo la siguiente consulta ...",
      hour: "ayer",
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
                Consultas Entrantes
              </p>
            <span className="divider-line"></span>
          </div>  
        <br />   
        <div className={`chatList__search ${classes.search}`}>
          {/* <div> */}
            <SearchIcon />
            <Input className="chatList__search search_wrap" 
              style={{paddingLeft: '10px', width: '90%', position: 'absolute',top: '0', left: '0', right: '0', margin: 'auto'}}
              type="text"
              placeholder="Buscar..."
              startAdornment= {
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              disableUnderline={true}
            />
        </div>
        <div className="chat-list-items">
          {this.state.allChats.map((item, index) => {
            return (

              <div key={index}>
                <ItemAvatarRow
                  image={item.image}
                  name={item.name}
                  message={item.message}
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
export default withStyles(styles, { withTheme: true })(ChatListBarEntryQuery);
