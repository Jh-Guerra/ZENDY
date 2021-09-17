import React, { Component } from 'react';
import { Input, InputAdornment, Grid, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import NewChatCall from './NewChatCall';
import { listWithUsersCount } from 'services/actions/CompanyAction';
import { showBackdrop } from 'services/actions/CustomAction';
import { useHistory } from 'react-router-dom';
import ItemCompanyRow from '../Components/ItemCompanyRow';
import ItemErrorRow from '../Components/ItemErrorRow';
import { listErrors, listErrorsByUser } from 'services/actions/ErrorAction';
import { getSessionInfo, isClientUser } from 'utils/common';
import TabOptions from './TabOptions';
import CustomModal from 'components/Modals/common/CustomModal';

const ReportedErrorChat = props => {
  const history = useHistory();

  const [errors, setErrors] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);

  const [showReportedErrorModal, setShowReportedErrorModal] = React.useState(false);

  React.useEffect(() => {
    onList('');
  }, []);

  const onList = term => {
    const session = getSessionInfo();
    const isClient = isClientUser(session.role);

    props.dispatch(showBackdrop(true));
    if (isClient) {
      props
        .dispatch(listErrorsByUser(term))
        .then(res => {
          setErrors(res || []);
          props.dispatch(showBackdrop(false));
        })
        .catch(err => props.dispatch(showBackdrop(false)));
    } else {
      props
        .dispatch(listErrors(term))
        .then(res => {
          setErrors(res || []);
          props.dispatch(showBackdrop(false));
        })
        .catch(err => props.dispatch(showBackdrop(false)));
    }
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
    // history.push("/errors/" + error.id);
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
            <br />
          </Grid>
          <Grid item xs={12} style={{ padding: '10px' }}>
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
          <br />
          <Grid item xs={12} style={{ minHeight: '550px' }}>
            <div className="chat-list-items">
              {errors.map((error, i) => {
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

export default ReportedErrorChat;
