import { Button, withStyles} from '@material-ui/core';
import React from 'react';
import { LightenDarkenColor } from 'utils/common';

const CustomButton = props => {
    const { children, startIcon, customColor="" } = props;

    const ColorButton = withStyles((theme) => ({
        root: {
        color: theme.palette.getContrastText(customColor),
            backgroundColor: customColor,
            '&:hover': {
                backgroundColor: LightenDarkenColor(customColor, 25),
            },
            '&:disabled': {
                backgroundColor: LightenDarkenColor(customColor, 40),
            },
        },
    }))(Button);

    return <ColorButton {...props} startIcon={startIcon && startIcon} >
        {children}
    </ColorButton>;
}

export default CustomButton