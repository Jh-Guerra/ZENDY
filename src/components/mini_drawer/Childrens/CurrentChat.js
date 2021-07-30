import React, { Component } from 'react';
import ItemAvatarRow from '../Components/ItemAvatarRow';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase } from '@material-ui/core';
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

const CurrentChat = (props) => {

  const { classes={} } = props;

  const [allChats, setAllChats] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchTimeout, setSearchTimeout] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    onListClientChats("");
  }, []);

  const onListClientChats = (term) => {
    setLoading(true);
    props.dispatch(listClientChats(term)).then(res => {
      setAllChats(res || []);
      setLoading(false);
    });
  }

  const onSearch = (term) => {
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        onListClientChats(term);
      }, 1000)
    )
  }


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
        {props.itemxx}
        <Paper component="form" >
          <Grid container direction="row" >
          <IconButton style={{ marginLeft: '5px', padding:10 }} type="button" aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            style={{flex: 1, width: '80%'}}
            placeholder="Buscar contactos"
            onChange={(event) => onSearch(event.target.value)}
          />
          </Grid>
        </Paper>
        <div>
          <div className="chat-list-items">
            {allChats.map((chat, i) => {
              return (
                <div key={i}>
                  <ItemAvatarRow
                    image={chat.user.avatar || ""}
                    name={chat.receiver && (chat.receiver.firstName + " " + chat.receiver.lastName) || ""}
                    message={chat.lastMessage || "..."}
                    hour= {chat.lastMessageHour || "00:00"}
                    isOnline={chat.isOnline ? "active" : ""}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

}

export default withStyles(styles, { withTheme: true })(CurrentChat);
