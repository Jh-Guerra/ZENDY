import React, { Component } from 'react';
import { Button, Grid, Typography } from "@material-ui/core";
import CustomTable from 'components/CustomTable';
import { deleteUser, findUser, importErpUsers, listUsers } from 'services/actions/UserAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ModalUser from 'components/Modals/ModalUser';
import moment from 'moment';
import { getCustomRoleName } from 'utils/common';
import ModalDelete from 'components/Modals/ModalDelete';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ModalConfirmImport from 'components/Modals/ModalConfirmImport';

const columns = [
  { type: 'text', field: 'name', label: 'Nombre', format: (row) => `${row.firstName} ${row.lastName}` },
  { type: 'text', field: 'username', label: 'Nombre de Usuario', format: (row) => `${row.username || ""}` },
  { type: 'text', field: 'roleName', label: 'Rol', format: (row) => getCustomRoleName(row.roleName)},
  { type: 'text', field: 'email', label: 'Correo' },
  { type: 'text', field: 'phone', label: 'N° Celular' },
  { type: 'text', field: 'dob', label: 'Fecha de Nacimiento', align: 'center', format: (row) => moment(row.dob || "").format("DD/MM/YYYY") },
];

class UsersPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModalUser: false,
      showModalDelete: false,
      showModalConfirmation: false,
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

  openModalConfirmation = () => {
    this.setState({
      user: {},
      showModalConfirmation: true 
    })
  }

  onConfirmUser = () => {
    this.setState({showModalUser: false });
    this.onListUsers();
  }

  onConfirmImport = () => {
    this.setState({showModalConfirmation: false });
    this.props.dispatch(showBackdrop(true));
    this.props.dispatch(importErpUsers()).then(res => {
      this.props.dispatch(showSnackBar("success", res || ""));
      this.onListUsers();
    }).catch(err => {
      this.props.dispatch(showBackdrop(false));
      this.props.dispatch(showSnackBar("error", err.response.data.error));
    });
  }

  onListUsers = () => {
    this.props.dispatch(showBackdrop(true));
    this.setState({loading: true});
    this.props.dispatch(listUsers()).then(res => {
      this.setState({users: res || []});
      this.setState({loading: false});
      this.props.dispatch(showBackdrop(false));
    }).catch(err => this.props.dispatch(showBackdrop(false)));
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
      console.error('log', error);
    });
  }
 
  render() {
    const { showModalUser, showModalDelete, showModalConfirmation, user, users, loading } = this.state;

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
              onClick={this.openModalConfirmation}
              variant="contained"
              color="secondary"
              startIcon={<ImportExportIcon />}
              style={{margin:"0px 15px"}}
            >
              Importar Usuarios
            </Button>
            <Button
              onClick={this.openModalConfirmation}
              variant="contained"
              color="secondary"
              startIcon={<ImportExportIcon />}
              style={{margin:"0px 15px"}}
            >
              Importar ERP
            </Button>
            <Button
              onClick={this.openModalUser}
              variant="contained"
              color="secondary"
              startIcon={<AddCircleIcon />}
            >
              Agregar
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
        <ModalConfirmImport
          {...this.props}
          open={showModalConfirmation}
          handleClose={() => { this.setState({showModalConfirmation: false }) }}
          onConfirm={this.onConfirmImport}
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

export default UsersPage;
