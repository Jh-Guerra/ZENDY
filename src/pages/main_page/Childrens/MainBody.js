import React, { createRef } from "react";
import "assets/styles/zendy-app.css";
import ChatItem from "../Components/ChatItem";
import CustomModal from "components/Modals/common/CustomModal";
import { useHistory, withRouter } from "react-router-dom";

const MainBody = props => {
 
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  }
  
  return (
  
      <CustomModal 
        customModal="ModalAcceptChat"
        open={open} 
        handleClose={handleClose}
      />
    
  );

}

export default withRouter(MainBody);