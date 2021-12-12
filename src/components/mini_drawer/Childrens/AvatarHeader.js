import { Button, Typography } from "@material-ui/core";
import config from "config/Config";
import React, { Component } from "react";

import Avatar from "../Components/Avatar";
import { getImageProfile, getSessionInfo } from "utils/common";
import { pColorV2, pLetterColor } from "assets/styles/zendy-css";

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import CustomModal from 'components/Modals/common/CustomModal';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BusinessIcon from '@material-ui/icons/Business';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const AvatarHeader = props => {
  //const classes = useStyles();
  const session = getSessionInfo();
  const user = session && session.user || {};

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [showHelpDesks, setShowHelpDesks] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const logOut = () => {
    props.logout();
  }

  const openModal = () => {
    setShowModal(true);
    setOpen(false);
  }

  const openModalHelpDesks = () => {
    setShowHelpDesks(true);
    setOpen(false);
  }

  return (
    <div className="mini-drawer-header" >
      <Avatar
        isOnline={user.isOnline ? "active" : ""}
        image={user.avatar ? (config.api + (user.avatar)) : getImageProfile(user.sex)}
      />
      <div>
        <div>
          <div className={classes.root}>
            <div>
              <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                style={{ fontSize: '18px', color: pLetterColor, marginTop:'20px' }}
                onClick={handleToggle}
              >
                <small>{(`${user.firstName} ${user.lastName}`).length > 30 ? (`${user.firstName} ${user.lastName}`).substring(0, 27) + "..." : (`${user.firstName} ${user.lastName}`)}</small>
              </Button>
              {
                  user.company && (
                    <>
                      <br />
                      <small style={{fontSize:"14px", color: pColorV2, paddingLeft:"8px"}}>{`Empresa: ${user.company.name || ""}`}</small>
                    </>
                  )
              }

              {
                  user.helpDesk && (
                    <>
                      <br />
                      <small style={{fontSize:"14px", color: pColorV2, paddingLeft:"8px"}}>{`Mesa de Ayuda: ${user.helpDesk.name || ""}`}</small>
                    </>
                  )
              }
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal
                style={{ zIndex: 10000 }} placement='bottom-end'
                modifiers={{
                  offset: {
                    enabled: true,
                    offset: '10, 0'
                  }
                }}>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          {user.helpDesk ? 
                            <MenuItem onClick={openModalHelpDesks}>
                              <ListItemIcon style={{ minWidth: '30px' }}>
                                <BusinessIcon fontSize="small" />
                              </ListItemIcon>
                              Cambiar de Mesa de Ayuda
                            </MenuItem> : null
                          }
                          <MenuItem onClick={openModal}>
                            <ListItemIcon style={{ minWidth: '30px' }}>
                              <SettingsIcon fontSize="small" />
                            </ListItemIcon>
                            Cambiar contraseña
                          </MenuItem>
                          <MenuItem onClick={logOut}>
                            <ListItemIcon style={{ minWidth: '30px' }}>
                              <ExitToAppIcon fontSize="small" />
                            </ListItemIcon>
                            Cerrar sesión
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        customModal={'ModalPasswordChange'}
        open={showModal}
        handleClose={() => setShowModal(false)}
      />
      <CustomModal
        customModal={'ModalHelpDesks'}
        open={showHelpDesks}
        handleClose={() => setShowHelpDesks(false)}
      />
    </div>
  )
}

export default AvatarHeader
