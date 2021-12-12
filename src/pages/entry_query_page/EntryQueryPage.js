import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { useHistory } from 'react-router-dom';
import { findEntryQuery, deleteEntryQuery, acceptEntryQuery, listPendingQueries, listQueries, recommendUser } from 'services/actions/EntryQueryAction';
import EQMainHeader from './Childrens/EQMainHeader';
import EQMainBody from './Childrens/EQMainBody';
import EQMainFooter from './Childrens/EQMainFooter';
import { getSessionInfo } from "utils/common";

const EntryQueryPage = (props) => {
  const history = useHistory();

  const [entryQuery, setEntryQuery] = React.useState({});
  const [byRecommend, setByRecommend] = React.useState(false);
  const [showModalEntryChat, setShowModalEntryChat] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);

  const session = getSessionInfo();

  const sectionsIds = session && session.role && session.role.sectionIds;
  const idHelpdesk = session && session.user && session.user.idHelpDesk;
  const isHelpDesk = session && session.user && session.user.company && Boolean(session.user.company.isHelpDesk);
  const role = session && session.role && session.role.id;

  React.useEffect(() => {
    if(props.location.pathname){
      const pathArray = props.location.pathname.split("/");
      const entryQueryId = pathArray && pathArray[2];
      setByRecommend(pathArray && pathArray[3] && pathArray[3] == "recomendacion" || false);
      if(entryQueryId){
        onGetData(entryQueryId);
      }else{
        history.push("/");
      }
    }
  }, [props.location.pathname]);

  
  const onGetData = (entryQueryId) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(findEntryQuery(entryQueryId)).then(res => {
      setEntryQuery(res.entryQuery|| {});
      props.dispatch(showBackdrop(false));
    }).catch(err => {
      history.push("/inicio"); 
      props.dispatch(showBackdrop(false))
    });
  };

  const onOpenModal = () => {
    setShowModalEntryChat(true);
  }

  const onOpenModalDelete = () => {
    setShowModalDelete(true);
  }

  const onDelete = async () => {
    props.dispatch(showBackdrop(true));
    props
      .dispatch(deleteEntryQuery(entryQuery && entryQuery.id))
      .then(res => {
        setEntryQuery({});
        setShowModalDelete(false);

        onList('');
        props.dispatch(showSnackBar("error", "Consulta eliminada"));
        props.dispatch(showBackdrop(false));
        history.push("/inicio");

      }).catch(error => {
        props.dispatch(showBackdrop(false));
        console.log('error', error);
      });
  };

  const onList = (term) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listQueries(term, "", (sectionsIds.indexOf("4") ? idHelpdesk : ""))).then(res => {
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));
     
  };

  const onAcceptEntryQuery = () => {
    props.dispatch(showBackdrop(true));
    props.dispatch(acceptEntryQuery(entryQuery.id, byRecommend)).then(res => {
      const message = res && res.success || "Consulta aceptada"
      props.dispatch(showSnackBar("success", message));
      const chat = res && res.chat;
      history.push(`/chats/${chat.id}`);
      props.dispatch(listPendingQueries(""));
      props.dispatch(showBackdrop(false));
    }).catch(err => { props.dispatch(showBackdrop(false)); props.dispatch(showSnackBar("error", err.response.data.error)); });
  }

  const onRecommendUser = (selectedUserIds) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(recommendUser(selectedUserIds, entryQuery.id)).then(res => {
      const message = res && res.success || "Recomendaciones enviadas";
      props.dispatch(showSnackBar("success", message));
      props.dispatch(showBackdrop(false));
    }).catch(err => { props.dispatch(showBackdrop(false)); props.dispatch(showSnackBar("error", err.response.data.error)); });
  }

  return (
    <Grid container className="all-heigth">
      <Grid item xs={12} style={{ height: '13vh', minHeight: "110px" }}>
        <EQMainHeader
          entryQuery={entryQuery}
          setEntryQuery = {setEntryQuery}
          onGetData={onGetData}
          onOpenModal={onOpenModal}
          onOpenModalDelete={onOpenModalDelete}
          onDelete={onDelete}
          view="entryQueries"
          session={session}
        />
      </Grid>
      <Grid item xs={12} style={{ height: '74vh' }}>
        <EQMainBody 
          entryQuery={entryQuery}
          session={session}
        />
      </Grid>
      <Grid item xs={12} style={{ height: '13vh' }}>
        {
          isHelpDesk && (role == 3 || role == 4) &&
          <EQMainFooter
            entryQuery={entryQuery}
            session={session}
            onAcceptEntryQuery={onAcceptEntryQuery}
            onRecommendUser={onRecommendUser}
            setEntryQuery={setEntryQuery}
          />
        }        
      </Grid>

    </Grid>
  );
}

export default EntryQueryPage;
