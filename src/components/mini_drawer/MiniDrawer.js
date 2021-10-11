import React from 'react';
import { useHistory, withRouter } from "react-router-dom";
import { AppBar, Drawer, Grid, Tab, Tabs, Tooltip } from '@material-ui/core';
import AvatarHeader from './Childrens/AvatarHeader';
import { CompaniesIcon, MoreIcon } from "assets/styles/svg-icons";
import CurrentChat from './Childrens/CurrentChat';
import ModalMoreActions from 'components/Modals/ModalMoreActions';
import HistoryChat from 'components/mini_drawer/Childrens/HistoryChat';
import AdminNotificationSection from './Childrens/AdminNotificationSection';
import ReportedErrorSection from './Childrens/ReportedErrorSection';
import EntryChat from './Childrens/EntryChat';
import { updateLastRoute, updateLastTab } from 'services/actions/CommonAction';
import { getSessionInfo, getRoleSections } from 'utils/common';
import { updateStatus } from 'services/actions/UserAction';
import AdminEntryChat from './Childrens/AdminEntryChat';
import { connect } from "react-redux";
import AdminMyRecommendationsSection from './Childrens/AdminMyRecommendationsSection';
import NotificationSection from './Childrens/NotificationSection';
import AdminErrorSection from './Childrens/AdminErrorSection';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PeopleIcon from '@material-ui/icons/People';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import TextsmsIcon from '@material-ui/icons/Textsms';
import BusinessIcon from '@material-ui/icons/Business';

const moreActionSection = { name:"moreActions", title:"Más Opciones", order:5, active: true};

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
  const [allSections, setAllSections] = React.useState([]);
  const [usersTab, setUsersTab] = React.useState(-1);
  const [usersNameTab, setUsersNameTab] = React.useState("");
  const [companiesTab, setCompaniesTab] = React.useState(-1);
  const [moreActionsTab, setMoreActionsTab] = React.useState(-1);
  const [mainSections, setMainSections] = React.useState([]);
  const [secondSections, setSecondSections] = React.useState([]);


  React.useEffect(() => {
    props.dispatch(updateLastRoute(history.location.pathname));
    updateTabByView(history.location.pathname);
  }, [history.location.pathname]);

  React.useEffect(() => {
    const currentSections = getRoleSections() || [];
    if(currentSections.length > 5){
      var newMainSections = currentSections.filter((section, i) => i < 4); 
      newMainSections.push(moreActionSection);
      var newSecondSections = currentSections.filter((section, i) => i >= 4); 
      setMainSections(newMainSections)
      setSecondSections(newSecondSections)
    } else {
      setMainSections(currentSections)
      setSecondSections([])
    }

    var usersTab = -1;
    var usersNameTab = "";
    var companiesTab = -1;
    var moreActionsTab = (currentSections && currentSections.length > 5) ? 4 : -1;
    currentSections && currentSections.length > 0 && currentSections.map((section, index) => {
      if(section.name == "adminUsers" || section.name == "companyUsers"){
        usersTab = index;
        usersNameTab = section.name;
      }

      if(section.name == "companies"){
        companiesTab = index;
      }
    })
  
    setUsersTab((usersTab > 4 && moreActionsTab > 0) ? usersTab + 1 : usersTab);
    setUsersNameTab(usersNameTab);
    setCompaniesTab((companiesTab > 4 && moreActionsTab > 0) ? companiesTab + 1 : companiesTab);
    setMoreActionsTab(moreActionsTab);

    setAllSections(currentSections);
  }, []);

  const logOut = () => {
    props.dispatch(updateStatus(session.user.id, '0' ))
    localStorage.clear();
    history.push("/");
  }

  const updateTabByView = (path) => {
    
  }

  const getPageSection = (sectionName) => {
    switch (sectionName) {
      case "vigentChats":
        return <CurrentChat {...props}/>
      case "myEntryQueries":
          return <EntryChat {...props}/>
      case "companyEntryQueries":
          return <AdminEntryChat {...props}/>
      case "recommendations":
          return <AdminMyRecommendationsSection {...props}/>
      case "adminNotifications":
          return <AdminNotificationSection {...props}/>
      case "companyNotifications":
      case "myNotifications":
          return <NotificationSection {...props}/>
      case "adminReportedErrors":
          return <AdminErrorSection {...props}/>
      case "myReportedErrors":
          return <ReportedErrorSection {...props}/>
      case "historyChats":
          return <HistoryChat {...props}/>
      // case "ReportList":
      //     return <ReportList {...props}/>
      default:
          return null;
      }
  }

  const getIcon = (sectionName) => {
    switch (sectionName) {
      case "vigentChats":
        return <ForumIcon/>
      case "adminEntryQueries":
      case "companyEntryQueries":
      case "myEntryQueries":
        return <ModeCommentIcon/>
      case "recommendations":
        return <TextsmsIcon/>
      case "adminNotifications":
      case "companyNotifications":
      case "myNotifications":
        return <NotificationsActiveIcon/>
      case "adminReportedErrors":
      case "companyReportedErrors":
      case "myReportedErrors":
        return <SmsFailedIcon/>
      case "historyChats":
        return <SpeakerNotesIcon/>
      case "companyReports":
      case "adminReports":
        return <AssessmentIcon/>
      case "adminUsers":
      case "companyUsers":
        return <PeopleIcon />
      case "companies":
        return <BusinessIcon />
      case "moreActions":
        return <MoreIcon />
      default:
          return null;
      }
  }

  const handleChangeTab = (event, newTab) => {
    props.dispatch(updateLastTab(newTab || 0));
    if(newTab == moreActionsTab){
      setShowModalMoreActions(true);
    }else if(newTab == usersTab){
      usersNameTab == "adminUsers" ? goToView("usuarios") : goToView("usuarios-empresa");
    }else if (newTab == companiesTab){
      goToView("empresas");
    }else{
      setTab(newTab);
    }
  }

  const goToView = (route) => {
    setShowModalMoreActions(false);
    history.push(`/${route}`);
  }

  return (
    <>
      <Drawer variant="permanent" style={{ height: "100vh" }} className="mini-drawer">
        <AvatarHeader
          logout={() => { logOut() }}
        />
        <Grid container style={{ height: "87vh", width: '450px'}}>
          <Grid item xs={12} style={{height:'8vh', minHeight:'70px'}}>
            <div className="mini-drawer-sections">
              <AppBar position="static" className="mini-drawer-options">
                <Tabs
                  value={tab}
                  onChange={handleChangeTab}
                  aria-label="simple tabs example"
                  variant="fullWidth"
                  indicatorColor="primary"
                  style={{height:"100%"}}
                >
                  {
                    mainSections && mainSections.map((section,index)=>{
                      return (
                        <Tooltip key={index} title={section.title}>
                          <Tab className="mini-drawer-tab" icon={getIcon(section.name)}/>
                        </Tooltip>
                      );
                    })
                  }
                  {
                    secondSections && secondSections.map((section,index)=>{
                      return (
                        <Tooltip key={index + 5} title={section.title}>
                          <Tab className="mini-drawer-tab" icon={getIcon(section.name)} style={{display:"none"}}/>
                        </Tooltip>
                      );
                    })
                  }
                </Tabs>
              </AppBar>
            </div>
          </Grid>
          <div className="mini-drawer-tabs" style={{height:'79vh'}}>
            {
              mainSections && mainSections.map((section, index)=>{
                return (
                  <TabPanel key={index} value={tab} index={index} >
                    { getPageSection(section.name) }
                  </TabPanel>
                );
              })
            }
            {
              secondSections && secondSections.map((section, index)=>{
                return (
                  <TabPanel key={index} value={tab} index={index + 5}>
                    { getPageSection(section.name) }
                  </TabPanel>
                );
              })
            }
          </div> 
        </Grid>
      </Drawer>
      <ModalMoreActions 
        open={showModalMoreActions}
        handleClose={() => { setShowModalMoreActions(false) }}
        goToView={goToView}
        handleChangeTab={handleChangeTab}
        session={session}
        secondSections={secondSections}
        getIcon={getIcon}
      />

    </>
  );
}

const mapStateToProps = (state) => ({ ...state })
export default connect(mapStateToProps)(withRouter(MiniDrawer));
