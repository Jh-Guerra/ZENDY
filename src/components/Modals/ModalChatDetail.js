import React from 'react';
import { Typography, Box, Button, Grid, Avatar } from '@material-ui/core';
import CustomModal from 'components/Modals/components/CustomModal';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import InfoIcon from '@material-ui/icons/Info';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles(theme => ({
  gridList: {
    // flexWrap: 'nowrap',
    justifyContent: 'space-around',
    padding: '5px'
  },
  large: {
    width: '250px',
    height: '250px',
  },
  divider: {
    backgroundColor: 'white',
    margin: '10px'
  }
}));

const ModalChatDetail = props => {
  const classes = useStyles();

  const { onClose } = props;

  const onCloseModal = () => {
    onClose();
  };

  const dataImg = [
    {
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(73).jpg',
      cols: 1,
      title: 'image',
    },
    {
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(72).jpg',
      cols: 2,
      title: 'image',
    },
    {
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(71).jpg',
      cols: 1,
      title: 'image',
    },
    {
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(74).jpg',
      cols: 2,
      title: 'image',
    },
    {
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(75).jpg',
      cols: 2,
      title: 'image',
    },

    {
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(78).jpg',
      cols: 1,
      title: 'image',
    },
    {
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(77).jpg',
      cols: 2,
      title: 'image',
    },
    {
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(79).jpg',
      cols: 1,
      title: 'image',
    },
  ];

  return (
    <CustomModal openDetail={props.open} onClose={onCloseModal}>
      <Grid container style={{height:"100%"}}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center" style={{height:"100%", paddingTop:"20px"}}>
            <Avatar
              alt="#"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
              className={classes.large}
            ></Avatar>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider  className={classes.divider} variant="middle" />
          <Typography style={{ fontSize: '30px', color: 'white' }} align="center">
            Homero Simpons
          </Typography>
          <Typography style={{ fontSize: '23px', color: 'white' }} align="center">
            Simpson's Company
          </Typography>
          <Typography style={{ fontSize: '20px', color: 'white' }}>en línea</Typography>
          <Divider  className={classes.divider} variant="middle" />
          <Button variant="contained" startIcon={<InfoIcon />} style={{ height: '50px', width: '300px' }}>
            Detalles de chat
          </Button>
        </Grid>
        <Grid item xs={12}>
          {/* <Divider  className={classes.divider} variant="middle" /> */}
          <Typography style={{ fontSize: '20px', color: 'white', paddingLeft: '5px'}} align="left">
              Galería de imagenes
          </Typography>
          <Divider  className={classes.divider} variant="middle" />
          <GridList className={classes.gridList} cols={2.5}>
            {dataImg.map(tile => (
              <GridListTile style={{ width: '48%', cursor: 'pointer' }}>
                <img src={tile.img} />
              </GridListTile>
            ))}
          </GridList>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default ModalChatDetail;
