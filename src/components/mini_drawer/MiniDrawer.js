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

const useStyles = makeStyles((theme) => ({
  root: {
    width: 380,
    height: "100%"
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

  React.useEffect(() => {
    if (!props.common.lastRoute) {
      props.dispatch(updateLastRoute(history.location.pathname));
    }
  }, [history.location.pathname, props.path]);



  const handleChangeTab = (event, newTab) => {
    setTab(newTab);
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
      <Drawer variant="permanent" style={{height:"100%"}} className={clsx(classes.drawer, { [classes.drawerOpen]: true, [classes.drawerClose]: false })} classes={{ paper: clsx({ [classes.drawerOpen]: true, [classes.drawerClose]: false, }), }}>
        <AvatarHeader />
        <Grid container style={{height:"90%"}}>
          <div className="mini-drawer-sections">
            <Grid xs={12} classes={{root: customClasses.root}}>
              <AppBar position="static" className="mini-drawer-options" style={{backgroundColor:"transparent"}}>
              
                <Tabs 
                  value={tab} 
                  onChange={handleChangeTab} 
                  aria-label="simple tabs example" 
                  variant="fullWidth" 
                  inkBarStyle={{background: 'blue'}}
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
                Item two
            </TabPanel>
            <TabPanel value={tab} index={2} >
              Item Three
            </TabPanel>
          </div> 
        </Grid>
      </Drawer>
    </div>
  );
}
export default withRouter(MiniDrawer);