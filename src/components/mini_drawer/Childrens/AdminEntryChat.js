import React, { Component } from 'react';
import ItemQueryRow from '../Components/ItemQueryRow';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { listClientChats } from 'services/actions/ChatAction';
import { useHistory } from 'react-router-dom';
import { showBackdrop } from 'services/actions/CustomAction';
import { listPendingQueries } from 'services/actions/EntryQueryAction';
import TabOptions from './TabOptions';
import CustomModal from 'components/Modals/common/CustomModal';

const styles = theme => ({
  search: {
    position: 'relative',
    marginBottom: '30px',
  },
});

const AdminEntryChat = props => {
  const { classes = {}, session } = props;
  const history = useHistory();

  const [entryQueries, setEntryQueries] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [showModalEntryChat, setShowModalEntryChat] = React.useState(false);


  React.useEffect(() => {
    onList("");
  }, []);

  const onList = (term) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listPendingQueries(term)).then(res => {
      setEntryQueries(res || []);
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));;
  };

  const onSearch = term => {
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        onList(term);
      }, 1000)
    );
  };

  const goTo = (entryQuery) => {
    if(entryQuery && entryQuery.id){
      history.push("/consultas/" + entryQuery.id);
    }
  }

  const onSaveForm = () => {
    onList('');
  }

  const onOpenModal = () => {
    setShowModalEntryChat(true);
  }

  return (
    <div style={{height: "79vh"}}>
      <Grid container>
        <Grid item xs={12}>
          <div className="chatlist__heading">
            <span className="divider-line"></span>
            <p className="divider-content"> Consultas Entrantes </p>
            <span className="divider-line"></span>
          </div>
          <br />
        </Grid>
        <Grid item xs={12} style={{padding: '0px 10px'}}>
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
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(AdminEntryChat);