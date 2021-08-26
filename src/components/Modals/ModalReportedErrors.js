import { Grid, Typography, Button } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ModalFooter from './common/ModalFooter';
import CustomInput from 'components/CustomInput';
import CreateIcon from '@material-ui/icons/Create';
import GetAppIcon from '@material-ui/icons/GetApp';

const ModalReportedErrors = props => {
  const { open, handleClose } = props;

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      size="sm"
    >
      <ModalHeader
        icon={<LibraryBooksIcon />}
        text="Reportar Error"
      />
      <ModalBody>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography style={{ fontWeight: "bold" }}>Motivo</Typography>
            <CustomInput
              id="Motivo"
              inputType="inputText"
              icon={<CreateIcon />}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ fontWeight: "bold" }}>Descripcion</Typography>
            <CustomInput
              id="Descripcion"
              inputType="textArea"
              icon={<CreateIcon />}
            />
          </Grid>
          <Grid item xs={12}>
            <p style={{ color: "rgba(0, 0, 0, 0.54)", marginBottom: "5px" }}> Imagen </p>
            <Button
              variant="contained"
              component="label"
              fullWidth
            >
              <GetAppIcon style={{ marginRight: "25px" }} />
              <input id="icon-Imagen-file" accept="image/*" type="file" />
            </Button>
            {
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                <GetAppIcon style={{ marginRight: "25px" }} />
                <input id="icon-Imagen-file2" accept="image/*" type="file" />
              </Button>
            }

          </Grid>
          <Grid item xs={12}>
            <p style={{ color: "rgba(0, 0, 0, 0.54)", marginBottom: "5px" }}> Archivo </p>
            <Button
              variant="contained"
              component="label"
              fullWidth
            >
              <GetAppIcon style={{ marginRight: "25px" }} />
              <input id="icon-Archivo-file" accept="image/*" type="file" />
            </Button>
            {<Button
              variant="contained"
              component="label"
              fullWidth
            >
              <GetAppIcon style={{ marginRight: "25px" }} />
              <input id="icon-Archivo-file2" accept="image/*" type="file" />
            </Button>}
          </Grid>
        </Grid>
      </ModalBody>
      <ModalFooter
        confirmText={"Enviar"}
        onConfirm={() => { }}
      />
    </Modal>
  )
}

export default ModalReportedErrors;
