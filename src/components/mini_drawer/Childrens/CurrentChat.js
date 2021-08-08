import React, { Component } from 'react';
import ItemAvatarRow from '../Components/ItemAvatarRow';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ItemAvatarNotifyRow from '../Components/ItemAvatarNotifyRow';
import { listClientChats } from 'services/actions/ChatAction';
import NewChatCall from './NewChatCall';
import { useHistory } from 'react-router-dom';

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
  const [loading, setLoading] = React.useState(false);
  const [searchTimeout, setSearchTimeout] = React.useState(null);

  React.useEffect(() => {
    if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).token){
      setLoading(true);
      onListClientChats('');
    }   
  }, []);

  const onListClientChats = term => {
    setLoading(true);
    props.dispatch(listClientChats(term)).then(res => {
      setAllChats(res || []);
      setLoading(false);
    });
  };

  const onSearch = term => {
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        onListClientChats(term);
      }, 1000)
    );
  };

  const goToChat = (id) => {
    history.push("/chat/empresa/" + id);
  }

  return (
    <div className="mini-drawer-current-chat">
      <Grid container>
        <Grid item xs={12}>
          <NewChatCall />
        </Grid>      
        <Grid item xs={12} container>        
          <Grid item xs={12}>
            <br />
            <div className="chatlist__heading">
              <span className="divider-line"></span>
              <p className="divider-content">Chats Vigentes</p>
              <span className="divider-line"></span>            
            </div>
            <br />
          </Grid>
          <br />
          <Grid item xs={12}>
            <div style={{ position: 'relative', marginBottom: '30px' }}>            
                <Grid container direction="row" className={`chatList__search ${classes.search}`}>
                  <Input
                    style={{ paddingLeft: '10px', width: '90%', position: 'absolute',top: '0', left: '0', right: '0', margin: 'auto'}}
                    className="chatList__search search_wrap"
                    type="text"
                    placeholder="Buscar contactos"
                    onChange={event => onSearch(event.target.value)}
                    disableUnderline={true}
                    startAdornment= {
                      <InputAdornment position="start">
                        <IconButton style={{ marginLeft: '5px', padding: 10 }} type="button" aria-label="search">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>           
            </div>
          </Grid>
          <br />
          <Grid item xs={12}>
            <br />
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
