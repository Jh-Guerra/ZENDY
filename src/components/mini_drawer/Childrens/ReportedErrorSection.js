import React, { Component } from 'react';
import { Input, InputAdornment, Grid, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { showBackdrop } from 'services/actions/CustomAction';
import { useHistory } from 'react-router-dom';
import ItemErrorRow from '../Components/ItemErrorRow';
import TabOptions from './TabOptions';
import CustomModal from 'components/Modals/common/CustomModal';
import { listErrorsByUser } from 'services/actions/ErrorAction';

const ReportedErrorSection = props => {
  const { errorRx } = props;
  const history = useHistory();

  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [showReportedErrorModal, setShowReportedErrorModal] = React.useState(false);

  React.useEffect(() => {
    onList('');
  }, []);

  const onList = term => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listErrorsByUser(term)).then(res => {
          props.dispatch(showBackdrop(false));
        })
        .catch(err => props.dispatch(showBackdrop(false)));
    };

  const onSearch = term => {
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        onList(term);
      }, 1000)
    );
  };

  const openReportedErrorModal = () => {
    setShowReportedErrorModal(true);
  }

  const goTo = error => {
    history.push("/error-info/" + error.id);
  };

  const onSaveForm = () => {
    onList('');
  };

  return (
    <div style={{ height: '79vh' }}>
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={12}>
          <TabOptions 
            onSaveForm={onSaveForm} 
            view="reportedErrors"
            onOpenModal={openReportedErrorModal}
          />
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={12}>
            <div className="chatlist__heading">
              <span className="divider-line"></span>
              <p className="divider-content">Errores Reportados</p>
              <span className="divider-line"></span>
            </div>
          </Grid>
          <Grid item xs={12} style={{ padding: '0px 10px' }}>
            <Input
              fullWidth
              className="search_wrap"
              type="text"
              placeholder="Buscar empresas"
              onChange={event => onSearch(event.target.value)}
              disableUnderline
              startAdornment={
                <InputAdornment position="start">
                  <IconButton type="button" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12} style={{ minHeight: '550px' }}>
            <div style={{height: "46vh", overflowY: "scroll", marginTop:"15px"}}>
                {errorRx.error && errorRx.error.map((error, i) => {
                  return <ItemErrorRow key={i} error={error} goTo={goTo} />;
                })}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <CustomModal
          customModal={'ModalReportedErrors'}
          open={showReportedErrorModal}
          handleClose={() => setShowReportedErrorModal(false)}
          onSaveForm={onSaveForm}
        />
    </div>
  );
};

export default ReportedErrorSection;
