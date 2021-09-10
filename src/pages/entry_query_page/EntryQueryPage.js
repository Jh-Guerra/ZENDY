import React, { Component } from 'react';
import { Grid } from "@material-ui/core";
import { showBackdrop } from 'services/actions/CustomAction';
import { useHistory } from 'react-router-dom';
import { findEntryQuery } from 'services/actions/EntryQueryAction';
import EQMainHeader from './Childrens/EQMainHeader';
import EQMainBody from './Childrens/EQMainBody';
import EQMainFooter from './Childrens/EQMainFooter';

const EntryQueryPage = (props) => {

  const history = useHistory();

  const [entryQuery, setEntryQuery] = React.useState({});

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
      setEntryQuery(res.entryQuery || {});
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));
  };

  return (
    <Grid container style={{height:'100vh'}}>
      <Grid item xs={12} style={{height:'13vh'}}>
        <EQMainHeader
          entryQuery={entryQuery}
        />
      </Grid>
      <Grid item xs={12} style={{height:'13vh'}}>
        <EQMainBody/>
      </Grid>
      <Grid item xs={12} style={{height:'74vh'}}>
        <EQMainFooter/>
      </Grid>
    </Grid>
  );
}

export default EntryQueryPage;
