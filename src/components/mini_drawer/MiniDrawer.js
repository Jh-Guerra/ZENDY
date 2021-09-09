import React from 'react';
import { useHistory, withRouter } from "react-router-dom";
import { AppBar, Box, Drawer, Grid, makeStyles, Tab, Tabs, Tooltip, Typography} from '@material-ui/core';
import AvatarHeader from './Childrens/AvatarHeader';
import PropTypes from 'prop-types';
import { CurrentChatIcon, PendingChatIcon, CompaniesIcon, ErrorsIcon, MoreIcon } from "assets/styles/svg-icons";
import CurrentChat from './Childrens/CurrentChat';
import ModalMoreActions from 'components/Modals/ModalMoreActions';
import HistoryChat from 'components/mini_drawer/Childrens/HistoryChat';
import NotifyChat from './Childrens/NotifyChat';
import ReportList from './Childrens/ReportList';
import EnterpriseChat from './Childrens/EnterpriseChat';
import ReportedErrorChat from './Childrens/ReportedErrorChat';
import EntryChat from './Childrens/EntryChat';
import { updateLastRoute, updateLastTab } from 'services/actions/CommonAction';
import { checkPermission, getSessionInfo } from 'utils/common';
import { updateStatus } from 'services/actions/UserAction';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 380,
    height: "100%",
    minWidth: 380
  },
  tab: {
    minWidth: 50,
    width: 50,
    // height: "100%"
  }
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{width:"100%", maxHeight: "100%", minHeight:"100%"}}
      {...other}
    >
      {value === index && (
        children
      )}
    </div>
  );
}

const MiniDrawer = (props) => {

  const history = useHistory();
  const session = getSessionInfo();


  const [tab, setTab] = React.useState(0);
  const [showModalMoreActions, setShowModalMoreActions] = React.useState(false);

  React.useEffect(() => {
    props.dispatch(updateLastRoute(history.location.pathname));
    updateTabByView(history.location.pathname);
  }, [history.location.pathname]);

  const logOut = () => {
    props.dispatch(updateStatus(session.user.id, '0' ))
    localStorage.clear();
    history.push("/");
  }

  const updateTabByView = (path) => {
    switch (true) {
      case path.includes("/empresas/"):
        return setTab(2);
    }
  }

  const handleChangeTab = (event, newTab) => {
    props.dispatch(updateLastTab(newTab || 0));
    if(newTab==4){
      setShowModalMoreActions(true);
    }else{
      setTab(newTab);
    }
  }

  const goToView = (route) => {
    setShowModalMoreActions(false);
    history.push(`/${route}`);
  }
  
  // TabPanel.propTypes = {
  //   children: PropTypes.node,
  //   index: PropTypes.any.isRequired,
  //   value: PropTypes.any.isRequired,
  //   classes: PropTypes.object
  // };

  return (
    <>
      <Drawer variant="permanent" style={{ height: "100vh" }} className="mini-drawer">
        <AvatarHeader
          logout={() => { logOut() }}
        />
        <Grid container style={{ height: "87vh", width: '450px'}}>
          <Grid item xs={12} style={{height:'8vh', minHeight:'70px'}}>
            <div className="mini-drawer-sections">
              <AppBar position="static" className="mini-drawer-options" style={{ backgroundColor: "transparent" }}>
                <Tabs
                  value={tab}
                  onChange={handleChangeTab}
                  aria-label="simple tabs example"
                  variant="fullWidth"
                  indicatorColor="primary"
                  style={{height:"100%"}}
                >
                  <Tooltip title="Chats Vigentes">
                    <Tab className="mini-drawer-tab" icon={<CurrentChatIcon />} />
                  </Tooltip>
                  <Tooltip style={{display: checkPermission(session, "createEntryQuery") ? "inline-flex" : "none" }} title={(session && session.role && ['1', '2'].includes(session.role.id)) ? "Consultas Entrantes" : "Consultas" }>
                    <Tab className="mini-drawer-tab" icon={<PendingChatIcon />} />
                  </Tooltip>
                  <Tooltip style={{display: checkPermission(session, "showTabCompany") ? "inline-flex" : "none" }} title="Empresas">
                    <Tab className="mini-drawer-tab" icon={<CompaniesIcon />} />
                  </Tooltip>
                  <Tooltip title="Errores Reportados">
                    <Tab className="mini-drawer-tab" icon={<ErrorsIcon />} />
                  </Tooltip>
                  <Tooltip title="Más">
                    <Tab className="mini-drawer-tab" icon={<MoreIcon />} />
                  </Tooltip>
                  <Tab style={{display: "none"}} className="mini-drawer-tab" icon={<MoreIcon />} />
                  <Tab style={{display: "none"}} className="mini-drawer-tab" icon={<MoreIcon />} />
                  <Tab style={{display: "none"}} className="mini-drawer-tab" icon={<MoreIcon />} />
                </Tabs>
              </AppBar>
            </div>
          </Grid>
          <div className="mini-drawer-tabs" style={{height:'79vh'}}>
            <TabPanel value={tab} index={0} >
              <CurrentChat {...props}/>
            </TabPanel>
            <TabPanel value={tab} index={1} >
              <EntryChat {...props} session={session}/>
            </TabPanel>
            <TabPanel value={tab} index={2} >
              <EnterpriseChat
                {...props}
                goToView={goToView} />
            </TabPanel>
            <TabPanel value={tab} index={3} >
              <ReportedErrorChat 
                {...props}
              />
            </TabPanel>
            <TabPanel value={tab} index={5} >
              <HistoryChat/>
            </TabPanel>
            <TabPanel value={tab} index={6} >
              <NotifyChat/>
            </TabPanel>
            <TabPanel value={tab} index={7} >
              <ReportList/>
            </TabPanel>
          </div> 
        </Grid>
      </Drawer>
      <ModalMoreActions 
        open={showModalMoreActions}
        handleClose={() => { setShowModalMoreActions(false) }}
        goToView={goToView}
        handleChangeTab={handleChangeTab}
        session={session}
      />

    </>
  );
}
export default withRouter(MiniDrawer);