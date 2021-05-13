import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.tooltip,
      color: '#fff',
    },
  }));

const CustomBackdrop = props =>{
    const classes = useStyles();
    return(
        <Backdrop className={classes.backdrop} open={props.open}>
            <CircularProgress style={{color:'#F5F7FA'}} />
        </Backdrop>
    )
}

export default CustomBackdrop