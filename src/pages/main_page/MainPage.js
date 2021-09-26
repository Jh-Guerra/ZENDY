import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import { Grid } from "@material-ui/core";
import MainHeader from "pages/main_page/Childrens/MainHeader";
import MainBody from "pages/main_page/Childrens/MainBody";
import MainFooter from "pages/main_page/Childrens/MainFooter";
import { showBackdrop } from 'services/actions/CustomAction';
import { findChat } from 'services/actions/ChatAction';
import { connect } from "react-redux";
import { useHistory, withRouter } from 'react-router-dom';
import { createMessage, listMessage } from 'services/actions/MessageAction';
import { findUser } from 'services/actions/UserAction';

const MainPage = (props) => {
  console.log("props",props);

  const history = useHistory();

  const [chat, setChat] = React.useState({});
  const [user, setUser] = React.useState({});
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState({});

  React.useEffect(() => {
    if(props.location.pathname){
      const pathArray = props.location.pathname.split("/");
      const chatId = pathArray && pathArray[pathArray.length-1];
      console.log("chatId",chatId);

      if(chatId){
        onGetChatData(chatId);
        onListMessages(chatId);
      }else{
        history.push("/");
      }
    }
  }, [props.location.pathname]);

  React.useEffect(() => {
    if(props.session.user){
      const userId = props.session.user.id;
      getDataUser(userId);
    }
  }, [props.session.user]);


  const onGetChatData = (chatId) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(findChat(chatId)).then(res => {
      setChat(res.chat || {});
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));
  };

  const getDataUser = (userId) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(findUser(userId)).then(res => {
      setUser(res.user || {});
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));
  }

  const onListMessages = (chatId) => {
    props.dispatch(listMessage(chatId)).then(res => {
      setMessages(res || []);
    }).catch(err => props.dispatch(showBackdrop(false)));
  }

  return (
    <Grid container style={{height:'100vh'}}>
      <Grid item xs={12} style={{height:'13vh'}}>
        <MainHeader
          chat={chat}
          {...props}
        />
      </Grid>
      <Grid item xs={12} style={{height:'13vh'}}>
        <MainBody
          {...props}
        />     
      </Grid>
      <Grid item xs={12} style={{height:'74vh'}}>
        <MainFooter
          chat={chat}
          user={user}
          messages={messages.message}
          message={message}
          onListMessages={onListMessages}
          {...props}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({ ...state })
export default connect(mapStateToProps)(withRouter(MainPage));
