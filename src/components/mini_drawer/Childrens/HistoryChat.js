import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase,TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { listFinalizeChats } from 'services/actions/ChatAction';
import { useHistory } from 'react-router-dom';
import { showBackdrop } from 'services/actions/CustomAction';
import ItemChatHistoryRow from '../Components/ItemChatHistoryRow';
import CustomInput from 'components/CustomInput';
import { milliseconds } from 'date-fns';
import { showSnackBar } from 'services/actions/CustomAction';
 
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
      const from = Math.floor(new Date(fromD.setHours(0,0,0,0)).getTime()/ 1000);
      const to = Math.floor(new Date(toD.setHours(23, 59, 59, 999)).getTime()/ 1000);
      props.dispatch(listFinalizeChats(term, from, to, false)).then(res => {
        setAllChats(res || []);
        props.dispatch(showBackdrop(false));
      }).catch(err => history.push("/inicio"), props.dispatch(showBackdrop(false)));
    };
  
    const onSearch = term => {
      clearTimeout(searchTimeout);
      setSearchTimeout(
        setTimeout(() => {
          onListTerminateChats(term, fromDate, toDate);
        }, 1000)
      );
    };
  
    const goToChat = (chat) => {
      history.push(`/chat-historial/${chat.id}`);
    }
  
    const handleChange = (date) => {
      setFromDate(date);
      if(date > toDate){
        props.dispatch(showSnackBar('error', 'La Desde debe ser menor a la del Hasta'));
      } else {
        onListTerminateChats('', date, toDate)
      }
    } 
    const handleChange1 = (date) => {
      setToDate(date);
      if(fromDate > date){
        props.dispatch(showSnackBar('error', 'El Hasta debe ser mayor a la del Desde'));
      } else {
        onListTerminateChats('', fromDate, date)
      }
    }
  
    return (
      <div style={{ height: "79vh" }}>
        <Grid container style={{ height: '100%' }}>
          <Grid item xs={12} style={{height: "5vh"}}>
            <div className="chatlist__heading">
              <span className="divider-line"></span>
              <p className="divider-content">Historial de Chats </p>
              <span className="divider-line"></span>
            </div>
          </Grid>
          <Grid item xs={12} style={{height: "8vh"}} container style={{ padding: '10px'}}>
            <Grid item xs={6}>
              <CustomInput
                id="date1"
                custom="inputDate"
                label="Desde"
                onChange={(date) => { handleChange(date) }}
                value={fromDate}
                inputProps={{ readOnly: true }}
                disableFuture
                autoOk={true}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                id="date2"
                custom="inputDate"
                label="Hasta"
                onChange={(date) => { handleChange1(date) }}
                value={toDate}
                inputProps={{ readOnly: true }}
                disableFuture
                autoOk={true}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ padding: '10px 10px', height: "7vh" }}>
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
          <Grid item xs={12} style={{height: "57vh"}}>
            <div className="items-rows">
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