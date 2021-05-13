import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const PerfilItem = (props) => {
    return (
        <Grid container direction="row" spacing={1} alignItems="center">
            <Grid item>
                <ExitToAppIcon />
            </Grid>
            <Grid item>
                <div className={props.textStyle || "filter-item-label"}><Typography>{props.text}</Typography></div>
            </Grid>
        </Grid>
    )
}

export default PerfilItem