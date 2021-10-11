import { withStyles, Checkbox } from '@material-ui/core';
import { sColor } from 'assets/styles/zendy-css';
import React from 'react';

const CustomCheckboxTag = withStyles({
    root: {
      color: sColor,
      '&$checked': {
        color: sColor,
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const CustomCheckbox = props => {
    return <CustomCheckboxTag {...props} />
}

export default CustomCheckbox