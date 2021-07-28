import React, { Component } from 'react';
import ItemAvatarRow from '../Components/ItemAvatarRow';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ItemAvatarNotifyRow from '../Components/ItemAvatarNotifyRow';
import { listClientChats } from 'services/actions/ChatAction';
import NewChatCall from './NewChatCall';

const styles = theme => ({
  search: {
    position: 'relative',
    marginBottom: '30px',
  },
});

class CurrentChat extends Component {

  // {
  //   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU',
  //   name: 'Tim Hover',
  //   message: 'hola',
  //   hour: '10:20 pm',
  //   active: true,
  //   isOnline: true,
  // },

  constructor(props) {
    super(props);
    this.state = {
      allChats: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.onListClientChats();
  }

  onListClientChats = () => {
    this.setState({ loading: true });
    this.props.dispatch(listClientChats()).then(res => {
      this.setState({
        allChats: res || [],
        loading: false,
      });
    });
  };

  render() {
    const { classes } = this.props;
    const { allChats = [], loading } = this.state;

    return (
      <div className="mini-drawer-current-chat">
        <NewChatCall />
        <div className="mini-drawer-chatlist">
          <br />
          <div className="chatlist__heading">
            <span className="divider-line"></span>
            <p className="divider-content">Chats Vigentes</p>
            <span className="divider-line"></span>
          </div>
          <br />
          {this.props.itemxx}
          <div>
            <div className={`chatList__search ${classes.search}`}>
              <SearchIcon />
              <Input
                className="chatList__search search_wrap"
                style={{
                  paddingLeft: '10px',
                  width: '90%',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  margin: 'auto',
                }}
                type="text"
                placeholder="Buscar..."
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                disableUnderline={true}
              />
            </div>
          </div>

          <div>
            <div className="chat-list-items">
              {/* {allChats.map((item, index) => {
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
              })} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(CurrentChat);
