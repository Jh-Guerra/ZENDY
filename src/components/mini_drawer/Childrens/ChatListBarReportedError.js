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


class ChatListBarReportedError extends Component {
  allChatUsers = [
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      name: "Tim Hover",
      message: "Encontre un error en ......",
      hour: "01:00 am",
      active: true,
      isOnline: false,
    },
    {
      image:"https://placeimg.com/200/300/people",
      name: "Monster Inc.",
      message: "Me aparecio un error en el modulo ...",
      hour: "23:16 pm",
      active: false,
      isOnline: false,
    },
    {
      image:"https://picsum.photos/id/1032/200/300",
      name: "Ayub Rossi",
      message: "Buen dia. estoy reportando un error ...",
      hour: "20:00 pm",
      active: false,
      isOnline: false,
    },
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
                Errores Reportados
              </p>
            <span className="divider-line"></span>
          </div>  
        <br />   
        <div className={`${classes.search}`}>
          {/* <div> */}
            <SearchIcon />
            <Input className="search_wrap" 
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
          {this.state.allChats.map((item, i) => {
            return (
                <ItemAvatarRow
                  key={i}
                  chat={item}
                />
            );
          })}
        </div>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ChatListBarReportedError);
