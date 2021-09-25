import React, { Component } from "react";
import NewChatCall from "./NewChatCall";
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CheckHistory from "../Components/CheckHistory";
import {Input, InputAdornment, Paper, Grid, IconButton, InputBase } from "@material-ui/core";
import { listNotActiveChats } from 'services/actions/ChatAction';
import SearchIcon from '@material-ui/icons/Search';
import ItemAvatarRow from "../Components/ItemAvatarRow";
import { showBackdrop } from 'services/actions/CustomAction';

 
 
const styles = theme => ({
  search: {
    position: 'relative',
    marginBottom: '30px',
  },
}); 

const HistoryChat = props => {
  const { classes = {} } = props;
  const history = useHistory();

  const [allChats, setAllChats] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const isEmpty = allChats.length === 0;

  React.useEffect(() => {
    onListNotActiveChats('');
  }, []);

  const onListNotActiveChats = term => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listNotActiveChats(term, "Finalizado")).then(res => {
      setAllChats(res || []);
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));
  };

  const onSearch = term => {
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        onListNotActiveChats(term);
      }, 1000)
    );
  };

  const goToChat = (chat) => {
    history.push(`/chat/${chat.type}/${chat.id}`);
  }
  const onSaveForm = () => {
    onListNotActiveChats('');
  }

  return (
    <div style={{height: "79vh"}}>
        <Grid container>
        <Grid item xs={12}>
          <NewChatCall onSaveForm={onSaveForm}/>
        </Grid>
        <Grid item xs={12}>
          <div className="chatlist__heading">
            <span className="divider-line"></span>
            <p className="divider-content">Historial de Chats</p>
            <span className="divider-line"></span>
          </div>
          <br />
        </Grid>
        <Grid item xs={12} style={{ padding: '0px 10px' }}>
          <Input
            fullWidth
            className="search_wrap"
            type="text"
            placeholder="Buscar contactos"
            onChange={event => onSearch(event.target.value)}
            disableUnderline
            startAdornment={
              <InputAdornment position="start">
                <IconButton type="button" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={12}>
          {/* <div className="chat-list-items"> */}
          <div>
            {
              isEmpty ? (
                <div className="container-not-found">
                  <p className="chat-not-found">No se encontró ningún chat</p>
                </div>
              ) : (
                allChats.map((chat, i) => {
                  return (
                    <ItemAvatarRow
                      key={i}
                      chat={chat}
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
  )
}
export default withStyles(styles, { withTheme: true })(HistoryChat);