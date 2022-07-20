import React, { Component } from 'react';
import ItemQueryRow from '../Components/ItemQueryRow';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom';
import { showBackdrop } from 'services/actions/CustomAction';
import { listPendingQueries } from 'services/actions/EntryQueryAction';
import CustomModal from 'components/Modals/common/CustomModal';
import TabOptions from './TabOptions';
import { getSessionInfo } from "utils/common";

const styles = theme => ({
  search: {
    position: 'relative',
    marginBottom: '30px',
  },
});

const AdminEntryChat = props => {
  const { entryQueryRx=[] } = props;
  const history = useHistory();

  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [showModalEntryChat, setShowModalEntryChat] = React.useState(false);
  const [showModalEntryChatF, setShowModalEntryChatF] = React.useState(false);
  const session = getSessionInfo();

  var sectionsIds = session && session.role && session.role.sectionIds;
  var idHelpdesk = session && session.user && session.user.idHelpDesk;

  React.useEffect(() => {
    onList("");
  }, []);
 
  const onList = (term) => {
    console.log(sectionsIds)
    console.log(sectionsIds.indexOf("3"))
    console.log(sectionsIds.indexOf(3))
    console.log(sectionsIds)
    props.dispatch(showBackdrop(true));
    props.dispatch(listPendingQueries(term, sectionsIds.indexOf("3") ? idHelpdesk : "")).then(res => {
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));
  };

  const onSearch = term => {
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        onList(term);
      }, 1000)
    );
  };

  const onSaveForm = () => {
    onList('');
  }
  const onOpenModalEntryChat = () => {
    setShowModalEntryChat(true);
  }
  const onOpenModalEntryChatF = () => {
    setShowModalEntryChatF(true);
  }

  const goTo = (entryQuery) => {
    if(entryQuery && entryQuery.id){
      history.push("/consultas/" + entryQuery.id);
    }
  }

  const entryQueries = entryQueryRx && entryQueryRx.entryQueries || [];
  console.log(entryQueries)
  // if(entryQueries.lengh>0)
  // {
  //   if(entryQueries[0])
  // }
  return (
    <div style={{height: "79vh"}}>
      <Grid container style={{height: "100%"}}>
        {
          idHelpdesk && (
            <Grid item xs={12} style={{height: "10vh"}}>
              <TabOptions
                onSaveForm={onSaveForm}
                onOpenModal={onOpenModalEntryChat}
                onOpenModal2={onOpenModalEntryChatF}
                view="entryQueries"
              />
            </Grid>
          )
        }
        <Grid item xs={12} style={{height: "5vh"}}>
          <div className="chatlist__heading">
            <span className="divider-line"></span>
            <p className="divider-content"> Consultas Pendientes </p>
            <span className="divider-line"></span>
          </div>
          <br />
        </Grid>
        <Grid item xs={12} style={{ padding: '10px 10px', height: "7vh" }}>
          <Input
            fullWidth
            className="search_wrap"
            style={{margin: "0px 0px 20px 0px"}}
            type="text"
            placeholder="Buscar consulta"
            onChange={event => onSearch(event.target.value)}
            disableUnderline
            startAdornment= {
              <InputAdornment position="start">
                <IconButton type="button" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={12} style={{height: "67vh"}}>
          <div className="items-section">
            {entryQueries.map((query, i) => {
              return (
                <ItemQueryRow
                  key={i}
                  query={query}
                  goTo={goTo}
                />
              );
            })}
          </div>
        </Grid>
      </Grid>
      <CustomModal
        customModal={'ModalEntryQuery'}
        open={showModalEntryChat}
        handleClose={() => { setShowModalEntryChat(false) }}
        onSaveForm={() => {
          setShowModalEntryChat(false);
          onSaveForm();
      }}
      />
      <CustomModal
        customModal={'ModalFrequentQuery'}
        open={showModalEntryChatF}
        handleClose={() => { setShowModalEntryChatF(false) }}
        onSaveForm={() => {
          setShowModalEntryChatF(false);
          onSaveForm();
      }}
      />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(AdminEntryChat);