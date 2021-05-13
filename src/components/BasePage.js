import React from 'react';

import { Box, makeStyles} from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  content: props => ({
    flexGrow: 1,
    backgroundColor: props.backgroundColor,
  }),
}));

const BasePage = props => {
  const classes = useStyles(props);
  return (
    <>
      <main className={classes.content}>
        {!props.tabShown ? <Box height="48px"/> : null}
        {props.privateHeader && props.privateHeader}
        <Box display="flex" flex={1} flexDirection="column" >
            { props.children }
        </Box>
      </main>
    </>
  );
};

const mapStateToProps  = (state) => ({...state})

export default connect(mapStateToProps)(BasePage);
