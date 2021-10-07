import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ItemAvatarNotifyRow from '../Components/ItemAvatarNotifyRow';
import { listFinalizeChats } from 'services/actions/ChatAction';
import NewChatCall from './NewChatCall';
import { useHistory } from 'react-router-dom';
import { showBackdrop } from 'services/actions/CustomAction';
import ItemChatHistoryRow from '../Components/ItemChatHistoryRow';
import CustomInput from 'components/CustomInput';
import { milliseconds } from 'date-fns';
 
const styles = theme => ({
    search: {
      position: 'relative',
      marginBottom: '30px',
    },
  });

const HistoryChat = props => {

    const { classes = {}, chatRx } = props;
    const history = useHistory();
  
    const [allChats, setAllChats] = React.useState([]);
    const [searchTimeout, setSearchTimeout] = React.useState(null);
    const [fromDate, setFromDate] = React.useState(new Date())
    const [toDate, setToDate] = React.useState(new Date())
  
    const isEmpty = allChats.length === 0;
  
    React.useEffect(() => {
      onListTerminateChats('');
    }, []);
  
    const onListTerminateChats = (term, fromD , toD) => {
      props.dispatch(showBackdrop(true));
      if(!fromD){
        fromD = new Date(new Date().setHours(0,0,0,0));
      }
      if (!toD){
        toD = new Date();
      }
      const from = Math.floor(new Date(fromD).getTime()/ 1000);
      const to = Math.floor(new Date(toD).getTime()/ 1000)
      props.dispatch(listFinalizeChats(term, "Finalizado",from, to)).then(res => {
        setAllChats(res || []);
        props.dispatch(showBackdrop(false));
      }).catch(err => props.dispatch(showBackdrop(false)));
    };
  
    const onSearch = term => {
      clearTimeout(searchTimeout);
      setSearchTimeout(
        setTimeout(() => {
          onListTerminateChats(term);
        }, 1000)
      );
    };
  
    const goToChat = (chat) => {
      history.push(`/chat-historial/${chat.type}/${chat.id}`);
    }
  
    const onSaveForm = () => {
        onListTerminateChats('');
    }
    const handleChange = (date) => {
      setFromDate(date);
      onListTerminateChats('', date, toDate)
    } 
    const handleChange1 = (date) => {
      setToDate(date);
      onListTerminateChats('', fromDate, date)
    } 
  
    const chats = allChats && allChats.currentChats || [];
  
    return (
      <div style={{ height: "79vh" }}>
        <Grid container>
          <Grid item xs={12}>
            <NewChatCall onSaveForm={onSaveForm} />
          </Grid>
          <Grid item xs={12}>
            <div className="chatlist__heading">
              <span className="divider-line"></span>
              <p className="divider-content">Historial de Chats </p>
              <span className="divider-line"></span>
            </div>
            <br />
          </Grid>
          <Grid container spacing={3} style={{ padding: '10px', marginTop: '10px', color: 'white', fontcolor: 'white' }}>

            <Grid item xs={6} style={{ color: 'white', fontcolor: 'white', forcedColorAdjust: 'white' }}>
              <CustomInput
                id="date1"
                custom="inputDate"
                label="Desde"
                onChange={(date) => { handleChange(date) }}
                style={{ color: 'white' }}
                value={fromDate}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                id="date2"
                custom="inputDate"
                label="Hasta"
                onChange={(date) => { handleChange1(date) }}
                value={toDate}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ padding: '0px 10px' }}>
            <Input
              fullWidth
              className="search_wrap"
              type="text"
              placeholder="Buscar"
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
                  allChats && allChats.map((chat, i) => {
                    return (
                      <ItemChatHistoryRow
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
    );
  };
export default withStyles(styles, { withTheme: true })(HistoryChat);