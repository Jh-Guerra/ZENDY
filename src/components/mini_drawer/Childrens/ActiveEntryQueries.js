import React, { Component } from 'react';
import ItemChatRow from '../Components/ItemChatRow';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { listActiveChats } from 'services/actions/ChatAction';
import { useHistory } from 'react-router-dom';
import { showBackdrop } from 'services/actions/CustomAction';
import { count_queries_actives } from 'services/actions/CountAction';

const styles = theme => ({
  search: {
    position: 'relative',
    marginBottom: '30px',
  },
});

const ActiveEntryQueries = props => {
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
    
    props.dispatch(listActiveChats(term, "Vigente", true)).then(res => {
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

  const chats = chatRx && chatRx.currentChats || [];

  React.useEffect(() => {
    const newArray = chats.filter((value) => value.participation.pendingMessages !== 0);
    props.dispatch(count_queries_actives(newArray.length));
  }, [chats])
//  console.log("CHATS CONSULTAS",chats)
//   React.useEffect(() => {
//       const newArray = chats.filter((value) => value.idEntryQuery > 0);
//       console.log(newArray);
//     // let contador=0;
//     //  chats.filter((value)=>{
//     //    if(value.idEntryQuery !==null)
//     //    {
//     //     contador = contador + 1
//     //    }
//     //  })
//     // // const newArray = chats.lenght;
//     // console.log(contador)
//     // //  console.log(newArray.lenght)
//     // props.dispatch(count_queries_actives(contador));
//   }, [chats])

  return (
    <div style={{ height: "79vh" }}>
      <Grid container style={{height: "100%"}}>
        <Grid item xs={12} style={{height: "5vh"}}>
          <div className="chatlist__heading">
            <span className="divider-line"></span>
            <p className="divider-content">Consultas Activas </p>
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
                  <p className="chat-not-found">No se encontró ninguna consulta</p>
                </div>
              ) : (
                chats && chats.map((chat, i) => {
                  return (
                    <ItemChatRow
                      key={i}
                      chat={chat}
                      // type={2}
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

export default withStyles(styles, { withTheme: true })(ActiveEntryQueries);