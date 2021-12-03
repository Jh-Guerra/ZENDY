import React, { Component } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import CustomTable from 'components/CustomTable';
import { deleteCompany, findCompany, importErpCompanies, listCompanies } from 'services/actions/CompanyAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ModalCompany from 'components/Modals/ModalCompany';
import ModalDelete from 'components/Modals/ModalDelete';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import ModalConfirmImport from 'components/Modals/ModalConfirmImport';
import ImportExportIcon from '@material-ui/icons/ImportExport';

const columns = [
  { type: 'text', field: 'name', label: 'Nombre', minWidth: 250 },
  { type: 'text', field: 'address', label: 'Dirección', minWidth: 250 },
  { type: 'text', field: 'adminName', label: 'Administrador', minWidth: 250 },
  { type: 'text', field: 'email', label: 'Correo', minWidth: 250 },
  { type: 'text', field: 'isHelpDesk', label: 'Es mesa de ayuda', minWidth: 250, format: (row) => row.isHelpDesk == 1 ? "Si" : "No"},
];

class CompaniesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalCompany: false,
      showModalDelete: false,
      showModalConfirmation: false,
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

  openModalConfirmation = () => {
    this.setState({
      user: {},
      showModalConfirmation: true 
    })
  }

  onConfirmCompany = () => {
    this.setState({ showModalCompany: false });
    this.onListCompanies();
  };
  
  onConfirmImport = () => {
    this.setState({showModalConfirmation: false });
    this.props.dispatch(showBackdrop(true));
    this.props.dispatch(importErpCompanies()).then(res => {
      this.props.dispatch(showSnackBar("success", res || ""));
      this.onListCompanies();
    }).catch(err => {
      this.props.dispatch(showBackdrop(false));
      this.props.dispatch(showSnackBar("error", err.response.data.error));
    });
  }

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
        console.log('error', error);
      });
  };

  render() {
    const { showModalCompany, showModalDelete, showModalConfirmation, company, companies, loading } = this.state;

    return (
      <Grid container>
        <Grid item xs={12} className="top-header" style={{height:"64px"}}></Grid>
        
        <Grid item xs={12} style={{ padding: '0px 20px' }}>
          <br />
          <Typography variant="h4" component="h4" className="page-title">
            Empresas (Cliente)
          </Typography>
          <p style={{ textAlign: 'end' }}>
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
              onClick={this.openModalCompany}
              variant="contained"
              color="secondary"
              startIcon={<AddCircleIcon />}
            >
              Agregar
            </Button>
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
        <ModalConfirmImport
          {...this.props}
          open={showModalConfirmation}
          handleClose={() => { this.setState({showModalConfirmation: false }) }}
          onConfirm={this.onConfirmImport}
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
