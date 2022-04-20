import { Box, Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import ModalFooter from './common/ModalFooter';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import { ListRequestNewCompanies,RegisterNewCompanies} from 'services/actions/CompanyAction';
import {RegisterNewUser} from 'services/actions/UserAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';

const useStyles = makeStyles(theme => ({

}));



const ModalConfirmImport = (props) => {

    const classes = useStyles();
    const { open, handleClose, onConfirm ,type} = props;
console.log(type)
    const [dataEntity,SetDataEntity] = React.useState([])

    React.useEffect(()=>{
        props.dispatch(ListRequestNewCompanies()).then(
            (res) => {
                console.log(res)
                const Array = res.filter((value)=>value.username==null)
                console.log(Array)
            },
            (error) => {
              props.dispatch(showSnackBar("warning", error.response.data.error || ""));
              props.dispatch(showBackdrop(false));
            }
          );
    },[])

  
  const RegisterAllNewCompanies = () => {
      if (type=='companies') {
          props.dispatch(RegisterNewCompanies()).then(
              (res) => {

                  if (res.cantidad > 0) {
                      props.dispatch(showSnackBar("success", res.descripcion || ""));
                  }
                  else if (res.cantidad == 0) {
                      props.dispatch(showSnackBar("warning", res.descripcion || ""));
                  }
                  handleClose();
              },
              (error) => {
                  props.dispatch(showSnackBar("error", 'Error Al importar empresas nuevas' || ""));
                  props.dispatch(showBackdrop(false));
                  handleClose();
              }
          );
      }
      if(type=='user')
      {
        props.dispatch(RegisterNewUser()).then(
            (res) => {

                if (res.cantidad > 0) {
                    props.dispatch(showSnackBar("success", res.descripcion || ""));
                }
                else if (res.cantidad == 0) {
                    props.dispatch(showSnackBar("warning", res.descripcion || ""));
                }
                handleClose();
            },
            (error) => {
                props.dispatch(showSnackBar("error", 'Error Al importar empresas nuevas' || ""));
                props.dispatch(showBackdrop(false));
                handleClose();
            }
        );
      }
  }

    return (
        <Modal 
            open={open} 
            handleClose={handleClose}
            size="md"
        >
            <ModalHeader 
                icon={<ImportExportIcon />}
                text="Importación de Datos"
            />

            <ModalBody>
                <Grid container>
                    <Grid item xs={12}>
                    
                        <Typography style={{textAlign:"center"}}>¿Esta seguro de realizar el import?</Typography>
                    </Grid>
                </Grid>
            </ModalBody>

            <ModalFooter
                confirmText="Aceptar"
                onConfirm={()=>{RegisterAllNewCompanies()}}
                cancelText="Cancelar"
                onCancel={handleClose}
            />
        </Modal>
    )
}

export default ModalConfirmImport

