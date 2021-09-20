import { Grid, Typography, Button, Divider, Avatar } from '@material-ui/core';
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
import { trimObject, modulesQuery } from 'utils/common';
import TitleIcon from '@material-ui/icons/Title';
import {createEntryQuery, updateEntryQuery, listQueries} from 'services/actions/EntryQueryAction';
import { showBackdrop , showSnackBar} from 'services/actions/CustomAction';
import defaultCompany from 'assets/images/defaultCompany.png';
import config from 'config/Config';

const ModalEntryQuery = props => {
  const { open, handleClose, onSaveForm, entryQuery } = props;

  const [data, setData] = React.useState({
    id: '',
    reason: '',
    description: '',
    image1: '',
    image2: '',
    file1: '',
    file2: '',
    module:'',
  });
  const [title, setTitle] = React.useState("Ingresar Consulta");
  //const [icon, setIcon] = React.useState(<BusinessIcon />);
  const [editMode, setEditMode] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState(null);
  const [fileUrl1, setFileUrl1] = React.useState(null);

  React.useEffect(() => {
    if(open){
        if(entryQuery && entryQuery.id){
        
            // Ver el detalle de una consulta
            setData(entryQuery);
            setTitle("Detalle de la Consulta");
            //setIcon(<AssignmentIndIcon />);
            setEditMode(false);
        }else{
            // Crear una nueva consulta
            setData({
                id: "",
                reason: '',
                description: '',
                image1: '',
                image2: '',
                file1: '',
                file2: '',
                module:'',
            });
            setTitle("Ingresar Consulta");
            //setIcon(<BusinessIcon />);
            setEditMode(true);
        }
        setFileUrl(null)
        setFileUrl1(null)
    }
}, [open]);

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
    props.dispatch(showBackdrop(true));
    if(entryQuery.id){
             // Editar
             const imageInput = document.querySelector('#image1') ;
              const imageInput1 = document.querySelector('#image2') ;
              const fileInput = document.querySelector('#file1') ;
              const fileInput1 = document.querySelector('#file2') ;
  
              const formData = new FormData();
              formData.append('image1', imageInput.files[0] || '');
              formData.append('image2', imageInput1.files[0] || '');
              formData.append('file1', fileInput.files[0] || '');
              formData.append('file2', fileInput1.files[0] || '');
              formData.append("reason", entryQuery.reason)
              formData.append('description', entryQuery.description)
              formData.append('module', entryQuery.module)
 
 
                 // Editar
                 props.dispatch(updateEntryQuery(data.id, formData)).then(res => {
                  props.dispatch(showSnackBar('success', 'Consulta editada correctamebte'));
                  props.dispatch(showBackdrop(false));
                  props.dispatch(listQueries(''))
                 onSaveForm && onSaveForm();
                     //window.location.replace('')
                 }).catch(error => {
                     props.dispatch(showBackdrop(false));
                 });   

    } else{
              const imageInput = document.querySelector('#image1') ;
              const imageInput1 = document.querySelector('#image2') ;
              const fileInput = document.querySelector('#file1') ;
              const fileInput1 = document.querySelector('#file2') ;
  
              const formData = new FormData();
              formData.append('image1', imageInput.files[0] || '');
              formData.append('image2', imageInput1.files[0] || '');
              formData.append('file1', fileInput.files[0] || '');
              formData.append('file2', fileInput1.files[0] || '');
              formData.append("reason", entryQuery.reason)
              formData.append('description', entryQuery.description)
              formData.append('module', entryQuery.module)
  
              props.dispatch(createEntryQuery(formData)).then(res => {
                props.dispatch(showSnackBar('success', 'Consulta registrada'));
                   props.dispatch(showBackdrop(false));
              
                  onSaveForm && onSaveForm();
                }).catch(error => {
                  props.dispatch(showBackdrop(false));
                  props.dispatch(showSnackBar("error", error.message || ""));
                  //console.error('error', error);
                });
    }
            
  };

  function processImage(event){
    if(event && event.target.files && event.target.files.length > 0){
      
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setFileUrl(imageUrl)
    }else{
        setFileUrl(null)
    }
 }


 function processImage1(event){
  if(event && event.target.files && event.target.files.length > 0){
      const imageFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrl1(imageUrl)
  }else{
      setFileUrl1(null)
  }
}

const onEdit = () => {
    setEditMode(true);
    setTitle("Editar Consulta");
    //setIcon(<EditIcon />);
}

  return (
    <Modal open={open} handleClose={handleClose} size="sm">
      <ModalHeader icon={<LibraryBooksIcon />} text={title} />
      <ModalBody>
        <Formik enableReinitialize initialValues={data} validate={values => validateForm(values)} onSubmit={onSubmit} encType="multipart/form-data">
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
            return (
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
                      disabled={!editMode}
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
                      disabled={!editMode}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomInput
                      id="module"
                      inputType="select"
                      label="Modulo"
                      onChange={(event) => {
                        setFieldValue("module", event.target.value)
                      }}
                      value={values.module}
                      options={modulesQuery}
                      error={errors.module && touched.module ? true : false}
                      helperText={errors.module && touched.module && errors.module}
                      disabled={!editMode}
                    />
                  </Grid>

                  {
                    editMode && (
                      <Grid item xs={12} container>
                        <Grid item xs={12}>
                          <p style={{ color: 'rgba(0, 0, 0, 0.54)', marginBottom: '5px' }}> Imágenes </p>
                        </Grid>
                        <Grid item xs={6} style={{ padding: "0px 5px" }}>
                          <Button variant="contained" component="label" style={{ maxWidth: "100%" }} disabled={!editMode}>
                            <GetAppIcon style={{ marginRight: '10px' }} />
                            <input id="image1" accept="image/*" type="file" onChange={processImage} />
                          </Button>
                        </Grid>
                      </Grid>
                    )
                  }
                  <Grid container item xs={12} justify="center">
                    <Avatar
                      style={{ height: 140, width: 140, display: fileUrl || (entryQuery && entryQuery.id && entryQuery.image1) ? "flex" : "none" }}
                      src={fileUrl ? fileUrl : (data.image1 ? (config.api + data.image1) : defaultCompany)}
                    />
                  </Grid>

                  {
                    editMode && (
                      <Grid item xs={12} container>
                        <Grid item xs={12}>
                          <p style={{ color: 'rgba(0, 0, 0, 0.54)', marginBottom: '5px' }}> Imágenes </p>
                        </Grid>
                        <Grid item xs={6} style={{ padding: "0px 5px" }}>
                          <Button variant="contained" component="label" style={{ maxWidth: "100%" }} disabled={!editMode}>
                            <GetAppIcon style={{ marginRight: '10px' }} />
                            <input id="image2" accept="image/*" type="file" onChange={processImage1} />
                          </Button>
                        </Grid>
                      </Grid>
                    )
                  }
                  <Grid container item xs={12} justify="center">
                    <Avatar
                      style={{ height: 140, width: 140, display: fileUrl1 || (entryQuery && entryQuery.id && entryQuery.image2) ? "flex" : "none" }}
                      src={fileUrl1 ? fileUrl1 : (data.image2 ? (config.api + data.image2) : defaultCompany)}
                    />
                  </Grid>

                  {
                    editMode && (
                      <Grid item xs={12} container>
                        <Grid item xs={12}>
                          <p style={{ color: 'rgba(0, 0, 0, 0.54)', marginBottom: '5px' }}> Archivos Adjuntos </p>
                        </Grid>
                        <Grid item xs={6} style={{ padding: "0px 5px" }}>
                          <Button variant="contained" component="label" style={{ maxWidth: "100%" }} disabled={!editMode}>
                            <GetAppIcon style={{ marginRight: '10px' }} />
                            <input id="file1" type="file" />
                          </Button>
                        </Grid>
                        <Grid item xs={6} style={{ padding: "0px 5px" }}>
                          <Button variant="contained" component="label" style={{ maxWidth: "100%" }} disabled={!editMode}>
                            <GetAppIcon style={{ marginRight: '10px' }} />
                            <input id="file2" type="file" />
                          </Button>
                        </Grid>
                      </Grid>
                    )
                  }

                </Grid>

                <Divider style={{ marginTop: "20px" }} />
                <ModalFooter
                  buttonType={"submit"}
                  cancelText={editMode && "Cancelar"}
                  onCancel={handleClose}

                  confirmText={editMode && "Guardar"}

                  cancelText={!editMode && "Cancelar"}

                  editText={!editMode && "Editar"}
                  onEdit={onEdit}
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
