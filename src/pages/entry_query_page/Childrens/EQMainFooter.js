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

const EQMainFooter = props => {
  const { entryQuery={}, session } = props;

  const user = session && session.user && session.user.id|| "";
  const messagesEndRef = createRef(null);

  const chatItems = [
    {
      key: 1,
      image: 'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg',
      type: 'other',
      msg: 'Hi Homero, How are you?',
    },
  ];

  const [showRecommendUser, setShowRecommendUser] = React.useState(false);
  const [showAcceptChat, setShowAcceptChat] = React.useState(false);

  const openRecommendUser = () => {
    setShowRecommendUser(true);
  };

  const openAcceptChat = () => {
    setShowAcceptChat(true);
}

  const [chat, setChat] = React.useState([]);
  const [msg, setMsg] = React.useState('');
  const [showEmoji, setShowEmoji] = React.useState();
  const [cursorPosition, setCursorPosition] = React.useState();

  React.useEffect(() => {
    setChat([...chatItems]);
  }, []);

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
            />
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      <div className="entry-query-footer">
        {
          entryQuery && entryQuery.status == "Pendiente" && (entryQuery && entryQuery.createdBy == user) && (
            <div>
              <CustomButton
                onClick={openRecommendUser}
                variant="contained"
                customColor={infoColor}
                startIcon={<PeopleAltIcon />}
              >
                Recomendar Usuario
              </CustomButton>
              <CustomButton
                onClick={openAcceptChat}
                variant="contained"
                customColor={infoColor}
                startIcon={<ChatIcon />}
              >
                Aceptar consulta e Iniciar Chat
              </CustomButton>
            </div>
          )
        }
      </div>

      <CustomModal
        customModal="ModalAcceptChat"
        open={showAcceptChat}
        handleClose={() => { setShowAcceptChat(false) }}
      />
      <CustomModal
        customModal="ModalRecommendUser"
        open={showRecommendUser}
        handleClose={() => {
          setShowRecommendUser(false);
        }}
      />
    </div>
  );
};

export default EQMainFooter;
