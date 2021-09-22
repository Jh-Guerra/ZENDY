import { Avatar, Grid, makeStyles, Typography, Divider, Button, GridListTile } from '@material-ui/core';
import React from 'react';
import ModalBody from './common/ModalBody';
import Modal from './common/Modal';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import TimerIcon from '@material-ui/icons/Timer';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ModalHeader from './common/ModalHeader';
import config from 'config/Config';

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(14),
    borderColor: 'blue',
  },
  detailsBox: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ModalGroupChatDetail = props => {
  const classes = useStyles();
  const { open, handleClose, chat } = props;
  const chatLifetime = Math.round((new Date().getTime() - new Date(chat.startDate).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Modal open={open} handleClose={handleClose} size="lg">
      <ModalHeader
        icon={<PeopleAltIcon />}
        text={chat.participants && chat.participants.length + " participantes"}
      />

      <ModalBody>
        <Grid container spacing={3}>
          <Grid container item xs={12} direction="column" alignItems="center" justify="center" spacing={3}>
            <Grid container item direction="row" justify="space-between" alignItems="flex-start" width="100%">
              <Box className={classes.detailsBox}>
                <TimerIcon style={{ margin: '0px 5px' }} /> Tiempo de Vida del Chat{' '}
              </Box>
              <Box>
                {chatLifetime > 0 ? chatLifetime + (chatLifetime == 1 ? " dia " : " dias") : "creado hoy"}
              </Box>
            </Grid>
            <Box height="15px" />
            <Grid container item direction="row" justify="space-between" alignItems="flex-start" width="100%">
              <Box className={classes.detailsBox}>
                <EventBusyIcon style={{ margin: '0px 5px' }} /> Fecha de finalización{' '}
              </Box>
              <Box>
                {chat.endDate ? chat.endDate : "Activo"}
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box height="15px" />
              <Grid item md={12}>
                <List>
                  {
                    chat.participants && chat.participants.map((participant, i) => {
                      var user = participant.user || {};
                      return (
                        <>
                          <ListItem key={i}>
                            <ListItemAvatar>
                              <Avatar alt="" src={user.avatar ? (config.api + user.avatar) : "ruta-por-defecto-del-front"} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${user.firstName} ${user.lastName}`}
                              secondary={`${participant.type}`}
                            />
                            <ListItemSecondaryAction>
                              {
                                participant.type == "Participante" ? <Button variant="contained" color="primary">Quitar</Button> : null
                              }
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Divider variant="inset" />
                        </>
                      );
                    })
                  }
                </List>
                <List>
                  <ListItem>
                    <IconButton onClick={{}}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                    <ListItemText primary="Agregar más personas" />
                  </ListItem>
                  <Divider variant="inset" />
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ModalBody>
    </Modal>
  );
};

export default ModalGroupChatDetail;
