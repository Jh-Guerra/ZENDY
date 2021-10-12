import React, { createRef } from 'react';
import 'assets/styles/zendy-app.css';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ChatIcon from '@material-ui/icons/Chat';
import CustomModal from 'components/Modals/common/CustomModal';
import { checkPermission } from 'utils/common';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { Button } from '@material-ui/core';

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
          <Button
            onClick={openRecommendations}
            variant="contained"
            color="secondary"
            startIcon={<PeopleAltIcon />}
          >
            Recomendaciones
          </Button>
        )}
        {entryQuery.id && checkPermission(session, 'acceptEntryQuery') && (
          <Button
            onClick={openAcceptChat}
            variant="contained"
            color="secondary"
            startIcon={<ChatIcon />}
          >
            Aceptar consulta e Iniciar Chat
          </Button>
        )}
        {entryQuery.id && checkPermission(session, 'createFrequentQuery') && !isFrequent && (
          <Button
            onClick={openAddFrequentQuery}
            variant="contained"
            color="secondary"
            startIcon={<RateReviewIcon />}
          >
            Guardar como Consulta Frecuente
          </Button>
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
      />
    </>
  );
};

export default EQMainFooter;
