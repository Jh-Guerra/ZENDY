import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import { Grid } from "@material-ui/core";
import MainHeader from "pages/main_page/Childrens/MainHeader";
import MainBody from "pages/main_page/Childrens/MainBody";
import MainFooter from "pages/main_page/Childrens/MainFooter";
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { findChat, finalizeChat, listActiveChats } from 'services/actions/ChatAction';
import { useHistory } from 'react-router-dom';

const MainPage = (props) => {

  const history = useHistory();

  const [chat, setChat] = React.useState({});

  React.useEffect(() => {
    if(props.location.pathname){
      const pathArray = props.location.pathname.split("/");
      const chatId = pathArray && pathArray[3];
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

  const onEndChat = (data) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(finalizeChat(chat.id, data)).then(res => {
      history.push("/inicio");
      props.dispatch(listActiveChats("", "Vigente"));
      props.dispatch(showSnackBar("success", "Chat finalizado"));
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));
  }

  return (
    <Grid container style={{height:'100vh'}}>
      <Grid item xs={12} style={{height:'13vh'}}>
        <MainHeader
          chat={chat}
          onGetChatData={onGetChatData}
          onEndChat={onEndChat}
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
