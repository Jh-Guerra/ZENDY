import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Drawer, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({

}));

const LateralModal = props => {
  const classes = useStyles();

  return (
    <Drawer anchor="right" open={props.openDetail} onClose={props.onClose}>
      <Box className="base-modal">
        {props.children}
      </Box>
    </Drawer>
  );
};

export default LateralModal;
