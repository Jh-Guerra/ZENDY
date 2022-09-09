import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase,TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { listFinalizeChats,listUserHD,searchlistFinalize } from 'services/actions/ChatAction';
import { useHistory } from 'react-router-dom';
import { showBackdrop } from 'services/actions/CustomAction';
import ItemChatHistoryRow from '../Components/ItemChatHistoryRow';
import CustomInput from 'components/CustomInput';
import { milliseconds } from 'date-fns';
import { showSnackBar } from 'services/actions/CustomAction';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { getSessionInfo } from 'utils/common';
 
const styles = theme => ({
    search: {
      position: 'relative',
      marginBottom: '30px',
    },
  });

const HistoryQuery = props => {
  const session = getSessionInfo();
    const { classes = {}, chatRx } = props;
    const history = useHistory();
  
    const [allChats, setAllChats] = React.useState([]);
    const [searchTimeout, setSearchTimeout] = React.useState(null);
    const [fromDate, setFromDate] = React.useState(new Date())
    const [toDate, setToDate] = React.useState(new Date())
    const [listUsersHD, setListUsersHD] = React.useState([])
    const [valueUsersHD, setValueUsersHD] = React.useState()
  
    const isEmpty = allChats.length === 0;
  
    React.useEffect(() => {
      onListTerminateChats('');
      listUserHelpDesk();
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
      props.dispatch(listFinalizeChats(term, from, to , true)).then(res => {
        setAllChats(res || []);
        props.dispatch(showBackdrop(false));
      }).catch(err => history.push("/inicio"), props.dispatch(showBackdrop(false)));
    };

  const listUserHelpDesk = () => {
    props.dispatch(listUserHD()).then(res => {
      // props.dispatch(showSnackBar("success", res || ""));
      setListUsersHD(res)
    }).catch(err => {
      props.dispatch(showBackdrop(false));
      props.dispatch(showSnackBar("error", err.response.data.error));
    });
  }
  //106 y 84 unicos que cambian
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
        console.log('aun no')
        console.log(valueUsersHD)
        if(valueUsersHD)
        {
          console.log('hola')
          console.log(valueUsersHD)
          if (valueUsersHD == 500 || valueUsersHD==0) {
            onListTerminateChats('', date, toDate)
          } else {
            SearchListByUser("", date, toDate, valueUsersHD)
          }
        }else{
          onListTerminateChats('', date, toDate)
        }
      }
    } 
  const handleChange1 = (date) => {
    if (fromDate > date) {
      props.dispatch(showSnackBar('error', 'El Hasta debe ser mayor a la del Desde'));
    } else {
      console.log(valueUsersHD)
      if (valueUsersHD || valueUsersHD==0) {
        console.log('hola22')
        if (valueUsersHD == 500) {
          onListTerminateChats('', fromDate, date)
        } else {
          SearchListByUser("", date, toDate, valueUsersHD)
        }
      } else {
        onListTerminateChats('', fromDate, date)
      }
    }
    }

    const handleChange2 = (user) => {
      setValueUsersHD(user.target.value)
      if(user.target.value==500)
      {
        console.log('admin')
        onListTerminateChats('');
      }else
      {
        console.log('busqueda')
        SearchListByUser("","","",user.target.value)
      }
    }

    const SearchListByUser = (term, fromD , toD, user,isHelpDesk) =>{
      if(!fromD){
        fromD = fromDate;
        console.log(fromD);//Cambia hoy
      }
      if (!toD){
        toD = new Date();
      }
      const from = Math.floor(new Date(fromD.setHours(0,0,0,0)).getTime()/ 1000);
      const to = Math.floor(new Date(toD.setHours(23, 59, 59, 999)).getTime()/ 1000);
      props.dispatch(searchlistFinalize(term, from, to , true,user,isHelpDesk)).then(res => {
        setAllChats(res[0] || []);
        props.dispatch(showBackdrop(false));
      }).catch(err => {
        props.dispatch(showBackdrop(false));
        props.dispatch(showSnackBar("error", err.response.data.error));
      });
    }
  
    return (
      <div style={{ height: "79vh" }}>
        <Grid container style={{ height: '100%' }}>
          <Grid item xs={12} style={{height: "5vh"}}>
            <div className="chatlist__heading">
              <span className="divider-line"></span>
              <p className="divider-content">Historial de Consultas </p>
              <span className="divider-line"></span>
            </div>
          </Grid>
          <Grid item xs={12} style={{height: "8vh", padding: '5px'}} container>
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

         { session.user.idRole==3 && session.user.company.isHelpDesk==1 && <Grid item xs={12} style={{height: "8vh" }}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="demo-simple-select-label" >Usuarios</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                 value={valueUsersHD}
               onChange={(user)=>{handleChange2(user)}}
              >
                <MenuItem value={500}>Mis Consultas</MenuItem>
                <MenuItem value={0}>Todos</MenuItem>
                {
                  listUsersHD.map((value,i)=>{
                    return(
                      <MenuItem key={value.id} value={value.id}>{value.username}</MenuItem>
                    )
                  })
                }
                
                {/* <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>}

          <Grid item xs={12} style={{ padding: '10px 10px', height: "10vh" }}>
            <Input
              fullWidth
              className="search_wrap"
              type="text"
              sx={{color:'#fff'}}
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
          <Grid item xs={12} style={{height: "45vh"}}>
            <div className="items-section">
              {
                isEmpty ? (
                  <div className="container-not-found">
                    <p className="chat-not-found">No se encontró ninguna consulta</p>
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
export default withStyles(styles, { withTheme: true })(HistoryQuery);