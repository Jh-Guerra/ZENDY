import React from 'react';
import clsx from 'clsx';
import { useHistory, withRouter } from "react-router-dom";
import { Drawer} from '@material-ui/core';
import { updateLastRoute } from 'services/actions/CommonAction';
import { drawerStyles } from './style';
import AvatarHeader from './AvatarHeader';
import SelectMenu from './SelectMenu';
import NewChatCall from './NewChatCalll';
import ChatListBar from './ChatListBar';

const MiniDrawer = (props) => {

  const classes = drawerStyles();
  const history = useHistory();

  const { session = {} } = props;

  // const drawerPrincipalItems = [
  //   { id: 1, text: 'Tab 1', icon: 'icon-tab1', route: '/test-view' },
  //   {
  //     id: 11, text: 'Dropdown', icon: 'icon-orders', subItems: [
  //       { id: 110, text: 'Sub Tab 1', route: '/sub-1' },
  //     ], route: '/test-view'
  //   },
  //   { text: 'bottom' },
  //   { text: 'divider' },
  // ]

  React.useEffect(() => {
    if (!props.common.lastRoute) {
      props.dispatch(updateLastRoute(history.location.pathname));
    }
  }, [history.location.pathname, props.path]);

  // React.useEffect(() => {
  //   let currentRoute = props.location.pathname;
  //   let filteredRoute = drawerPrincipalItems.find(item => {
  //     return item.route === currentRoute || (item.subItems && item.subItems.find(subItem => item.route + subItem.route === currentRoute));
  //   });
  // }, [props.location.pathname])

  return (
    <div className={classes.root}  >
      <Drawer variant="permanent" className={clsx(classes.drawer, { [classes.drawerOpen]: true, [classes.drawerClose]: false })} classes={{ paper: clsx({ [classes.drawerOpen]: true, [classes.drawerClose]: false, }), }}>
        <AvatarHeader />
        <SelectMenu/>
        <NewChatCall/>
        <ChatListBar/>
      </Drawer>
    </div>
  );
}
export default withRouter(MiniDrawer);