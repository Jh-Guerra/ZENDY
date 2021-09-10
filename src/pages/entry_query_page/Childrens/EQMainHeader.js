import React, { useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import { Grid, TextField, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import CustomModal from "components/Modals/common/CustomModal";
import { useHistory, withRouter } from "react-router-dom";
import config from "config/Config";
import { getImageProfile } from "utils/common";

const EQMainHeader = props => {

  const { entryQuery={} } = props;

  const history = useHistory();
  const [showChatDetail, setShowChatDetail] = useState(false);

  const openChatDetail = () => {
    setShowChatDetail(true);
  }

  var image = entryQuery.user && entryQuery.user.avatar || "";
  var defaultImageType =entryQuery.user && entryQuery.user.sex || "O";
  var name = entryQuery.user && (entryQuery.user.firstName + ' ' + entryQuery.user.lastName) || "";

  return (
    <Grid container className="chat-header">    
      <Grid container className="chat-header-content">
        <Grid item xs={6} onClick={openChatDetail} style={{cursor:"pointer"}}>       
          <Grid container style={{height:"100%", padding:"0px 10px"}}>           
            <Grid item xs={2} style={{display:"flex"}}>             
              <div className="chat-header-avatar">
                <div className="avatar-header">
                  <div className="avatar-img">
                    <img src={image ? config.api+image : getImageProfile(defaultImageType)} alt="#" />
                  </div>
                </div>
              </div>
            </Grid>                      
            <Grid item xs={8} className="chat-header-name">                                                        
              <div>
                <Typography style={{fontSize:"25px", color:"white"}}>{name}</Typography>
              </div>
            </Grid>               
          </Grid>
        </Grid>
        
        <Grid item xs={6}>
          <Grid container className="chat-header-buttons">
            <TextField className="search_wrap" 
              style={{paddingLeft: '20px'}}
              type="text"
              placeholder="Buscar..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),disableUnderline: true
              }}
            />
          </Grid>              
        </Grid>
      </Grid>
      <CustomModal 
        customModal="ModalChatDetail"
        open={showChatDetail} 
        onClose={()=> { setShowChatDetail(false) }}
        chatdata={{}}
      />
    </Grid>
  );

}

export default withRouter(EQMainHeader);
