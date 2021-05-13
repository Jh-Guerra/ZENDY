import React from 'react';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import { useHistory, withRouter } from "react-router-dom";
import Logo from '../../assets/images/logo.png';
import Title from '../../assets/images/title.png';
import { Drawer, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Collapse, Box, Paper } from '@material-ui/core';
import Header from 'components/header/Header';
import { updateLastRoute } from 'services/actions/CommonAction';
import { drawerStyles } from './style'

const MiniDrawer = (props) => {

  const { session = {} } = props;
  const { assignedShop = {}, accessToken = "" } = session;

  const classes = drawerStyles();
  const [open, setOpen] = React.useState(true);
  const [openOrders, setOpenOrders] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(false);
  const [selectedIndexSubList, setSelectedIndexSubList] = React.useState(false);
  const [activateMouseOver, setFlagMouserOver] = React.useState(false);
  const [mouseOverItem, setMouseOverItem] = React.useState(false);
  const [mouseOverSubItem, setMouseOverSubItem] = React.useState(false);
  const [closeSearch, setCloseSearch] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (!props.common.lastRoute) {
      props.dispatch(updateLastRoute(history.location.pathname));
    }
  }, [history.location.pathname, props.path]);

  const drawerPrincipalItems = [
    { id: 0, text: 'Tab 1', icon: 'icon-tab1', route: '/test-view' },
    {
      id: 1, text: 'Dropdown', icon: 'icon-orders', subItems: [
        { id: 10, text: 'Sub Tab 1', route: '/test-view' },
        { id: 11, text: 'Sub Tab 2', route: '/test-view' },
      ], route: '/test-view'
    },
    { text: 'bottom' },
    { text: 'divider' },
  ]

  React.useEffect(() => {
    let currentRoute = props.location.pathname
    let splitCurrentRoute = currentRoute.split("/")

    let filteredRoute = drawerPrincipalItems.find(item => ((item.route === currentRoute) || (item.subItems && item.subItems.find(subItem => subItem.route === currentRoute))))
    let filteredSubRoute = null

    if (filteredRoute && filteredRoute.subItems && filteredRoute.subItems.length>0){
      filteredSubRoute = filteredRoute.subItems.find(subItem => subItem.route === currentRoute)
    }else{
      filteredRoute = null
    }

    if (filteredSubRoute){
      setSelectedIndexSubList(filteredSubRoute.id)
      setSelectedIndex(filteredRoute.id)
    }

    if (filteredRoute && !filteredSubRoute){
      setSelectedIndex(filteredRoute.id)
      setSelectedIndexSubList(false)
    }

    if (!filteredRoute && !filteredSubRoute){
      let baseRouteName = ""
      if (splitCurrentRoute && splitCurrentRoute[0] === "") {
        baseRouteName = splitCurrentRoute[1]
      }else{
        baseRouteName = splitCurrentRoute[0]
      }

      let baseRoute = "/" + baseRouteName
      let filteredBaseRoute = drawerPrincipalItems.find(item => item.route === baseRoute)
      setSelectedIndex(filteredBaseRoute && filteredBaseRoute.id)
      setSelectedIndexSubList(false)

    }
  }, [props.location.pathname])

  const handleDrawerOpenClose = () => {
    setFlagMouserOver(open);
    setOpen(!open);
    setOpenOrders(false);
  };

  const handleListItemClick = (event, item) => {
    if (item.text === 'Dropdown') {
      setOpen(true);
      setOpenOrders(!openOrders);
    } else {
      setOpenOrders(false);
      props.dispatch(updateLastRoute(item.route));
      history.push(item.route);
    }
  };

  const handleSubListItemClick = (event, item) => {
    props.dispatch(updateLastRoute(item.route));
    history.push(item.route)
  }

  const handleMouseOver = () => {
    if (activateMouseOver) {
      setOpen(true);
      if (history.location.pathname.includes("/subMenu/")) {
        setOpenOrders(true);
      }
    }
  }

  const handleMouseLeave = () => {
    if (activateMouseOver) {
      setOpen(false);
      setOpenOrders(false);
    }
  }

  const handleMouseOverItem = (event, item) => { setMouseOverItem(item.id); }

  const handleMouserLeaveOverItem = () => { setMouseOverItem(50); }

  const handleMouseOverSubItem = (event, item) => {
    setMouseOverSubItem(item.id);
  }

  const handleMouserLeaveOverSubItem = () => { setMouseOverSubItem(50); }

  const handleClickDrawer = () => {
    if (closeSearch) {
      setCloseSearch(!closeSearch);
    }
  }

  const updateFlagSearch = (flag) => {
    setCloseSearch(flag)
  }

  const collapaseDrawerButtonClassName = clsx(
    classes.drawerButtonOpenNormal,
    { [classes.drawerButtonOpenDesactivated]: open, [classes.drawerButtonOpenActivated]: !open, }
  )

  const collapaseDrawerButtonClasses = clsx({
    [classes.drawerButtonOpenDesactivated]: open,
    [classes.drawerButtonOpenActivated]: !open,
  })

  const drawerSubContent = (item) => item.subItems ? (
    <Collapse in={openOrders} timeout="auto" unmountOnExit >
      {
        item.subItems.map(subitem => {
          return (
            <ListItem button className={classes.nested} key={subitem.id} onClick={(event) => handleSubListItemClick(event, subitem)} onMouseLeave={handleMouserLeaveOverSubItem} onMouseOver={(event) => handleMouseOverSubItem(event, subitem)} style={selectedIndexSubList === subitem.id || mouseOverSubItem === subitem.id ? { backgroundColor: 'rgba(235, 141, 72, 0.2)' } : { backgroundColor: 'transparent' }}>
              {selectedIndexSubList === subitem.id ?
                <Paper className={classes.leftSelectedSubItemBars} variant="outlined" square /> : null
              }
              <ListItemText primary={subitem.text} style={selectedIndexSubList === subitem.id ? { color: '#566774', marginLeft: '18px' } : { color: '#999EA5', marginLeft: '18px' }} />
            </ListItem>

          )
        })
      }
    </Collapse>
  ) : null

  const drawerContent = drawerPrincipalItems.map((item, index) => {
    switch (item.text) {
      case 'divider':
        return (<Divider key={index} variant="middle" />)
      case 'bottom':
        return (<ListItemText key={index} />)
      default:
        return (
          <div key={index} style={selectedIndex === item.id || mouseOverItem === item.id ? { backgroundColor: 'rgba(235, 141, 72, 0.1)' } : { backgroundColor: 'transparent' }}>
            {selectedIndex === item.id ?
              <Paper className={classes.leftSelectedItemBars} variant="outlined" square /> : null
            }
            <ListItem button key={index} onClick={(event) => handleListItemClick(event, item)} onMouseLeave={handleMouserLeaveOverItem} onMouseOver={(event) => handleMouseOverItem(event, item)}>
              <ListItemIcon className={item.icon} style={selectedIndex === item.id || mouseOverItem === item.id ? { fontSize: 16, color: '#EB8D48', paddingLeft: '8px' } : { fontSize: 16, color: '#999EA5', paddingLeft: '8px' }}></ListItemIcon>
              <ListItemText primary={item.text} style={selectedIndex === item.id ? { color: '#566774', fontWeight: '500' } : { color: '#999EA5' }} />
              {item.subItems ? openOrders ? <ArrowDropUp style={selectedIndex === item.id || mouseOverItem === item.id ? { color: '#EB8D48' } : { color: '#999EA5' }} /> : <ArrowDropDown style={selectedIndex === item.id || mouseOverItem === item.id ? { color: '#EB8D48' } : { color: '#999EA5' }} /> : null}
            </ListItem>

            {drawerSubContent(item)}
          </div>
        )
    }
  })

  return (
    <div className={classes.root}  >
      <Header open={open} closeSearch={closeSearch} updateFlagSearch={updateFlagSearch} {...props} />
      <Box className={collapaseDrawerButtonClassName} zIndex="modal" border={1} borderRadius="100%" borderColor="#CFD3DB">
        <IconButton onClick={handleDrawerOpenClose} style={{ backgroundColor: '#F5F7FA' }} size="small">
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      <Drawer variant="permanent" onClick={handleClickDrawer} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className={clsx(classes.drawer, { [classes.drawerOpen]: open, [classes.drawerClose]: !open, })} classes={{ paper: clsx({ [classes.drawerOpen]: open, [classes.drawerClose]: !open, }), }}>
        <div className={classes.toolbar} onClick={() => {props.history.push('/test-view')}} style={{cursor: 'pointer'}}>
          <ListItem >
            <ListItemIcon><img src={Logo} alt="logo-icon" /></ListItemIcon>
            <ListItemIcon style={{ marginLeft: '-8px' }}><img src={Title} alt="title-icon" /></ListItemIcon>
          </ListItem>
        </div>
        {drawerContent}
      </Drawer>

    </div>
  );
}
export default withRouter(MiniDrawer);