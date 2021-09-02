import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import { Grid } from "@material-ui/core";
import MainHeader from "pages/main_page/Childrens/MainHeader";
import MainBody from "pages/main_page/Childrens/MainBody";
import MainFooter from "pages/main_page/Childrens/MainFooter";
import { showBackdrop } from 'services/actions/CustomAction';
import { findChat } from 'services/actions/ChatAction';
import { useHistory } from 'react-router-dom';

const MainPage = (props) => {

  const history = useHistory();

  const [chat, setChat] = React.useState({});

  React.useEffect(() => {
    if(props.location.pathname){
      const pathArray = props.location.pathname.split("/");
      const chatId = pathArray && pathArray[pathArray.length-1];
      if(chatId){
        onGetChatData(chatId);
      }else{
        history.push("/");
      }
    }
  }, [props.location.pathname]);


  const onGetChatData = (chatId) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(findChat(chatId)).then(res => {
      setChat(res.chat || {});
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));
  };

  return (
    <Grid container style={{height:'100vh'}}>
      <Grid item xs={12} style={{height:'13vh'}}>
        <MainHeader
          chat={chat}
        />
      </Grid>
      <Grid item xs={12} style={{height:'13vh'}}>
        <MainBody/>
      </Grid>
      <Grid item xs={12} style={{height:'74vh'}}>
        <MainFooter/>
      </Grid>
    </Grid>
  );
}

export default MainPage;
