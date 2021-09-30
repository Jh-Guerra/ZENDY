import React, { createRef } from 'react';

import 'assets/styles/zendy-app.css';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ImageIcon from '@material-ui/icons/Image';
import DescriptionIcon from '@material-ui/icons/Description';
import ChatItem from '../Components/ChatItem';
import EmojiPicker from 'emoji-picker-react';
import CustomButton from 'components/CustomButton';
import { infoColor } from 'assets/styles/zendy-css';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ChatIcon from '@material-ui/icons/Chat';
import CustomModal from 'components/Modals/common/CustomModal';
import { checkPermission } from 'utils/common';

const EQMainFooter = props => {
  const { entryQuery={}, session } = props;

  const user = session && session.user && session.user.id|| "";
  const messagesEndRef = createRef(null);

  const chatItems = [
    {
      key: 1,
      image: entryQuery && entryQuery.user && entryQuery.user.avatar,
      type: 'Yo',
      msg: 'Razón:'+ ' ' +  entryQuery.reason,
    },
    {
      key: 2,
      image: entryQuery && entryQuery.user && entryQuery.user.avatar,
      type: 'Yo',
      msg: 'Descripción:'+ ' ' + entryQuery.description,
    },
    {
      key: 3,
      image: entryQuery && entryQuery.user && entryQuery.user.avatar,
      type: 'Yo',
      msg: "Imagen",
      photo: entryQuery.image,
    },
  ];

  const [showRecommendations, setShowRecommendations] = React.useState(false);
  const [showAcceptChat, setShowAcceptChat] = React.useState(false);

  const openRecommendations = () => {
    setShowRecommendations(true);
  };

  const openAcceptChat = () => {
    setShowAcceptChat(true);
}

  const [chat, setChat] = React.useState([]);
  const [msg, setMsg] = React.useState('');

  React.useEffect(() => {
 setChat([...chatItems]);
  }, [entryQuery.id]);

  React.useEffect(() => {
    window.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        if (msg != '') {
          chatItems.push({
            key: 1,
            image: 'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
            type: '',
            msg: msg,
          });
          setChat([...chatItems]);
          setMsg('');
        }
      }
    });
  }, [msg]);


  const onAcceptEntryQuery = () => {
    setShowAcceptChat(false);
    props.onAcceptEntryQuery && props.onAcceptEntryQuery();
  }

  const onRecommendUser = (selectedUserIds) => {
    setShowRecommendations(false);
    props.onRecommendUser && props.onRecommendUser(selectedUserIds);
  }

  return (
    <div>
      <div className="main-chat-content">
        {chat.map((itm, index) => {
          return (
            <ChatItem
              key={index}
              animationDelay={index + 2}
              user={itm.type ? itm.type : 'me'}
              msg={itm.msg}
              image={itm.image}
              photo = {itm.photo}
            />
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      <div className="entry-query-footer">
        <CustomButton
          onClick={openRecommendations}
          variant="contained"
          customColor={infoColor}
          startIcon={<PeopleAltIcon />}
        >
          Recomendaciones
        </CustomButton>
        {
          checkPermission(session, "recommendUserEntryQuery") && (
            <CustomButton
              onClick={openAcceptChat}
              variant="contained"
              customColor={infoColor}
              startIcon={<ChatIcon />}
            >
              Aceptar consulta e Iniciar Chat
            </CustomButton>
          )
        }
      </div>

      <CustomModal
        customModal="ModalAcceptChat"
        open={showAcceptChat}
        handleClose={() => { setShowAcceptChat(false) }}
        onConfirm={onAcceptEntryQuery}
      />

      <CustomModal
        customModal="ModalRecommendations"
        open={showRecommendations}
        handleClose={() => {
          setShowRecommendations(false);
        }}
        entryQuery={entryQuery}
        session={session}
        onConfirm={onRecommendUser}
      />
    </div>
  );
};

export default EQMainFooter;
