import React from 'react';
import { Typography, Box, Button, Grid, Avatar } from '@material-ui/core';
import LateralModal from 'components/Modals/components/LateralModal';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import InfoIcon from '@material-ui/icons/Info';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CustomModal from "components/Modals/common/CustomModal";
import config from 'config/Config';
import { getImageProfile, getSessionInfo } from 'utils/common';
import { findImages } from 'services/actions/ChatAction';
import { showBackdrop } from 'services/actions/CustomAction';

const useStyles = makeStyles(theme => ({
  gridList: {
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
  const session = getSessionInfo();
  const user = session && session.user;
  const classes = useStyles();

  const { onClose, chat, onGetChatData, messages, chatFinalize } = props;
  const [images,setImages] = React.useState([]);
  const [openGroupChat, setOpenGroupChat] = React.useState(false);
  React.useEffect(()=> {
    if(chat && chat.id){
      props.dispatch(findImages(chat.id)).then(res => {
        setImages(res.images);
        props.dispatch(showBackdrop(false));
      }).catch(err => props.dispatch(showBackdrop(false)));
    }
  }, [chat && chat.id, messages]);

  const onCloseModal = () => {
    onClose();
  };

  const handleGroupChat = () => {
    setOpenGroupChat(true);
  }

  const type = chat.type;
  var image;
  var name;
  var defaultImageType;
  var companyNamechat = chat.company && chat.company.name;
  var isOnline;

  if(chat.participants && chat.participants.length > 2){
    image = chat.company && chat.company.avatar || "";
    defaultImageType = "Company";
    name = chat.name || '';
  }else{
    chat.participants && chat.participants.map(participant => {
      if(participant.user.id != user.id){
        image = participant.user.avatar || "";
        defaultImageType = participant.user.sex || "O";
        isOnline = (participant.user.isOnline) ? "active" : '';
      }
    })    
    name = chat.name || "";
  }

  const openImage = (imagePath) => {
    window.open(imagePath,"_blank")
  }
  
  return (
    <>
      <LateralModal openDetail={props.open} onClose={onCloseModal}>
        <Grid container style={{height:"100%"}}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center" style={{height:"100%", paddingTop:"20px"}}>
              <Avatar
                alt="#"
                src={image ? config.api+image : getImageProfile(defaultImageType)}
                className={classes.large}
              ></Avatar>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider  className={classes.divider} variant="middle" />
            <Typography style={{ fontSize: '30px', color: 'white' }} align="center">
              {name}
            </Typography>
            <Typography style={{ fontSize: '23px', color: 'white' }} align="center">
              {companyNamechat}
            </Typography>
            {
              chat && chat.scope == 'Personal' && (  
                  (isOnline == "active") ?
              (
                <div className="chat-header" style={{display:"flex", alignItems:"center", height:"25px", minWidth:"",marginLeft:"125px"}}>
                <Typography style={{fontSize:"20px", color:"white", marginLeft:"30px"}}>
                 <span className="online-icon"/>En linea</Typography> 
                 </div>
                 )
                 :      
                ( 
                  <div className="chat-header" style={{display:"flex", alignItems:"center", height:"25px", minWidth:"",marginLeft:"100px"}}>
                    <Typography style={{fontSize:"20px", color:"white", marginLeft:"30px"}}>
                   <span className="offline-icon"/>Fuera de línea</Typography> 
                    </div>
                   )
              )          
            }
            <Divider  className={classes.divider} variant="middle" />
            <Button variant="contained" startIcon={<InfoIcon />} style={{ height: '50px', width: '300px' }} onClick={handleGroupChat}>
              Detalles de chat
            </Button>
          </Grid>
          {
            images && images.length>0 && (
              <Grid item xs={12}>
                <Typography style={{ fontSize: '20px', color: 'white', paddingLeft: '5px'}} align="left">
                  Galería de imagenes
                </Typography>
                <Divider  className={classes.divider} variant="middle" />
                <GridList className={classes.gridList} cols={2.5}>
                  {images.map((img, i) => (
                    <GridListTile key={i} style={{ width: '48%', cursor: 'pointer' }}>
                      <img onClick={() => {openImage(config.api+img)}}  src={config.api+img} />
                    </GridListTile>
                  ))}
                </GridList>
              </Grid>
            )
          }
        </Grid>
      </LateralModal>
      <CustomModal 
        customModal="ModalGroupChatDetail"
        open={openGroupChat} 
        handleClose={() => { setOpenGroupChat(false); }}
        chat={chat}
        onGetChatData={onGetChatData}
        chatFinalize={chatFinalize}
      />
    </>
  );
};

export default ModalChatDetail;
