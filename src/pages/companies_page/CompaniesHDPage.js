import React, { Component } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import CustomTable from 'components/CustomTable';
import { deleteCompany, findCompany, listCompanies, listCompaniesClient, listCompaniesHelpdesk } from 'services/actions/CompanyAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ModalCompany from 'components/Modals/ModalCompany';
import ModalDelete from 'components/Modals/ModalDelete';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import ModalConfirmImport from 'components/Modals/ModalConfirmImport';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ModalUser from 'components/Modals/ModalUser';

const columns = [
  { type: 'text', field: 'name', label: 'Nombre', minWidth: 250 },
  { type: 'text', field: 'address', label: 'Dirección', minWidth: 250 },
  { type: 'text', field: 'adminName', label: 'Administrador', minWidth: 250 },
  { type: 'text', field: 'email', label: 'Correo', minWidth: 250 },
];

class CompaniesHDPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalCompany: false,
      showModalDelete: false,
      showModalConfirmation: false,
      companyHD: {},
      companiesHD: [],
      loading: false,
      showModalUser: false,
    };
  }

  async componentDidMount() {
    this.props.dispatch(showBackdrop(true));
    this.onListCompaniesHD();
  }

  componentWillUnmount() {}

  openModalCompany = () => {
    this.setState({
      companyHD: {},
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
    this.onListCompaniesHD();
  };

  onOpenNext = (newCompany) => {
    this.setState({ 
      showModalCompany: false,
      showModalUser: true,
      companyHD: newCompany
    });
    this.onListCompaniesHD();
  }

  onListCompaniesHD = () => {
    this.props.dispatch(showBackdrop(true));
    this.setState({ loading: true });
    this.props.dispatch(listCompaniesHelpdesk()).then(res => {
      this.setState({ companiesHD: res || [] });
      this.setState({ loading: false });
      this.props.dispatch(showBackdrop(false));
    }).catch(err => this.props.dispatch(showBackdrop(false)));
  };

  showDetails = row => {
    this.props.dispatch(showBackdrop(true));
    this.props.dispatch(findCompany(row && row.id)).then(res => {
      this.setState({
        companyHD: res || {},
        showModalCompany: true,
      });
      this.props.dispatch(showBackdrop(false));
    }).catch(err => this.props.dispatch(showBackdrop(false)));;
  };

  onDelete = () => {
    const { companyHD } = this.state;
    this.props.dispatch(showBackdrop(true));
    this.props
      .dispatch(deleteCompany(companyHD && companyHD.id))
      .then(res => {
        this.setState({
          companyHD: {},
          showModalDelete: false,
          showModalCompany: false,
        });
        this.props.dispatch(showSnackBar('warning', (res && res.success) || ''));
        this.props.dispatch(showBackdrop(false));
        this.onListCompaniesHD();
      }).catch(error => {
        this.props.dispatch(showBackdrop(false));
        console.log('error', error);
      });
  };

  render() {
    const { showModalCompany, showModalDelete, showModalConfirmation, companyHD, companiesHD, loading, showModalUser } = this.state;

    return (
      <Grid container>
        <Grid item xs={12} className="top-header" style={{height:"64px"}}></Grid>
        
        <Grid item xs={12} style={{ padding: '0px 20px' }}>
          <br />
          <Typography variant="h4" component="h4" className="page-title">
            Empresas (Mesas de Ayuda)
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
          <CustomTable columns={columns} rows={companiesHD} onRowClick={this.showDetails} loading={loading} />
        </Grid>
        <ModalCompany
          {...this.props}
          open={showModalCompany}
          onConfirmCallBack={() => { this.onConfirmCompany(); }}
          openModalDelete={() => { this.setState({ showModalDelete: true }); }}
          handleClose={() => { this.setState({ showModalCompany: false }); }}
          openModalNext={(newCompany) => { this.onOpenNext(newCompany); }}
          company={companyHD}
          isHD
        />
        <ModalDelete
          open={showModalDelete}
          title="Eliminar empresa"
          handleClose={() => {
            this.setState({ showModalDelete: false });
          }}
          onDelete={this.onDelete}
        />
        <ModalUser
          {...this.props}
          open={showModalUser}
          onConfirmCallBack={() => { this.setState({showModalUser: false }) }}
          handleClose={() => { this.setState({showModalUser: false }) }}
          is1rstUser
          newCompanyId={companyHD && companyHD.id || ""}
        />
      </Grid>
    );
  }
}

export default CompaniesHDPage;