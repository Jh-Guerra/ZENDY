import React, { Component } from "react";
import {  makeStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root:{
        width:'100%',
        height:'50px',
        color:'rgb(255 255 255)',
    },
    checkbox:{
        color:'white',
    },
  }));

  const CheckHistory = (props) => {

    const classes = useStyles();
    
    return(
            <Grid  container 
            className={classes.root} 
            direction="row-reverse"
            justify="center"
            alignItems="center">
                <Grid item>
                    <FormControlLabel
                        value="end"
                        control={<Checkbox  
                            color="default"
                            className={classes.checkbox}
                        />}
                        label="Denegados"
                        labelPlacement="end"

                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                        value="end"
                        control={<Checkbox  defaultChecked  className={classes.checkbox} color="default" />}
                        label="Completados"
                        labelPlacement="end"
                    />
                </Grid>
            </Grid>
        );
    
}
export default CheckHistory 