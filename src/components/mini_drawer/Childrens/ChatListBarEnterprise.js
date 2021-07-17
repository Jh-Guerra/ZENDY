import React, { Component } from "react";
import ItemAvatarRow from "../Components/ItemAvatarRow";
import { withStyles } from "@material-ui/core/styles";
import { Input, InputAdornment } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { listCompanies } from "services/actions/CompanyAction";
import { findUserByIdCompany, listUsersByCompany } from "services/actions/UserAction";
class ChatListBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      companies: []
    };
  }

  componentDidMount() {
    this.onListCompanies();
  }

  componentWillUnmount() {
  }

  onListCompanies = () => {
    this.props.dispatch(listCompanies()).then(companyItem => {
      companyItem && companyItem.map((index) => {
        this.props.dispatch(findUserByIdCompany(index.id)).then(userItem => {
          let params = {
            ...index,
            usuarios: userItem.length
          };
          companyItem.push(params)
          this.setState({
            companies: companyItem
          });
        });
      })
    });
  }

  render() {
    return (
      <div className="mini-drawer-chatlist">
        <br />
        <div className="chatlist__heading">
          <span className="divider-line"></span>
          <p className="divider-content">
            Empresas
          </p>
          <span className="divider-line"></span>
        </div>
        <br />
        <div style={{ position: 'relative', marginBottom: '30px' }} >
          {/* <div> */}
          <SearchIcon />
          <Input className="chatList__search search_wrap"
            style={{ paddingLeft: '10px', width: '90%', position: 'absolute', top: '0', left: '0', right: '0', margin: 'auto' }}
            type="text"
            placeholder="Buscar..."
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            disableUnderline={true}
          />
        </div>
        <div className="chat-list-items">
          {this.state.companies && this.state.companies.map((item, index) => {
            if (item.usuarios) {
              return (
                <div key={index} onClick={() => { this.props.goToView(`empresas/${item.id}`) }}>
                  <ItemAvatarRow
                    image={item.logo != "" ? item.logo :"https://images.assetsdelivery.com/compings_v2/triken/triken1608/triken160800029.jpg"}
                    name={item.name}
                    message={item.usuarios + " Trabajadores"}
                    isChatCompany={true}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default ChatListBar;

