import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import { Grid } from "@material-ui/core";
import MainHeader from "pages/main_page/Childrens/MainHeader";
import MainBody from "pages/main_page/Childrens/MainBody";
import MainFooter from "pages/main_page/Childrens/MainFooter";
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { findChat, finalizeChat, listActiveChats } from 'services/actions/ChatAction';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { createMessage, listMessages } from 'services/actions/MessageAction';
import { getSessionInfo } from 'utils/common';
import Echo from "laravel-echo";
import config from "config/Config";

const MainPage = (props) => {
  const history = useHistory();
  const session = getSessionInfo() || {};
  const user = session.user || {};

  const [chat, setChat] = React.useState({});
  const [message, setMessage] = React.useState({});
  const [messages, setMessages] = React.useState([]);

  React.useEffect(()=> {
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: config.pusherAppKey,
      cluster: config.pusherCluster,
      encrypted: true,
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: false,
      auth: {
        headers: {
            Authorization: 'Bearer ' + `${JSON.parse(localStorage.getItem('session')).token || ''}`
        },
      }
    });
  }, []);

  React.useEffect(() => {
    if(props.location.pathname){
      const pathArray = props.location.pathname.split("/");
      const chatId = pathArray && pathArray[3];
      if(chatId){
        onGetChatData(chatId);
        onListMessages(chatId, "");

        window.Echo.private("chats." + chatId).listen('sendMessage', (e) => {
          // const newMessage = e && e.message;
          // const newMessages = e && e.messages;
          // console.log("newMessage", newMessage);
          // console.log("newMessages", newMessages);
          // setMessages([
          //   ...newMessages
          // ]);
          onGetChatData(onListMessages(e && e.chatId, ""));
        })
      }else{
        history.push("/inicio");
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

  const onListMessages = (chatId, term) => {
    props.dispatch(listMessages(chatId, term)).then(res => {
      setMessages(res || []);
    }).catch(err => props.dispatch(showBackdrop(false)));
  }

  return (
    <Grid container style={{height:'100vh'}}>
      <Grid item xs={12} style={{height:'13vh'}}>
        <MainHeader
          chat={chat}
          onGetChatData={onGetChatData}
          onEndChat={onEndChat}
          onListMessages={onListMessages}
          {...props}
        />
      </Grid>
      <Grid item xs={12} style={{height:'74vh'}}>
        <MainBody
          {...props}
          messages={messages}
          chat={chat}
          user={user}
        />
      </Grid>
      <Grid item xs={12} style={{height:'13vh'}}>
        <MainFooter
          {...props}
          chat={chat}
          message={message}
          onListMessages={onListMessages}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({ ...state })
export default connect(mapStateToProps)(withRouter(MainPage));
