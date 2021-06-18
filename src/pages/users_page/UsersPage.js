import React, { Component } from 'react';
import { Grid, Typography } from "@material-ui/core";
import CustomTable from 'components/CustomTable';
import { listUsers } from 'services/actions/UserAction';
import CustomButton from 'components/CustomButtom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { successButtonColor } from 'assets/styles/zendy-css';
import ModalUser from 'components/Modals/ModalUser';
import moment from 'moment';
import { getUserTypeName } from 'utils/common';

const columns = [
  { type: 'text', field: 'name', label: 'Nombre', minWidth: 250, format: (row) => `${row.firstName} ${row.lastName}` },
  { type: 'text', field: 'company', label: 'Empresa', minWidth: 170 },
  { type: 'text', field: 'type', label: 'Tipo', minWidth: 200, format: (row) => getUserTypeName(row.type) },
  { type: 'text', field: 'email', label: 'Correo', minWidth: 200 },
  { type: 'text', field: 'phone', label: 'N° Celular', minWidth: 150 },
  { type: 'text', field: 'dob', label: 'Fecha de Nacimiento', minWidth: 170, align: 'center', format: (row) => moment(row.dob || "").format("DD/MM/YYYY") },
];

class UsersPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModalUser: false,
      users: [],
      loading: false
    };
  }

  async componentDidMount(){
    this.props.showBackdrop(true);
    this.listUsers();
  }

  componentWillUnmount() {
    
  }

  listUsers = () => {
    this.props.showBackdrop(true);
    this.setState({loading: true});
    this.props.dispatch(listUsers()).then(res => {
      this.setState({users: res || []});
      this.setState({loading: false});
      this.props.showBackdrop(false);
    });
  }

  showDetails = () => {
    console.log("show details")
  }

  openModalUser = () => {
    this.setState({showModalUser: true })
  }

  onCreateUser = () => {
    this.setState({showModalUser: false });
    this.listUsers();
  }

  render() {
    const { showModalUser, users, loading } = this.state;

    return (
      <Grid container spacing={3} style={{height:'100%', justifyContent:'center'}}>
        <Grid item xs={11} style={{height:'10%', minHeight: '110px'}}>
          <Typography variant="h4" component="h4" gutterBottom>
            Usuarios
          </Typography>
        </Grid> 
        <Grid item xs={11} style={{height:'90%'}}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <p style={{textAlign:'end'}}>
                <CustomButton
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  customColor={successButtonColor}
                  onClick={this.openModalUser}
                >
                  Agregar Usuario
                </CustomButton>
              </p>
            </Grid>
            <Grid item xs={12}>
              <CustomTable 
                columns={columns}
                rows={users}
                onRowClick={this.showDetails}
                loading={loading}
              />
            </Grid>
          </Grid>
        </Grid>
        <ModalUser
          {...this.props}
          open={showModalUser}
          onConfirmCallBack={() => { this.onCreateUser() }}
          handleClose={() => { this.setState({showModalUser: false }) }}
        />
      </Grid>
    );
  }
}

export default UsersPage;
