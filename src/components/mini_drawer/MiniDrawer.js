import React from 'react';
import clsx from 'clsx';
import { useHistory, withRouter } from "react-router-dom";
import { AppBar, Box, Drawer, Grid, makeStyles, Tab, Tabs, Tooltip, Typography} from '@material-ui/core';
import { updateLastRoute } from 'services/actions/CommonAction';
import { drawerStyles } from './style';
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
import EntryQueryChat from './Childrens/EntryQueryChat';

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
  },

}));

const MiniDrawer = (props) => {

  const classes = drawerStyles();
  const customClasses = useStyles();
  const history = useHistory();

  const { session = {} } = props;

  const [tab, setTab] = React.useState(0);
  const [showModalMoreActions, setShowModalMoreActions] = React.useState(false);

  React.useEffect(() => {
    if (!props.common.lastRoute) {
      props.dispatch(updateLastRoute(history.location.pathname));
    }
  }, [history.location.pathname, props.path]);

  const LogOut = () => {
    localStorage.clear();
    props.history.push("/");
  }

  const handleChangeTab = (event, newTab) => {
    if(newTab==4){
      setShowModalMoreActions(true);
    }else{
      setTab(newTab);
    }
  }

  const goToView = (route) => {
    setShowModalMoreActions(false);
    props.history.push("/");
    history.push(route);
  }

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{width:"100%", maxHeight: "100%"}}
        {...other}
      >
        {value === index && (
          children
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    classes: PropTypes.object
  };

  return (
    <div className={classes.root}  >
      <Drawer variant="permanent" style={{ height: "100%" }} className={clsx(classes.drawer, { [classes.drawerOpen]: true, [classes.drawerClose]: false })} classes={{ paper: clsx({ [classes.drawerOpen]: true, [classes.drawerClose]: false, }), }}>
        <AvatarHeader
          Logout={() => { LogOut() }}
        />
        <Grid container style={{ height: "90%" }}>
          <div className="mini-drawer-sections">
            <Grid item xs={12} classes={{ root: customClasses.root }}>
              <AppBar position="static" className="mini-drawer-options" style={{ backgroundColor: "transparent" }}>

                <Tabs
                  value={tab}
                  onChange={handleChangeTab}
                  aria-label="simple tabs example"
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                  style={{height:"100%"}}
                >
                  <Tooltip title="Chats Vigentes">
                    <Tab classes={{root: customClasses.tab}} icon={<CurrentChatIcon />} />
                  </Tooltip>
                  <Tooltip title="Consultas Entrantes">
                    <Tab classes={{root: customClasses.tab}} icon={<PendingChatIcon />} />
                  </Tooltip>
                  <Tooltip title="Empresas">
                    <Tab classes={{root: customClasses.tab}} icon={<CompaniesIcon />} />
                  </Tooltip>
                  <Tooltip title="Errores Reportados">
                    <Tab classes={{root: customClasses.tab}} icon={<ErrorsIcon />} />
                  </Tooltip>
                  <Tooltip title="Más">
                    <Tab classes={{root: customClasses.tab}} icon={<MoreIcon />} />
                  </Tooltip>
                </Tabs>
              </AppBar>
            </Grid>
          </div>
          <div className="mini-drawer-tabs">
            <TabPanel value={tab} index={0} >
              <CurrentChat />
            </TabPanel>
            <TabPanel value={tab} index={1} >
              <EntryQueryChat />
            </TabPanel>
            <TabPanel value={tab} index={2} >
              <EnterpriseChat
                {...props}
                goToView={goToView} />
            </TabPanel>
            <TabPanel value={tab} index={3} >
              <ReportedErrorChat />
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
      />

    </div>
  );
}
export default withRouter(MiniDrawer);