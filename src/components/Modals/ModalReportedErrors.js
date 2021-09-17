import { Grid, Typography, Button, MenuItem, Divider } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ModalFooter from './common/ModalFooter';
import CustomInput from 'components/CustomInput';
import CreateIcon from '@material-ui/icons/Create';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Form, Formik } from 'formik';
import { trimObject } from 'utils/common';

const ModalReportedErrors = props => {
  const { open, handleClose } = props;

  const options = [
    { id: "m1", name: "modulo 1" },
    { id: "m2", name: "modulo 2" },
    { id: "m3", name: "modulo 3" },
  ];

  const [data, setData] = React.useState({
    id: "",
    idCompany: null,
    module: "m1",
    description: "",
    image1: "",
    image2: "",
    file1: "",
    file2: "",
  });
  const validateForm = reportedError => {
    const errors = {};
    reportedError = trimObject(reportedError);

    if (!reportedError.description) 
      errors.description = true;

    return errors;
  };

  const onSubmit = (reportedError, { setSubmitting }) => {
    console.log("reportedError", reportedError);
  };

  const changeModule = (value) => {
    setData({module:value})
  }


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
        <Formik enableReinitialize initialValues={data} validate={values => validateForm(values)} onSubmit={onSubmit}>
          {({ values,errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
            return (
              <Form onSubmit={handleSubmit} >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography style={{ fontWeight: "bold" }}>Módulo</Typography>
                      <CustomInput
                        id="module"
                        inputType="select"
                        value={values.module}
                        options={options}
                        onChange={(event) => {
                          setFieldValue("module",event.target.value);
                        }}
                        icon={<CreateIcon />}
                      />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography style={{ fontWeight: "bold" }}>Descripción *</Typography>
                    <CustomInput
                      id="description"
                      // label={<p>Descripción *</p>}
                      inputType="textArea"
                      onChange={handleChange}
                      value={values.description}
                      error={errors.description && touched.description ? true : false}
                      disabled={false}
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

                <Divider style={{marginTop:"20px"}} />
                <ModalFooter
                  // confirmText={"Enviar"}
                  // onConfirm={() => { }}
                  cancelText={"Cancelar"}
                  onCancel={handleClose}

                  buttonType="submit"
                  confirmText="Enviar 3"
                />
              </Form>
            )
          }}
        </Formik>
      </ModalBody>
      
    </Modal>
  )
}

export default ModalReportedErrors;
