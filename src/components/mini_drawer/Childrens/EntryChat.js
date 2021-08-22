import React, { Component } from 'react';
import ItemAvatarRow from '../Components/ItemAvatarRow';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { listClientChats } from 'services/actions/ChatAction';
import NewChatCall from './NewChatCall';
import { useHistory } from 'react-router-dom';
import { showBackdrop } from 'services/actions/CustomAction';
import { listPendingQueries } from 'services/actions/EntryQueryAction';

const styles = theme => ({
  search: {
    position: 'relative',
    marginBottom: '30px',
  },
});

const EntryChat = props => {
  const { classes = {}, session } = props;
  const history = useHistory();

  const [entryQueries, setEntryQueries] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);

  React.useEffect(() => {
    onList("");
  }, []);

  const onList = (term) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listPendingQueries(term)).then(res => {
      console.log("res", res);
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

  const goToChat = (chat) => {
    // history.push("/chat/empresa/" + id);
  }

  const onSaveForm = () => {
    
  }

  return (
    <div style={{height: "79vh"}}>
      <Grid container>
        <Grid item xs={12}>
          <NewChatCall onSaveForm={onSaveForm} />
        </Grid>
        <Grid item xs={12}>
          <div className="chatlist__heading">
            <span className="divider-line"></span>
            <p className="divider-content">{ (session && session.role && ['1', '2'].includes(session.role.id)) ? "Consultas Entrantes" : "Consultas" } </p>
            <span className="divider-line"></span>
          </div>
          <br />
        </Grid>
        <Grid item xs={12} style={{padding: '0px 10px'}}>
          <Input
            fullWidth
            className="search_wrap"
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
              <p> asdasd </p>
              // <ItemAvatarRow
              //   key={i}
              //   chat={query}
              //   goToChat={goToChat}
              // />
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(EntryChat);