import React, { Component } from 'react';
import ItemAvatarRow from '../Components/ItemAvatarRow';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ItemAvatarNotifyRow from '../Components/ItemAvatarNotifyRow';
import { listStatusChats } from 'services/actions/ChatAction';
import NewChatCall from './NewChatCall';
import { useHistory } from 'react-router-dom';
import { showBackdrop } from 'services/actions/CustomAction';

const styles = theme => ({
  search: {
    position: 'relative',
    marginBottom: '30px',
  },
});

const CurrentChat = props => {
  const { classes = {} } = props;
  const history = useHistory();

  const [allChats, setAllChats] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);

  React.useEffect(() => {
    onListStatusChats('');
  }, []);

  const onListStatusChats = term => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listStatusChats(term, "Vigente")).then(res => {
      setAllChats(res || []);
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));
  };

  const onSearch = term => {
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        onListStatusChats(term);
      }, 1000)
    );
  };

  const goToChat = (chat) => {
    history.push(`/chat/${chat.type}/${chat.id}`);
  }

  const onSaveForm = () => {
    onListStatusChats('');
  }

  return (
    <div style={{height: "79vh"}}>
      <Grid container style={{height: "100%"}}>
        <Grid item xs={12}>
          <NewChatCall onSaveForm={onSaveForm} />
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={12}>
            <div className="chatlist__heading">
              <span className="divider-line"></span>
              <p className="divider-content">Chats Vigentes</p>
              <span className="divider-line"></span>
            </div>
            <br />
          </Grid>
          <Grid item xs={12} style={{padding: '10px'}}>
            <Input
              fullWidth
              className="search_wrap"
              type="text"
              placeholder="Buscar contactos"
              onChange={event => onSearch(event.target.value)}
              disableUnderline
              startAdornment= {
                <InputAdornment position="start">
                  <IconButton type="button" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <br />
          <Grid item xs={12} style={{minHeight: "550px"}}>
            <div className="chat-list-items">
              {allChats.map((chat, i) => {
                return (
                  <ItemAvatarRow
                    key={i}
                    chat={chat}
                    goToChat={goToChat}
                  />
                );
              })}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(CurrentChat);
