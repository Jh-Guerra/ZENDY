import { Avatar, Box, Divider, IconButton, InputAdornment, InputBase, makeStyles, fade, Tooltip } from '@material-ui/core';
import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PerfilMenu from 'components/perfil_menu/PerfilMenu';
import { logOut } from 'services/actions/AuthAction';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
}));

const HeaderActions = props => {
  const history = useHistory();
  const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).employee || {}
  const nameFirstLetter = user && user.firstName && user.firstName.charAt(0)
  const nameSecondLetter = user && user.lastName && user.lastName.charAt(0)
  const avatarLetters = `${nameFirstLetter}${nameSecondLetter}`

  const [perfilAnchor, setPerfilAnchor] = React.useState(null);

  const perfilOptions = {
    iconRight:'icon-menu', action:'PERFIL_OPTIONS',
    menuItems: [
      {icon:'icon-arrow', text:'Log Out', action:'Logout'}
    ]
  };
  
  const handleClickActions = (event) => {
    setPerfilAnchor(perfilAnchor ? null : event.currentTarget);
  };

  const filterActions = (action) =>{
    switch(action){
      case "Logout":
        onConfirmLogout();
      break;
    }
    onCloseMenu();
  }

  const onCloseMenu = ()  => {
    setPerfilAnchor(null);
  };

  const onConfirmLogout = async () => {
    props.dispatch(logOut());
    history.push("/");
  }

  return(
    <Box display="flex" flex={1} flexDirection="row" justifyContent="flex-end" alignItems="center" onClick={props.onClick}>
      <Box display="flex" ><Avatar>{avatarLetters}</Avatar></Box>
      <Box display="flex" >
        <Tooltip title="Perfil Options" arrow>
          <IconButton onClick={(event)=>{handleClickActions(event)}}>
            <MoreVertIcon/>
          </IconButton>
        </Tooltip>
        <PerfilMenu {...props} open={Boolean(perfilAnchor)} onCloseMenu={onCloseMenu} anchorEl={perfilAnchor} menuData={perfilOptions} handleActions={filterActions}/>
      </Box>
    </Box>
  )
}

export default HeaderActions