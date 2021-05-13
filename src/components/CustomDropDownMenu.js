import { Divider, makeStyles, MenuItem, Popover } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles(theme => ({
    moreMenu: {
      '& .MuiPaper-root': {
          marginTop: 4,
        borderTopRightRadius: 0,
        minWidth: 160,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#5E94BC',
        borderRadius:8,
        '& .MuiMenuItem-root': {
          textAlign: 'left',
          fontSize: '12px',
          fontWeight: 500,
          fontFamily: 'Helvetica',
          color: '#566774'
        },
      },
    }
  }));

  //TODO: check the warning of key props
const CustomDropDownMenu = props => {
    const classes = useStyles();
    return(
      <Popover
        anchorEl={props.anchorEl} keepMounted open={props.open} onClose={props.onCloseMenu}
        elevation={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        className={classes.moreMenu}>
          {props.menuItems && props.menuItems.map((item, index) => (<div key={index}>
            {item && <MenuItem key={"mi"+index} onClick={ props.onClickItem ? (e)=>{ props.onClickItem(item.action) } : item.action}>{item.text}</MenuItem>}
            {item && (props.menuItems.length - 1 !== index) && <Divider key={"d"+index} style={{marginLeft: '10px'}}/>}
          </div>
          ))}        
      </Popover>
    )
}

export default CustomDropDownMenu