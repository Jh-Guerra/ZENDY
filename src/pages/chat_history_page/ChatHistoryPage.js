import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import { Grid } from "@material-ui/core";
import CHMainHeader from "pages/chat_history_page/Childrens/CHMainHeader";
import CHMainBody from "pages/chat_history_page/Childrens/CHMainBody";
import CHMainFooter from "pages/chat_history_page/Childrens/CHMainFooter";
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { findChat, finalizeChat, listActiveChats } from 'services/actions/ChatAction';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { createMessage, listMessages } from 'services/actions/MessageAction';
import { getSessionInfo } from 'utils/common';
import Echo from "laravel-echo";
import config from "config/Config";
import { resetPendingMessages } from 'services/actions/ParticipantAction';

const ChatHistoryPage = (props) => {
  const history = useHistory();
  const session = getSessionInfo() || {};
  const user = session.user || {};

  const [chat, setChat] = React.useState({});
  const [message, setMessage] = React.useState({});
  const [messages, setMessages] = React.useState([]);


  React.useEffect(() => {
    if(props.location.pathname){
      const pathArray = props.location.pathname.split("/");
      const chatId = pathArray && pathArray[3];
      if(chatId){
        onGetChatData(chatId);
        onListMessages(chatId, "");
        props.dispatch(resetPendingMessages(chatId));
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

  const onListMessages = (chatId, term) => {
    props.dispatch(listMessages(chatId, term)).then(res => {
      setMessages(res || []);
    }).catch(err => props.dispatch(showBackdrop(false)));
  }
  const onEndChat = () =>{

  }

  return (
    <Grid container style={{height:'100vh'}}>
      <Grid item xs={12} style={{height:'13vh'}}>
        <CHMainHeader
          chat={chat}
          onGetChatData={onGetChatData}
          onEndChat={onEndChat}
          onListMessages={onListMessages}
          {...props}
        />
      </Grid>
      <Grid item xs={12} style={{height:'74vh'}}>
        <CHMainBody
          {...props}
          messages={messages}
          chat={chat}
          user={user}
        />
      </Grid>
      <Grid item xs={12} style={{height:'13vh'}}>
        <CHMainFooter
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
export default connect(mapStateToProps)(withRouter(ChatHistoryPage));
