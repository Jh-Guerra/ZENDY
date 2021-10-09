import React from 'react';
import { useHistory, withRouter } from "react-router-dom";
import { AppBar, Box, Drawer, Grid, makeStyles, Tab, Tabs, Tooltip, Typography} from '@material-ui/core';
import AvatarHeader from './Childrens/AvatarHeader';
import PropTypes from 'prop-types';
import { CurrentChatIcon, PendingChatIcon, CompaniesIcon, ErrorsIcon, MoreIcon, RecommendLikeIcon } from "assets/styles/svg-icons";
import CurrentChat from './Childrens/CurrentChat';
import ModalMoreActions from 'components/Modals/ModalMoreActions';
import HistoryChat from 'components/mini_drawer/Childrens/HistoryChat';
import AdminNotificationSection from './Childrens/AdminNotificationSection';
import ReportList from './Childrens/ReportList';
import CompanySection from './Childrens/CompanySection';
import ReportedErrorSection from './Childrens/ReportedErrorSection';
import EntryChat from './Childrens/EntryChat';
import { updateLastRoute, updateLastTab } from 'services/actions/CommonAction';
import { checkPermission, getSessionInfo, checkSections } from 'utils/common';
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

const secciones = [
  { title:"Chats Vigentes", icon:"chatVigente", section:"CurrentChat" },
  { title:"Consultas", icon:"consultas", section:"EntryChat"},
  { title:"Consultas Entrantes", icon:"consultasEntrantes", section:"AdminEntryChat"},
  { title:"Mis Recomendaciones", icon:"recomendaciones", section:"AdminMyRecommendationsSection"},
  { title:"", icon:"", section:""},
  { title:"Errores Reportados", icon:"erroresReportados", section:"ReportedErrorSection"},
  { title:"Errores Reportados admin", icon:"erroresAdmin", section:"AdminErrorSection"},
  { title:"Historial de chat", icon:"historyChat", section:"HistoryChat"},
  { title:"Notificaciones admin", icon:"notificacionesAdmin", section:"AdminNotificationSection"},
  { title:"Notificaciones", icon:"notificaciones", section:"NotificationSection"},
  { title:"Reportes", icon:"report", section:"ReportList"},
]

const moreActionSection = { title:"Más Opciones", icon:"MoreIcon", section:"MoreActions"};

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

  const role = session && session.role;


  const [tab, setTab] = React.useState(0);
  const [showModalMoreActions, setShowModalMoreActions] = React.useState(false);
  const [mainSections, setMainSections] = React.useState([]);
  const [secondSections, setSecondSections] = React.useState([]);


  React.useEffect(() => {
    props.dispatch(updateLastRoute(history.location.pathname));
    updateTabByView(history.location.pathname);
  }, [history.location.pathname]);

  React.useEffect(() => {
    if(secciones.length > 5){
      var newMainSections = secciones.filter((section, i) => i < 4); 
      newMainSections.push(moreActionSection);
      var newSecondSections = secciones.filter((section, i) => i >= 4); 
      setMainSections(newMainSections)
      setSecondSections(newSecondSections)
    } else {
      setMainSections(secciones)
      setSecondSections([])
    }
  }, []);

  const logOut = () => {
    props.dispatch(updateStatus(session.user.id, '0' ))
    localStorage.clear();
    history.push("/");
  }

  const updateTabByView = (path) => {
    switch (true) {
      case path.includes("/empresas/"):
        return setTab(2);
      case path.includes("/consultas/"):
        if (checkPermission(session, "acceptEntryQuery"))
        return setTab(2);
        if (checkPermission(session, "createEntryQuery"))
        return setTab(1);
      case path.includes("/notificaciones/"):
         if (checkPermission(session, "createNotifications")) {
         return setTab(8);
         } else {
           return setTab(9);
         }
    }
  }

  const getPageSection = (panel) => {
    switch (panel) {
      case "CurrentChat":
        return <CurrentChat {...props}/>
    case "EntryChat":
        return <EntryChat {...props}/>
    case "AdminEntryChat":
        return <AdminEntryChat {...props}/>
    case "AdminMyRecommendationsSection":
        return <AdminMyRecommendationsSection {...props}/>
    case "ReportedErrorSection":
        return <ReportedErrorSection {...props}/>
    case "AdminErrorSection":
        return <AdminErrorSection {...props}/>
    case "HistoryChat":
        return <HistoryChat {...props}/>
    case "AdminNotificationSection":
        return <AdminNotificationSection {...props}/>
    case "NotificationSection":
        return <NotificationSection {...props}/>
    case "ReportList":
        return <ReportList {...props}/>
    default:
        return null;
    }
  }

  const getIcon = (panel) => {
    switch (panel) {
      case "chatVigente":
        return <CurrentChatIcon/>
    case "consultas":
        return <PendingChatIcon/>
    case "consultasEntrantes":
        return <PendingChatIcon/>
    case "recomendaciones":
        return <RecommendLikeIcon/>
    case "erroresReportados":
        return <ErrorsIcon/>
    case "erroresAdmin":
        return <ErrorsIcon/>
    case "historyChat":
        return <SpeakerNotesIcon/>
    case "notificacionesAdmin":
        return <SmsFailedIcon/>
    case "notificaciones":
        return <SmsFailedIcon/>
    case "report":
        return <AssessmentIcon/>
    case "MoreIcon":
        return <MoreIcon/>
    default:
        return null;
    }
  }

  const handleChangeTab = (event, newTab) => {
    props.dispatch(updateLastTab(newTab || 0));
    if(newTab==4 && mainSections.length != secciones.length){
      setShowModalMoreActions(true);
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
              <AppBar position="static" className="mini-drawer-options" style={{ backgroundColor: "transparent" }}>
                <Tabs
                  value={tab}
                  onChange={handleChangeTab}
                  aria-label="simple tabs example"
                  variant="fullWidth"
                  indicatorColor="primary"
                  style={{height:"100%"}}
                >
                  {
                    (
                      
                      mainSections && mainSections.map((section,index)=>{
                        return (
                    <Tooltip key={index} title={section.title}>
                      <Tab className="mini-drawer-tab" icon={getIcon(section.icon)}/>
                    </Tooltip>
                       );
                      })
                    )
                  }
                  {
                    (
                      
                      secondSections && secondSections.map((section,index)=>{
                        return (
                    <Tooltip key={index+4} title={section.title}>
                      <Tab className="mini-drawer-tab" icon={getIcon(section.icon)} style={{display:"none"}}/>
                    </Tooltip>
                       );
                      })
                    )
                  }
                </Tabs>
              </AppBar>
            </div>
          </Grid>
          <div className="mini-drawer-tabs" style={{height:'79vh'}}>
          {
                    mainSections && mainSections.map((section,index)=>{
                      return (
                        <TabPanel value={tab} index={index} >
                          { getPageSection(section.section) }
                      </TabPanel>
                     );
                    })
                  }
                     {
                    secondSections && secondSections.map((section,index)=>{
                      return (
                        <TabPanel value={tab} index={index + 4}>
                          { getPageSection(section.section) }
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
        getIcon = {getIcon}
      />

    </>
  );
}

const mapStateToProps = (state) => ({ ...state })
export default connect(mapStateToProps)(withRouter(MiniDrawer));

//export default withRouter(MiniDrawer);