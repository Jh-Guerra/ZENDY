import React, { Component } from 'react';
import ItemChatRow from '../Components/ItemChatRow';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { listActiveChats } from 'services/actions/ChatAction';
import NewChatCall from './NewChatCall';
import { useHistory } from 'react-router-dom';
import { showBackdrop } from 'services/actions/CustomAction';
import { count_chats } from 'services/actions/CountAction';

const styles = theme => ({
  search: {
    position: 'relative',
    marginBottom: '30px',
  },
});

const CurrentChat = props => {
  const { classes = {}, chatRx } = props;
  const history = useHistory();

  const [term, setTerm] = React.useState("");
  const [searchTimeout, setSearchTimeout] = React.useState(null);

  React.useEffect(() => {
    onListActiveChats('');
    setTerm("");
  }, []);

  const onListActiveChats = term => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listActiveChats(term, "Vigente", false)).then(res => {
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));
  };

  const onSearch = term => {
    clearTimeout(searchTimeout);
    setTerm(term)
    setSearchTimeout(
      setTimeout(() => {
        onListActiveChats(term);
      }, 1000)
    );
  };

  const goToChat = (chat) => {
    setTerm("");
    history.push(`/chats/${chat.id}`);
    onListActiveChats('');
  }

  const onSaveForm = () => {
    onListActiveChats('');
  }

  const chats = chatRx && chatRx.currentChats || [];

  React.useEffect(() => {
    if(!chats[0]?.isQuery)
    {
    const newArray = chats.filter((value) => value.participation.pendingMessages !== 0);
    props.dispatch(count_chats(newArray.length));
    }
  }, [chats])

  return (
    <div style={{ height: "79vh" }}>
      <Grid container style={{height: "100%"}}>
        <Grid item xs={12} style={{height: "8vh"}}>
          <NewChatCall onSaveForm={onSaveForm} />
        </Grid>
        <Grid item xs={12} style={{height: "5vh"}}>
          <div className="chatlist__heading">
            <span className="divider-line"></span>
            <p className="divider-content">Chats Vigentes </p>
            <span className="divider-line"></span>
          </div>
          <br />
        </Grid>
        <Grid item xs={12} style={{ padding: '10px 10px', height: "7vh" }}>
          <Input
            fullWidth
            className="search_wrap"
            type="text"
            placeholder="Buscar"
            onChange={event => onSearch(event.target.value)}
            disableUnderline
            value={term}
            startAdornment={
              <InputAdornment position="start">
                <IconButton type="button" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={12} style={{height: "59vh"}}>
          <div className="items-section">
            {
              (!chats || chats.lenght == 0) ? (
                <div className="container-not-found">
                  <p className="chat-not-found">No se encontró ningún chat</p>
                </div>
              ) : (
                chats && chats.map((chat, i) => {
                  return (
                    <ItemChatRow
                      key={i}
                      chat={chat}
                      // type={1}
                      goToChat={goToChat}
                    />
                  );
                })
              )
            }
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(CurrentChat);
