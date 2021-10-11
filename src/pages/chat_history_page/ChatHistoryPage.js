import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import CHMainHeader from "pages/chat_history_page/Childrens/CHMainHeader";
import CHMainBody from "pages/chat_history_page/Childrens/CHMainBody";
import CHMainFooter from "pages/chat_history_page/Childrens/CHMainFooter";
import { showBackdrop } from 'services/actions/CustomAction';
import { findChat } from 'services/actions/ChatAction';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { listMessages } from 'services/actions/MessageAction';
import { getSessionInfo } from 'utils/common';

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
      const chatId = pathArray && pathArray[2];
      if(chatId){
        onGetChatData(chatId);
        onListMessages(chatId, "");
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

  return (
    <Grid container style={{height:'100vh'}}>
      <Grid item xs={12} style={{height:'13vh'}}>
        <CHMainHeader
          chat={chat}
          onListMessages={onListMessages}
          {...props}
        />
      </Grid>
      <Grid item xs={12} style={{height:'77vh'}}>
        <CHMainBody
          {...props}
          messages={messages}
          chat={chat}
          user={user}
        />
      </Grid>
      <Grid item xs={12} style={{height:'10vh'}}>
        <CHMainFooter
          {...props}
          chat={chat}
          message={message}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({ ...state })
export default connect(mapStateToProps)(withRouter(ChatHistoryPage));
