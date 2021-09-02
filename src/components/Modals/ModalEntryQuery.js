import { Grid, Typography, Button, Divider } from '@material-ui/core';
import React from 'react';
import ModalBody from './common/ModalBody';
import ModalHeader from './common/ModalHeader';
import Modal from './common/Modal';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ModalFooter from './common/ModalFooter';
import CustomInput from 'components/CustomInput';
import CreateIcon from '@material-ui/icons/Create';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Form, Formik } from 'formik';
import { trimObject } from 'utils/common';
import TitleIcon from '@material-ui/icons/Title';

const ModalEntryQuery = props => {
  const { open, handleClose } = props;

  const [data, setData] = React.useState({
    id: '',
    reason: '',
    description: '',
    image1: '',
    image2: '',
    file1: '',
    file2: '',
  });

  const validateForm = entryQuery => {
    const errors = {};
    entryQuery = trimObject(entryQuery);

    if (!entryQuery.reason) 
      errors.reason = true;

    if (!entryQuery.description) 
      errors.description = true;

    return errors;
  };

  const onSubmit = (entryQuery, { setSubmitting }) => {
    console.log('entryQuery', entryQuery);
  };

  return (
    <Modal open={open} handleClose={handleClose} size="sm">
      <ModalHeader icon={<LibraryBooksIcon />} text="Ingresar Consulta" />
      <ModalBody>
        <Formik enableReinitialize initialValues={data} validate={values => validateForm(values)} onSubmit={onSubmit}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <CustomInput
                      id="reason"
                      label={<p>Motivo *</p>}
                      inputType="inputText"
                      onChange={handleChange}
                      value={values.reason}
                      error={errors.reason && touched.reason ? true : false}
                      icon={<TitleIcon />}
                      disabled={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomInput
                      id="description"
                      label={<p>Descripción *</p>}
                      inputType="textArea"
                      onChange={handleChange}
                      value={values.description}
                      error={errors.description && touched.description ? true : false}
                      disabled={false}
                    />
                  </Grid>

                  <Grid item xs={12} container>
                    <Grid item xs={12}>
                      <p style={{ color: 'rgba(0, 0, 0, 0.54)', marginBottom: '5px' }}> Imágenes </p>
                    </Grid>
                    <Grid item xs={6} style={{padding: "0px 5px"}}>
                      <Button variant="contained" component="label" style={{maxWidth: "100%"}}>
                        <GetAppIcon style={{ marginRight: '10px' }} />
                        <input id="image1" accept="image/*" type="file" />
                      </Button>
                    </Grid>
                    <Grid item xs={6} style={{padding: "0px 5px"}}>
                      <Button variant="contained" component="label" style={{maxWidth: "100%"}}>
                        <GetAppIcon style={{ marginRight: '10px' }} />
                        <input id="imagen2" accept="image/*" type="file" />
                      </Button>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} container>
                    <Grid item xs={12}>
                      <p style={{ color: 'rgba(0, 0, 0, 0.54)', marginBottom: '5px' }}> Archivos Adjuntos </p>
                    </Grid>
                    <Grid item xs={6} style={{padding: "0px 5px"}}>
                      <Button variant="contained" component="label" style={{maxWidth: "100%"}}>
                        <GetAppIcon style={{ marginRight: '10px' }} />
                        <input id="file1" accept="image/*" type="file" />
                      </Button>
                    </Grid>
                    <Grid item xs={6} style={{padding: "0px 5px"}}>
                      <Button variant="contained" component="label" style={{maxWidth: "100%"}}>
                        <GetAppIcon style={{ marginRight: '10px' }} />
                        <input id="file2" accept="image/*" type="file" />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Divider style={{marginTop:"20px"}} />
                <ModalFooter
                  cancelText="Cancelar"
                  onCancel={handleClose}

                  buttonType="submit"
                  confirmText="Guardar"
                />
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default ModalEntryQuery;
