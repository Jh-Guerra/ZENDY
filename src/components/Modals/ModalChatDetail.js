import React from 'react';
import { Typography, Box, Button} from '@material-ui/core';
import CustomModal from 'components/Modals/components/CustomModal';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import InfoIcon from '@material-ui/icons/Info';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({ 
  gridList: {
    flexWrap: 'nowrap',   
  },
}));

const ModalChatDetail = (props) => {
    
  const classes = useStyles();
    
    const {onClose} = props;

    const onCloseModal = () =>{
        onClose()
    }

    const dataImg = [
      {
        img:
          'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(73).jpg',
        cols: 1,
        title: 'image',
      },
      {
        img:
          'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(72).jpg',
        cols: 2,
        title: 'image',
      },
      {
        img:
          'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(71).jpg',
        cols: 1,
        title: 'image',
      },
      {
        img:
          'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(74).jpg',
        cols: 2,
        title: 'image',
      },
      {
        img:
          'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(75).jpg',
        cols: 2,
        title: 'image',
      },
  
      {
        img:
          'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(78).jpg',
        cols: 1,
        title: 'image',
      },
      {
        img:
          'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(77).jpg',
        cols: 2,
        title: 'image',
      },
      {
        img:
          'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(79).jpg',
        cols: 1,
        title: 'image',
      }
    ];

    return (      
        <CustomModal openDetail={props.open} onClose={onCloseModal}>
          <Box>                        
              <Typography style={{fontSize:"30px", color:"white"}} align="center">Homero Simpons</Typography>
              <Typography style={{fontSize:"23px", color:"white"}} align="center">Simpson's Company</Typography>       
              <Typography style={{fontSize:"20px", color:"white"}}>en línea</Typography> 
              <Box height="15px" />
              <Divider style={{backgroundColor:'white'}} variant="middle" />
              <Box height="30px" />
              <Button
                variant="contained"           
                startIcon={<InfoIcon />}
                style={{height:"50px", width:"300px"}}
              >
              Detalles de chat
              </Button>
              <Box height="20px" />
              <Typography style={{fontSize:"20px", color:"white", marginLeft:"20px"}} align="left">Galería de imagenes</Typography>          
              <Box height="20px" />
                <GridList className={classes.gridList} cols={2.5}>
                  {dataImg.map((tile) => (
                    <GridListTile style={{ marginInlineStart:"15px" }}>
                      <img src={tile.img}  />
                    </GridListTile>
                      ))}
                </GridList>                              
          </Box>
        </CustomModal>
    )
}
 
export default ModalChatDetail