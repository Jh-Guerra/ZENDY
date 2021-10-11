import React, { Component } from "react";
import ReportItem from "../Components/ReportItem";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  search: {
    position: 'relative',
    marginBottom: '30px'
  }
});


class ReportList extends Component {
    allReports = [
        {
          name: "Reporte de notificaciones enviadas",
        },
        {
          name: "Reporte total de chats",
        },
        {
          name: "Otros reportes",
        },
        {
          name: "Reporte de chat unitario",
        },
        {
          name: "Reportes del chat de errores atendidos",
        }
      ];
    
  constructor(props) {
    super(props);
    this.state = {
      allChats: this.allReports,
    };
  }
  render() {
    const { classes } = this.props;
    return (  
      <div>  
      <br />
          <div className="chatlist__heading">
            <span className="divider-line"></span>
              <p className="divider-content">
                  Sección Reportes
              </p>
            <span className="divider-line"></span>
          </div>  
        <br />

        <div className="chat-list-items">
          {this.state.allChats.map((item, index) => {
            return (
              <div key={index}>
                <ReportItem               
                  name={item.name}                 
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(ReportList);
