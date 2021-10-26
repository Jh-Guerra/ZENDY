import React, { Component } from 'react';
import { Button, Grid, Typography } from "@material-ui/core";
import CustomTable from 'components/CustomTable';
import { deleteUser, findUser, listUsers, listUsersSameCompany } from 'services/actions/UserAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ModalUser from 'components/Modals/ModalUser';
import moment from 'moment';
import { getCustomRoleName } from 'utils/common';
import ModalDelete from 'components/Modals/ModalDelete';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { getImageProfile, getSessionInfo } from "utils/common";

const columns = [
  { type: 'text', field: 'name', label: 'Nombre', format: (row) => `${row.firstName} ${row.lastName}` },
  { type: 'text', field: 'roleName', label: 'Rol', format: (row) => getCustomRoleName(row.roleName) },
  { type: 'text', field: 'email', label: 'Correo' },
  { type: 'text', field: 'phone', label: 'N° Celular' },
  { type: 'text', field: 'dob', label: 'Fecha de Nacimiento', align: 'center', format: (row) => moment(row.dob || "").format("DD/MM/YYYY") },
];

class CompanyUsersPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModalUser: false,
      showModalDelete: false,
      user: {},
      users: [],
      loading: false
    };
  }

  async componentDidMount(){
    this.props.dispatch(showBackdrop(true));
    this.onListUsers();
  }

  componentWillUnmount() {
    
  }

  openModalUser = () => {
    this.setState({
      user: {},
      showModalUser: true 
    })
  }

  onConfirmUser = () => {
    this.setState({showModalUser: false });
    this.onListUsers();
  }
  

  onListUsers = () => {
    const session = getSessionInfo();
    this.props.dispatch(showBackdrop(true));
    this.setState({loading: true});
      this.props.dispatch(listUsersSameCompany()).then(res => {
        this.setState({users: res || []});
        this.setState({loading: false});
        this.props.dispatch(showBackdrop(false));
      }).catch(err => this.props.dispatch(showBackdrop(false)));;
  }

  showDetails = (row) => {
    this.props.dispatch(findUser(row && row.id)).then(res => {
      this.setState({
        user: res || {},
        showModalUser: true
      });
    }).catch(err => this.props.dispatch(showBackdrop(false)));;
  }

  onDelete = () => {
    const { user } = this.state;
    this.props.dispatch(showBackdrop(true));
    this.props.dispatch(deleteUser(user && user.id)).then(res => {
      this.setState({
        user: {},
        showModalDelete: false,
        showModalUser: false,
      });
      this.props.dispatch(showSnackBar("warning", res && res.success || ""));
      this.props.dispatch(showBackdrop(false));
      this.onListUsers();
    }).catch(error => {
      this.props.dispatch(showBackdrop(false));
      console.log('error', error);
    });
  }
 
  render() {
    const { showModalUser, showModalDelete, user, users, loading } = this.state;

    return (
      <Grid container>
        <Grid item xs={12} className="top-header" style={{height:"64px"}}></Grid>
        <Grid item xs={12} style={{padding: "0px 20px"}}>
          <br />
          <Typography variant="h4" component="h4" className="page-title">
            Usuarios
          </Typography>
          <p style={{textAlign:'end'}}>
            <Button
              onClick={this.openModalUser}
              variant="contained"
              color="secondary"
              startIcon={<AddCircleIcon />}
            >
              Agregar Usuario
            </Button>
          </p>
          <CustomTable 
            columns={columns}
            rows={users}
            onRowClick={this.showDetails}
            loading={loading}
          />
        </Grid>
        <ModalUser
          {...this.props}
          open={showModalUser}
          onConfirmCallBack={() => { this.onConfirmUser() }}
          openModalDelete={ () => { this.setState({showModalDelete: true }) } }
          handleClose={() => { this.setState({showModalUser: false }) }}
          user={user}
        />
        <ModalDelete
          open={showModalDelete}
          title="Eliminar Usuario"
          handleClose={() => { this.setState({showModalDelete: false }) }}
          onDelete={this.onDelete}
        />
      </Grid>
    );
  }
}

export default CompanyUsersPage;
