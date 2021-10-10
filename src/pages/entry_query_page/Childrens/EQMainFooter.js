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
import RateReviewIcon from '@material-ui/icons/RateReview';

const EQMainFooter = props => {
  const { entryQuery = {}, session, setEntryQuery } = props;

  const isFrequent = entryQuery && entryQuery.isFrequent;

  const [showRecommendations, setShowRecommendations] = React.useState(false);
  const [showAcceptChat, setShowAcceptChat] = React.useState(false);
  const [showAddFrequentQuery, setShowAddFrequentQuery] = React.useState(false);

  const openRecommendations = () => {
    setShowRecommendations(true);
  };

  const openAcceptChat = () => {
    setShowAcceptChat(true);
  };
  
  const openAddFrequentQuery = () => {
    setShowAddFrequentQuery(true);
  };

  const onAcceptEntryQuery = () => {
    setShowAcceptChat(false);
    props.onAcceptEntryQuery && props.onAcceptEntryQuery();
  };

  const onRecommendUser = selectedUserIds => {
    setShowRecommendations(false);
    props.onRecommendUser && props.onRecommendUser(selectedUserIds);
  };

  return (
    <>
      <div className="entry-query-footer">
        {checkPermission(session, 'acceptEntryQuery') && (
          <CustomButton onClick={openRecommendations} variant="contained" color={infoColor} startIcon={<PeopleAltIcon />}>
            Recomendaciones
          </CustomButton>
        )}
        {entryQuery.id && checkPermission(session, 'acceptEntryQuery') && (
          <CustomButton onClick={openAcceptChat} variant="contained" color={infoColor} startIcon={<ChatIcon />}>
            Aceptar consulta e Iniciar Chat
          </CustomButton>
        )}
        {entryQuery.id && checkPermission(session, 'createFrequentQuery') && !isFrequent && (
          <CustomButton
            onClick={openAddFrequentQuery}
            variant="contained"
            color={infoColor}
            startIcon={<RateReviewIcon />}
          >
            Guardar como Consulta Frecuente
          </CustomButton>
        )}
      </div>

      <CustomModal
        customModal="ModalAcceptChat"
        open={showAcceptChat}
        handleClose={() => {
          setShowAcceptChat(false);
        }}
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

      <CustomModal
        customModal="ModalAddFrequentQuery"
        open={showAddFrequentQuery}
        handleClose={() => {
          setShowAddFrequentQuery(false);
        }}
        entryQuery={entryQuery}
        setEntryQuery={setEntryQuery}
        onAcceptEntryQuery={onAcceptEntryQuery}
      />
    </>
  );
};

export default EQMainFooter;
