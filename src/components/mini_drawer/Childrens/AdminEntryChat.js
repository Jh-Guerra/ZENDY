import React, { Component } from 'react';
import ItemQueryRow from '../Components/ItemQueryRow';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputAdornment, Paper, Grid, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom';
import { showBackdrop } from 'services/actions/CustomAction';
import { listPendingQueries } from 'services/actions/EntryQueryAction';

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

  React.useEffect(() => {
    onList("");
  }, []);

  const onList = (term) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listPendingQueries(term)).then(res => {
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

  const entryQueries = entryQueryRx && entryQueryRx.entryQueries || [];

  return (
    <div style={{height: "79vh"}}>
      <Grid container style={{height: "100%"}}>
        <Grid item xs={12} style={{height: "5vh"}}>
          <div className="chatlist__heading">
            <span className="divider-line"></span>
            <p className="divider-content"> Consultas Entrantes </p>
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
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(AdminEntryChat);