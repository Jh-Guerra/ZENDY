import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { useHistory } from 'react-router-dom';
import { findEntryQuery, deleteEntryQuery } from 'services/actions/EntryQueryAction';
import EQMainHeader from './Childrens/EQMainHeader';
import EQMainBody from './Childrens/EQMainBody';
import EQMainFooter from './Childrens/EQMainFooter';
import { listQueries } from 'services/actions/EntryQueryAction';
import { getSessionInfo } from "utils/common";

const EntryQueryPage = (props) => {
  const history = useHistory();

  const [entryQuery, setEntryQuery] = React.useState({});
  const [showModalEntryChat, setShowModalEntryChat] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);

  const session = getSessionInfo();


  React.useEffect(() => {
    if(props.location.pathname){
      const pathArray = props.location.pathname.split("/");
      const entryQueryId = pathArray && pathArray[pathArray.length-1];
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
    }).catch(err => props.dispatch(showBackdrop(false)));
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
        console.error('error', error);
      });
  };

  const onList = (term) => {
    props.dispatch(showBackdrop(true));
      props.dispatch(listQueries(term)).then(res => {
        setEntryQuery(res || []);
        props.dispatch(showBackdrop(false));
      }).catch(err => props.dispatch(showBackdrop(false)));;
  };



  return (
    <Grid container style={{ height: '100vh' }}>
      <Grid item xs={12} style={{ height: '13vh' }}>
        <EQMainHeader
          entryQuery={entryQuery}
          onGetData={onGetData}
          onOpenModal={onOpenModal}
          onOpenModalDelete={onOpenModalDelete}
          onDelete={onDelete}
          view="entryQueries"
          session={session}
        />
      </Grid>
      <Grid item xs={12} style={{ height: '13vh' }}>
        <EQMainBody />
      </Grid>
      <Grid item xs={12} style={{ height: '74vh' }}>
        <EQMainFooter 
        entryQuery={entryQuery}
        session={session}
        />
      </Grid>

    </Grid>
  );
}

export default EntryQueryPage;
