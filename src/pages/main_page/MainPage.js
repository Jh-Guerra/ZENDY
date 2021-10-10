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
import { listMessages } from 'services/actions/MessageAction';
import { getSessionInfo } from 'utils/common';
import Echo from "laravel-echo";
import config from "config/Config";
import { resetPendingMessages } from 'services/actions/ParticipantAction';

const MainPage = (props) => {
  const history = useHistory();
  const session = getSessionInfo() || {};
  const user = session.user || {};

  const [chat, setChat] = React.useState({});
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
      const chatId = pathArray && pathArray[2];
      if(chatId){
        onGetChatData(chatId);
        onListMessages(chatId, "");
        props.dispatch(resetPendingMessages(chatId)).catch(err => history.push("/inicio"));

        window.Echo.private("chats." + chatId).listen('sendMessage', (e) => {
          const newMessage = e && e.message;
          const newUser = e && e.user || {};
          const currentMessages = localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")) : [];
          newMessage.userFirstName = newUser.firstName;
          newMessage.userLastName = newUser.lastName;
          newMessage.userSex = newUser.sex;
          newMessage.userAvatar = newUser.avatar;
          newMessage.userId = newUser.id;

          const newMessages = [...currentMessages, newMessage] || [];
          localStorage.setItem("messages", JSON.stringify(newMessages));
          setMessages(newMessages);
          props.dispatch(listActiveChats("", "Vigente"));
          props.dispatch(resetPendingMessages(e && e.chatId)).catch(err => history.push("/inicio"));
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
      localStorage.setItem("messages", JSON.stringify(res || []))
    }).catch(err => props.dispatch(showBackdrop(false)));
  }

  return (
    <Grid container style={{height:'100vh'}}>
      <Grid item xs={12} style={{height:'13vh'}}>
        <MainHeader
          chat={chat}
          messages={messages}
          onGetChatData={onGetChatData}
          onEndChat={onEndChat}
          onListMessages={onListMessages}
          {...props}
        />
      </Grid>
      <Grid item xs={12} style={{height:'77vh'}}>
        <MainBody
          {...props}
          messages={messages}
          chat={chat}
          user={user}
        />
      </Grid>
      <Grid item xs={12} style={{height:'10vh'}}>
        <MainFooter
          {...props}
          chat={chat}
          onListMessages={onListMessages}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({ ...state })
export default connect(mapStateToProps)(withRouter(MainPage));
