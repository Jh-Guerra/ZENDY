import React, { Component } from 'react';
import ItemQueryRow from '../Components/ItemQueryRow';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase, FormControlLabel } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom';
import { showBackdrop } from 'services/actions/CustomAction';
import { listQueries } from 'services/actions/EntryQueryAction';
import TabOptions from './TabOptions';
import CustomModal from 'components/Modals/common/CustomModal';
import { getSessionInfo } from "utils/common";
import { ENTRY_QUERY } from 'services/redux/common/Types';
import CustomCheckbox from 'components/CustomCheckbox';
import { set } from 'date-fns';


const styles = theme => ({
  search: {
    position: 'relative',
    marginBottom: '30px',
  },
});

const EntryChat = props => {
  const { entryQueryRx=[] } = props;
  const history = useHistory();

  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [showModalEntryChat, setShowModalEntryChat] = React.useState(false);
  const [showModalEntryChatF, setShowModalEntryChatF] = React.useState(false);
  const [isPending, setIsPending] =React.useState(true);
  const [isAccepted, setIsAccepted] = React.useState(false);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    onList("");
  }, []);

  const onList = (term, status) => {
      props.dispatch(showBackdrop(true));
      props.dispatch(listQueries(term, status)).then(res => {
        props.dispatch(showBackdrop(false));
      }).catch(err => props.dispatch(showBackdrop(false)));;   
  };

  const onSearch = term => {
    setSearch(term)
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        onList(term, isAccepted && "Aceptado" );
      }, 1000)
    );
  };

  const goTo = (query) => {
     history.push("/consultas/" + query.id);
  }

  const onSaveForm = () => {
    onList('');
  }

  const onOpenModalEntryChat = () => {
    setShowModalEntryChat(true);
  }
  const onOpenModalEntryChatF = () => {
    setShowModalEntryChatF(true);
  }

  const onChangeCheck = (value) => {
    if(value == 'Pendiente'){
      setIsPending(true)
      setIsAccepted(false)
    } else if(value == 'Aceptado'){
      setIsPending(false)
      setIsAccepted(true)
    }
    setSearch("")
    onList("",value);
  }
  const entryQueries = entryQueryRx && entryQueryRx.entryQueries || [];

  return (
    <div style={{height: "79vh"}}>
      <Grid container>
        <Grid item xs={12}>
          <TabOptions
            onSaveForm={onSaveForm}
            onOpenModal={onOpenModalEntryChat}
            onOpenModal2={onOpenModalEntryChatF}
            view="entryQueries"
          />
        </Grid>
        <Grid item xs={12}>
          <div className="chatlist__heading">
            <span className="divider-line"></span>
            <p className="divider-content"> Consultas </p>
            <span className="divider-line"></span>
          </div>
          <br />
        </Grid>
        <Grid item xs={12} style={{padding: '0px 10px'}}>
          <Input
            fullWidth
            className="search_wrap"
            type="text"
            value={search}
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
        <Grid item xs={12} style={{ padding: '0px 10px' }}>
          <FormControlLabel
            control={
              <CustomCheckbox
                checked={isPending}
                value={'Pendiente'}
                onChange={(event) => {
                  onChangeCheck(event.target.value)
                }}
              />
            }
            label="Pendientes"
            style={{ color: 'white', marginLeft: '10px' }}
          />
          <FormControlLabel
            control={
              <CustomCheckbox
                value={'Aceptado'}
                checked={isAccepted}
                onChange={(event) => {
                  onChangeCheck(event.target.value)
                }}
              />
            }
            label="Aceptados"
            style={{ color: 'white', marginLeft: '10px' }}
          />
        </Grid>
        <Grid item xs={12}>
          {entryQueries.map((query, i) => {
            return (
               <ItemQueryRow
                 key={i}
                 query={query}
                 goTo={goTo}
               />
            );
          })}
        </Grid>
      </Grid>
      <CustomModal
        customModal={'ModalEntryQuery'}
        open={showModalEntryChat}
        handleClose={() => { setShowModalEntryChat(false) }}
        onSaveForm={() => {
          setShowModalEntryChat(false);
         // handleClose();
          onSaveForm();
      }}
      />
      <CustomModal
        customModal={'ModalFrequentQuery'}
        open={showModalEntryChatF}
        handleClose={() => { setShowModalEntryChatF(false) }}
        onSaveForm={() => {
          setShowModalEntryChatF(false);
         // handleClose();
          onSaveForm();
      }}
      />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(EntryChat);