import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import CustomTable from 'components/CustomTable';
import { deleteCompany, findCompany, listCompanies } from 'services/actions/CompanyAction';
import CustomButton from 'components/CustomButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { successButtonColor } from 'assets/styles/zendy-css';
import ModalCompany from 'components/Modals/ModalCompany';
import ModalDelete from 'components/Modals/ModalDelete';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';

const columns = [
  { type: 'text', field: 'name', label: 'Nombre', minWidth: 250 },
  { type: 'text', field: 'address', label: 'Dirección', minWidth: 250 },
  { type: 'text', field: 'adminName', label: 'Administrador', minWidth: 250 },
  { type: 'text', field: 'email', label: 'Correo', minWidth: 250 },
  { type: 'text', field: 'phone', label: 'N° Celular', minWidth: 170 },
  {
    type: 'text',
    field: 'currentBytes',
    label: 'Mbs Máximos',
    minWidth: 170,
    format: row => `${row.currentBytes} / ${row.maxBytes} Mbs`,
  },
];

class CompaniesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalCompany: false,
      showModalDelete: false,
      company: {},
      companies: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.props.dispatch(showBackdrop(true));
    this.onListCompanies();
  }

  componentWillUnmount() {}

  openModalCompany = () => {
    this.setState({
      company: {},
      showModalCompany: true,
    });
  };

  onConfirmCompany = () => {
    this.setState({ showModalCompany: false });
    this.onListCompanies();
  };

  onListCompanies = () => {
    this.props.dispatch(showBackdrop(true));
    this.setState({ loading: true });
    this.props.dispatch(listCompanies()).then(res => {
      this.setState({ companies: res || [] });
      this.setState({ loading: false });
      this.props.dispatch(showBackdrop(false));
    }).catch(err => this.props.dispatch(showBackdrop(false)));
  };

  showDetails = row => {
    this.props.dispatch(showBackdrop(true));
    this.props.dispatch(findCompany(row && row.id)).then(res => {
      this.setState({
        company: res || {},
        showModalCompany: true,
      });
      this.props.dispatch(showBackdrop(false));
    }).catch(err => this.props.dispatch(showBackdrop(false)));;
  };

  onDelete = () => {
    const { company } = this.state;
    this.props.dispatch(showBackdrop(true));
    this.props
      .dispatch(deleteCompany(company && company.id))
      .then(res => {
        this.setState({
          company: {},
          showModalDelete: false,
          showModalCompany: false,
        });
        this.props.dispatch(showSnackBar('warning', (res && res.success) || ''));
        this.props.dispatch(showBackdrop(false));
        this.onListCompanies();
      }).catch(error => {
        this.props.dispatch(showBackdrop(false));
        console.error('error', error);
      });
  };

  render() {
    const { showModalCompany, showModalDelete, company, companies, loading } = this.state;

    return (
      <Grid container>
        <Grid item xs={12} className="top-header">
          <Typography variant="h4" component="h4" gutterBottom style={{ textAlign: 'center' }}>
            Empresas
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ padding: '0px 20px' }}>
          <p style={{ textAlign: 'end' }}>
            <CustomButton
              variant="contained"
              startIcon={<AddCircleIcon />}
              color={successButtonColor}
              onClick={this.openModalCompany}
            >
              Agregar Empresa
            </CustomButton>
          </p>
          <CustomTable columns={columns} rows={companies} onRowClick={this.showDetails} loading={loading} />
        </Grid>
        <ModalCompany
          {...this.props}
          open={showModalCompany}
          onConfirmCallBack={() => {
            this.onConfirmCompany();
          }}
          openModalDelete={() => {
            this.setState({ showModalDelete: true });
          }}
          handleClose={() => {
            this.setState({ showModalCompany: false });
          }}
          company={company}
        />
        <ModalDelete
          open={showModalDelete}
          title="Eliminar empresa"
          handleClose={() => {
            this.setState({ showModalDelete: false });
          }}
          onDelete={this.onDelete}
        />
      </Grid>
    );
  }
}

export default CompaniesPage;
