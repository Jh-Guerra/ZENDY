import { Button, ButtonBase, Tooltip, withStyles} from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import React from 'react';
import { LightenDarkenColor } from 'utils/common';

const CustomButton = props => {
    const { children, startIcon, size, variant, color } = props;

    const ColorButton = withStyles((theme) => ({
        root: {
        color: theme.palette.getContrastText(color),
            backgroundColor: color,
            '&:hover': {
                backgroundColor: LightenDarkenColor(color, 25),
            },
            '&:disabled': {
                backgroundColor: LightenDarkenColor(color, 40),
            },
        },
    }))(Button);

    return <ColorButton {...props} startIcon={startIcon && startIcon} >
        {children}
    </ColorButton>;
}

export default CustomButton