import { withStyles, Checkbox } from '@material-ui/core';
import React from 'react';

const CustomCheckboxTag = withStyles({
    root: {
      color: "#EB8D48",
      '&$checked': {
        color: "#EB8D48",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const CustomCheckbox = props => {
    return <CustomCheckboxTag {...props} />
}

export default CustomCheckbox