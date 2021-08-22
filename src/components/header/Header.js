import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import HeaderActions from './HeaderActions';
import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import { headerStyles } from './style'

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: false,
      params: null,
      previousRoute: "",
      loading: false,
      savedAddModalAnchor: null,
    }
  }

  componentDidMount(){

  }
 
  componentDidUpdate(prevProps) {
    // this.setPreviousRoute(prevProps.history.location.pathname)
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar className="appbar-dispatch" position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: this.props.open, })} elevation={0} >
        <Box display="flex" flex={1} flexDirection="row">
          <Box className={classes.borderHeader} display="flex" flexDirection="row" flex={1}>
            <HeaderActions {...this.props} />
          </Box>
        </Box>
      </AppBar>
    )
  }
}

function mapStateToProps(state) {
  const { tabs } = state
  return {
    tabs: tabs.tabs,
    hideTab: tabs.hideTab
  }
}

export default withRouter(withStyles(headerStyles)(Header));