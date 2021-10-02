import { Button, withStyles} from '@material-ui/core';
import React from 'react';
import { LightenDarkenColor } from 'utils/common';

const CustomButton = props => {
    const { 
        children,
        color=""
     } = props;

     const buttonParams = {...props};
     delete buttonParams.color;

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

    return <ColorButton {...buttonParams}>
        {children}
    </ColorButton>;
}

export default CustomButton