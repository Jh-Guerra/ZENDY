import { Avatar, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import ModalBody from './common/ModalBody';
import ModalHeader from './common/ModalHeader';
import Modal from './common/Modal';
import EventIcon from '@material-ui/icons/Event';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import TimerIcon from '@material-ui/icons/Timer';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(12),
    height: theme.spacing(14),
  },
  detailsBox: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ModalDateilUser = props => {
  const classes = useStyles();
  const { open, handleClose } = props;

  return (
    <Modal open={open} handleClose={handleClose} size="xs">
      <ModalHeader text="Detalle Usuario" icon={<AccountCircleIcon />} />

      <ModalBody>
        <Grid container spacing={2} direction="column" alignItems="center" justify="center">
          <Grid container item spacing={1} direction="column" alignItems="center" justify="center">
            <Grid item xs={4}>
              <Avatar
                alt="Imgane No Caragada"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
                className={classes.large}
              />
              <hr />
            </Grid>
            <Grid item xs={10} className="chat-header-name">
              <p>Homero Simpons</p>
            </Grid>
            <Grid item xs={10}>
              <i>Montgomery Burns' Company</i>
            </Grid>
          </Grid>
          <Grid container item direction="column" alignItems="center" justify="center" spacing={1}>
            <Grid container item direction="row" justify="space-between" alignItems="flex-start" width="100%">
              <Box className={classes.detailsBox}>
                <EventIcon style={{ margin: '0px 5px' }} /> Fecha de Inicio{' '}
              </Box>
              <Box>21/06/2021</Box>
            </Grid>
            <Grid container item direction="row" justify="space-between" alignItems="flex-start" width="100%">
              <Box className={classes.detailsBox}>
                <TimerIcon style={{ margin: '0px 5px' }} /> Tiempod de Vida del Chat{' '}
              </Box>
              <Box>24h 36min</Box>
            </Grid>
            <Grid container item direction="row" justify="space-between" alignItems="flex-start" width="100%">
              <Box className={classes.detailsBox}>
                <EventBusyIcon style={{ margin: '0px 5px' }} /> Fecha de finalización{' '}
              </Box>
              <Box>21/06/2021</Box>
            </Grid>
          </Grid>
        </Grid>
      </ModalBody>
    </Modal>
  );
};

export default ModalDateilUser;
