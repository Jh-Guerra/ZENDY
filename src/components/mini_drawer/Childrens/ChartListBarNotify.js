import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Input, InputAdornment } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import ItemAvatarNotifyRow from "../Components/ItemAvatarNotifyRow";

const styles = theme => ({
  search: {
    position: 'relative',
    marginBottom: '30px'
  }
});
class ChatListBarNotify extends Component {
  allChatUsers = [
    {
        Area:"T.I",
        Title: "Reunion Sobre El dia Del Trabajador",
        message: "hola",
        hour: "10:20 pm",
        active: true,
        isOnline: true,
    },
    {
        Area:"T.I",
        Title: "Actualizacion del Sistema ERP",
        message: "hola",
        hour: "10:20 pm",
        active: false,
        isOnline: false,
    },
    {
        Area:"R.R.H.H",
        Title: "Mantenimiento del Sistema ERP",
        message: "hola",
        hour: "10:20 pm",
        active: true,
        isOnline: true,
    },
    {
        Area:"R.R.H.H",
        Title: "Solucion modulo  Reportes  del Sistema ",
        message: "hola",
        hour: "10:20 pm",
        active: false,
        isOnline: false,
    },{
        Area:"C.O",
        Title: "Problemas en Una Seccion 302",
        message: "hola",
        hour: "10:20 pm",
        active: true,
        isOnline: true,
    },
    {
        Area:".T.I",
        Title: "Soporte  y Moficacaion para la Interaccion",
        message: "hola",
        hour: "10:20 pm",
        active: false,
        isOnline: false,
    }
];

constructor(props) {
    super(props);
    this.state = {
        allChats: this.allChatUsers,
    };
}
render() {
    const { classes } = this.props;
    return (  
    <div className="mini-drawer-chatlist">  
    <br />
        <div className="chatlist__heading">
            <span className="divider-line"></span>
                <p className="divider-content">
                    {this.props.txt}
                </p>
            <span className="divider-line"></span>
        </div>  
        <br />  
        <div className={`${classes.search}`}>
          {/* <div> */}
            <SearchIcon />
            <Input className="search_wrap" 
                style={{paddingLeft: '10px', width: '90%', position: 'absolute',top: '0', left: '0', right: '0', margin: 'auto'}}
                type="text"
                placeholder="Buscar..."
                startAdornment= {
                <InputAdornment position="start">
            <SearchIcon />
                </InputAdornment>}
                disableUnderline={true}
            />  
        </div>
        <div className="chat-list-items">
        {this.state.allChats.map((item, index) => {
            return (
                <div key={index}>
                    <ItemAvatarNotifyRow
                        Area={item.Area}
                        Title={item.Title}
                        message={item.message}
                        hour= {item.hour}
                        active={item.active ? "active" : ""}
                        isOnline={item.isOnline ? "active" : ""}
                />
                </div>
            );
        })}
        </div>
    </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ChatListBarNotify);
