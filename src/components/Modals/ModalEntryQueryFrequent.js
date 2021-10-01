import { Grid, Typography, Button, Divider, Avatar } from '@material-ui/core';
import React from 'react';
import ModalBody from './common/ModalBody';
import ModalHeader from './common/ModalHeader';
import Modal from './common/Modal';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ModalFooter from './common/ModalFooter';
import CustomInput from 'components/CustomInput';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Form, Formik } from 'formik';
import { trimObject, modulesQuery } from 'utils/common';
import TitleIcon from '@material-ui/icons/Title';
import {createEntryQuery} from 'services/actions/EntryQueryAction';
import { showBackdrop , showSnackBar} from 'services/actions/CustomAction';
import defaultCompany from 'assets/images/defaultCompany.png';
import config from 'config/Config';
import { listFrequentQueries, findFrequentQuery } from 'services/actions/FrequentQueryAction';
import { useHistory } from 'react-router-dom';
import { listModules, findModule } from 'services/actions/ModuleAction';

const ModalEntryQueryFrequent = props => {
  const { open, handleClose, onSaveForm, entryQuery } = props;
  const history = useHistory();

  function changeOptions(value) {

     props.dispatch(findFrequentQuery(value)).then( res => {
       const dataForm = {
         ...data,
         reason: res && res.reason,
         description: res && res.description,
         idModule: res && res.idModule,
         idFrequentQuery: res && res.id
       }
       setData(dataForm) 
     })
  }

  const [data, setData] = React.useState({
    id: '',
    reason: '',
    description: '',
    image1: '',
    file1: '',
    idModule:'',
    idFrequentQuery: 1,
    isFrequentQuery: true,
  });

  const [frequentQueries, setFrequentQueries] = React.useState([]);
  const [title, setTitle] = React.useState("Ingresar Consulta Frecuente");
  const [editMode, setEditMode] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState(null);
  const [modules, setModules] = React.useState([]);

  React.useEffect(() => {
    if(open){
        if(entryQuery && entryQuery.id){
        
            // Ver el detalle de una consulta
            setData(entryQuery);
            setTitle("Detalle de la Consulta Frecuente");
            //setIcon(<AssignmentIndIcon />);
            setEditMode(false);
        }else{

            props.dispatch(findFrequentQuery(1)).then( res => {

              const dataForm = {
                ...data,
                reason: res && res.reason,
                description: res && res.description,
                idModule: res && res.idModule,
                idFrequentQuery: res && res.id
              }
              setData(dataForm) 
            })
            setTitle("Ingresar Consulta Frecuente");
            setEditMode(true);
        }
        props.dispatch(showBackdrop(true));
        props.dispatch(listFrequentQueries()).then(response =>{
            setFrequentQueries(response)
            props.dispatch(showBackdrop(false))
        }).catch(err => props.dispatch(showBackdrop(false)));
        props.dispatch(listModules()).then(response =>{
          setModules(response)
            props.dispatch(showBackdrop(false))
        }).catch(err => props.dispatch(showBackdrop(false)));
        setFileUrl(null)
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
  
              const imageInput = document.querySelector('#image1') ;
              const fileInput = document.querySelector('#file1') ;
  
              const formData = new FormData();
              formData.append('image1', imageInput.files[0] || '');
              formData.append('file1', fileInput.files[0] || '');
              formData.append("reason", entryQuery.reason)
              formData.append('description', entryQuery.description)
              formData.append('idModule', entryQuery.idModule)
              formData.append('idFrequentQuery', entryQuery.idFrequentQuery)
              formData.append('isFrequentQuery', true)
  
              props.dispatch(createEntryQuery(formData)).then(res => {
                props.dispatch(showSnackBar('success', 'Consulta registrada'));
                   props.dispatch(showBackdrop(false));
                  onSaveForm && onSaveForm();
                  history.push("/consultas/" + res.entryQuery.id);
                }).catch(error => {
                  props.dispatch(showBackdrop(false));
                  props.dispatch(showSnackBar("error", error.message || ""));
                });          
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


const onEdit = () => {
    setEditMode(true);
    setTitle("Editar Consulta Frecuente");
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
                      id="idfrequentQuery"
                      inputType="select2"
                      label="Consulta Frecuente"
                      onChange={(event) => {
                        setFieldValue("idfrequentQuery", event.target.value)
                        changeOptions(event.target.value)
                      }}
                      value={values.idFrequentQuery}
                      error={errors.idFrequentQuery && touched.idFrequentQuery ? true : false}
                      helperText={errors.idFrequentQuery && touched.idFrequentQuery && errors.idFrequentQuery}
                      options={frequentQueries}
                    />
                   </Grid>
                  <Grid item xs={12}>
                    <CustomInput
                      id="reason"
                      label={<p>Motivo *</p>}
                      inputType="inputText"
                      onChange={handleChange}
                      value={values.reason}
                      error={errors.reason && touched.reason ? true : false}
                      icon={<TitleIcon />}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomInput
                      id="description"
                      label={"Descripción*"}
                      inputType="textArea"
                      onChange={handleChange}
                      value={values.description}
                      error={errors.description && touched.description ? true : false}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <CustomInput
                      id="idModule"
                      inputType="select2"
                      label="Modulo"
                      onChange={(event) => {
                        setFieldValue("idModule", event.target.value)
                      }}
                      value={values.idModule}
                      error={errors.idModule && touched.idModule ? true : false}
                      helperText={errors.idModule && touched.idModule && errors.idModule}
                      options={modules}
                      disabled
                    />
                  </Grid>
                  {
                    editMode && (
                      <Grid item xs={12} container>
                        <Grid item xs={12}>
                          <p style={{ color: 'rgba(0, 0, 0, 0.54)', marginBottom: '5px' }}> Archivo </p>
                        </Grid>
                        <Grid item xs={12} style={{ padding: "0px 5px" }}>
                          <Button variant="contained" component="label" style={{ maxWidth: "100%", width: "100%"}} disabled>
                            <GetAppIcon style={{ marginRight: '10px' }} />
                            <input id="file1" type="file" />
                          </Button>
                        </Grid>
                      </Grid>
                    )
                  }

                  {
                    editMode && (
                      <Grid item xs={12} container>
                        <Grid item xs={12}>
                          <p style={{ color: 'rgba(0, 0, 0, 0.54)', marginBottom: '5px' }}> Imágen </p>
                        </Grid>
                        <Grid item xs={12} style={{ padding: "0px 5px" }}>
                          <Button variant="contained" component="label" style={{ maxWidth: "100%", width: "100%" }} disabled>
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

export default ModalEntryQueryFrequent;
