import React, { useState } from "react";
import ChatAvatar from "pages/main_page/Components/ChatAvatar";
import { Grid, TextField, Tooltip, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useHistory, withRouter } from "react-router-dom";
import config from "config/Config";
import { getImageProfile, getSessionInfo } from "utils/common";
import CustomModal from "components/Modals/common/CustomModal";

const CHMainHeader = props => {
  const session = getSessionInfo();
  const user = session && session.user;
  const { chat={},onGetChatData, messages } = props;

  const history = useHistory();
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [term, setTerm] = React.useState('');
  const [showChatDetail, setShowChatDetail] = useState(false);
  const chatFinalize =true ;

  var image;
  var name = chat.name || '';
  var defaultImageType;
  var isOnline;
  var company = chat && chat.companyUser && chat.companyUser.name || '';
  var ruc = chat && chat.companyUser && chat.companyUser.ruc || '';
  var status = chat && chat.status || '';
console.log('companu', company)

  if(chat.scope == "Grupal"){
    image = chat.company && chat.company.avatar || "";
    defaultImageType = "Company";
  }else{
    chat.participants && chat.participants.map(participant => {
      if(participant.user.id != user.id){
        image = participant.user.avatar || "";
        defaultImageType = participant.user.sex || "O";
        isOnline = (participant.user.isOnline) ? 'active' : '';
      }
    })    
  }

  var isAdmin;
  chat.participants && chat.participants.filter(participant => {
    if(participant.idUser == user.id){
      isAdmin = (participant.type == "Admin")
    }
  })



  const onSearch = (term) => {
    setTerm(term);
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        props.onListMessages && props.onListMessages(chat.id, term);
      }, 1000)
    )
  }

  const handleChatDetail = () => {
    setShowChatDetail(true);
  }

  return (
    <Grid container className="chat-header">    
      <Grid container className="chat-header-content">
        <Grid item xs={8} onClick={handleChatDetail} style={{cursor:"pointer"}}>       
          <Grid container style={{height:"100%", padding:"0px 10px"}}>           
            <Grid item xs={2} style={{display:"flex"}}>             
              <div className="chat-header-avatar">
                <ChatAvatar
                  image={image ? config.api+image : getImageProfile(defaultImageType)}
                  imgClassName="avatar-header"
                />
              </div>
            </Grid>                      
            <Grid item xs={10} className="chat-header-name">                                                        
              <div>
                <Typography noWrap variant="h5">{name}</Typography>
              </div>
              {
                chat && chat.companyUser && (   
                  <div>
                    <Typography style={{fontSize:"14px", color:"white"}}>{company} - {ruc}</Typography>
                    {/* <Typography>Estado: {status}</Typography> */}
                  </div>
                )
              }
            
            </Grid>               
          </Grid>
        </Grid>
        
        <Grid item xs={4}>
          <Grid container className="chat-header-buttons">
            <TextField className="search_wrap" 
              style={{padding: '0px 0px 0px 8px',}}
              type="text"
              placeholder="Buscar..."
              onChange={(event) => onSearch(event.target.value)}
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
      chat={chat}
      onGetChatData={onGetChatData}
      messages={messages}
      chatFinalize={chatFinalize}
    />
    </Grid>
  );

}

export default withRouter(CHMainHeader);
