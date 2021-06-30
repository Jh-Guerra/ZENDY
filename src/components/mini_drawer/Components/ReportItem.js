import React, { Component, createRef } from "react";

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { Input, InputAdornment } from "@material-ui/core";

 class ReportItem extends Component {
  messagesEndRef = createRef(null);


  constructor(props) {
    super(props);
    this.state = {
      chat: this.chatItms,
      msg: "",
    };
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    
  }
  

  render() {
    return (
        <div className="mini-drawer-content" style={{minHeight:"80px", height:"80px", padding:"0px 0px 0px 0px"}}>
            <div className="mini-drawer-user" >
              <div style={{width:"80%", height:"80%"}}>
                  <div className=".align-items-center" style={{alignItems:"center", justifyContent:"center", marginTop:"30px"}}>
                  <InputAdornment position="start">
                  <InsertDriveFileIcon style={{ fontSize: 40 }}/>
                    <span style={{fontSize:"18px", paddingLeft:"10px"}}>{this.props.name}</span>
                </InputAdornment>
                  </div>                
              </div>
            </div>
          </div>
    );
  }
}
export default ReportItem