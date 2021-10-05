import React, { createRef } from "react";
import "assets/styles/zendy-app.css";
import ChatItem from "pages/main_page/Components/ChatItem";
import config from 'config/Config';
import { getImageProfile } from "utils/common";

const EQMainBody = props => {

  const { entryQuery = {}, session } = props;
  const user = session && session.user || {};

  const [entryQueryItems, setEntryQueryItems] = React.useState([]);

  React.useEffect(() => {
    setEntryQueryItems(getDefaultMessages());
  }, [entryQuery && entryQuery.id]);

  const getDefaultMessages = () => {
    const items = [];
    if(entryQuery.reason){
        items.push({
          msg: entryQuery.reason,
          user: entryQuery.user.firstName + " " + entryQuery.user.lastName,
          isMyMessage: user.id == entryQuery.user.id,
          image: entryQuery.user.avatar ? (config.api + entryQuery.user.avatar) : "",
          hour: entryQuery.created_at,
          sex: entryQuery.user && entryQuery.user.sex || "O"
        });
    }

    if(entryQuery.description){
      items.push({
        msg: entryQuery.description,
        user: entryQuery.user.firstName + " " + entryQuery.user.lastName,
        isMyMessage: user.id == entryQuery.user.id,
        image: entryQuery.user.avatar ? (config.api + entryQuery.user.avatar) : "",
        hour: entryQuery.created_at,
        sex: entryQuery.user && entryQuery.user.sex || "O"
      });
    }

    if(entryQuery.image){
      items.push({
        msg: "",
        user: entryQuery.user.firstName + " " + entryQuery.user.lastName,
        isMyMessage: user.id == entryQuery.user.id,
        image: entryQuery.user.avatar ? (config.api + entryQuery.user.avatar) : "",
        imageUpload: entryQuery.image ? (config.api + entryQuery.image) : "",
        hour: entryQuery.created_at,
        sex: entryQuery.user && entryQuery.user.sex || "O"
      });
    }

    return items;
  }

  return (
    <div className="main-chat-content">
      {entryQueryItems.map((item, index) => {
        return (
          <ChatItem
            key={index}
            animationDelay={0}
            user={item.user}
            msg={item.msg}
            image={item.image || getImageProfile(item.sex)}
            imageUpload={item.imageUpload}
            isMyMessage={item.isMyMessage}
          />
        );
      })}
    </div>
  )

}

export default EQMainBody;