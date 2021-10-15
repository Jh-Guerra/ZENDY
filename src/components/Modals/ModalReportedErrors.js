import { Grid, Typography, Button, MenuItem, Divider, TextField, InputAdornment, makeStyles, Avatar, IconButton } from '@material-ui/core';
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
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { getSessionInfo, isClientUser, trimObject } from 'utils/common';
import { createError, deleteImage, listErrors, listErrorsByUser, updateError } from 'services/actions/ErrorAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import defaultAvatar from 'assets/images/defaultAvatarMale.jpg';
import config from "../../config/Config";
import EditIcon from '@material-ui/icons/Edit';
import { listModules, findModule } from 'services/actions/ModuleAction';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOff';
import { useHistory } from 'react-router';

const ModalReportedErrors = props => {
  const session = getSessionInfo();
  const user = session && session.user;
  const isClient = isClientUser(session.role);
  const { open, handleClose, error, onGetErrorData} = props;

  const [data, setData] = React.useState({
    id: "",
    idCompany: null,
    idModule: "",
    reason: "",
    description: "",
    image: "",
    file: "",
  });
  const history = useHistory();
  const [title, setTitle] = React.useState("Reportar Error");
  const [icon, setIcon] = React.useState(<LibraryBooksIcon />);
  const [editMode, setEditMode] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState(null);
  const [modules, setModules] = React.useState([]);

  React.useEffect(() => {
    if (open) {
      props.dispatch(showBackdrop(true));
      props.dispatch(listModules()).then(res =>{
        setModules(res || [])
        if (error && error.id) {
          setData(error);
          setTitle("Detalle del Error");
          setIcon(<LibraryBooksIcon />);
          setEditMode(false);
        } else {
          setData({
            id: "",
            idCompany: null,
            idModule: res && res[0].id || "",
            reason: "",
            description: "",
            image: "",
            file: "",
          });
          setTitle("Reportar Error");
          setIcon(<LibraryBooksIcon />);
          setEditMode(true);
        }
        props.dispatch(showBackdrop(false))
      }).catch(err => props.dispatch(showBackdrop(false)));
    }
    setFileUrl(null)
  }, [open]);

  const validateForm = reportedError => {
    const errors = {};
    reportedError = trimObject(reportedError);

    if (!reportedError.idModule) 
        errors.idModule = 'Seleccione un Modulo';

    if (!reportedError.reason) 
        errors.reason = 'Asunto es requerido';

    if (!reportedError.description)
        errors.description = 'Descripción es requerido'

    return errors;
};

  const onSubmit = (reportedError, { setSubmitting }) => {
    props.dispatch(showBackdrop(true));
    if (reportedError.id) {
      const imageInput = document.querySelector('#image');
      const fileInput = document.querySelector('#file');
      const formData = new FormData();
      formData.append('image', imageInput.files[0] || '');
      formData.append('file', fileInput.files[0] || '');
      formData.append('idCompany', user.idCompany)
      formData.append('createdBy', user.id)
      formData.append('idModule', reportedError.idModule)
      formData.append('reason', reportedError.reason)
      formData.append('description', reportedError.description)
      formData.append('oldImage', error.image)
      props.dispatch(updateError(reportedError.id, formData)).then(res => {
        props.dispatch(showSnackBar('success', 'Error actualizado correctamente'));
        if (isClient) {
          props.dispatch(listErrorsByUser(""));
        } else {
          props.dispatch(listErrors(""));
        }
        handleClose(false)
        props.dispatch(showBackdrop(false));
        onGetErrorData(res.id)
      }).catch(error => {
        props.dispatch(showBackdrop(false));
      });
    } else {
      const imageInput = document.querySelector('#image');
      const fileInput = document.querySelector('#file');
      const formData = new FormData();
      formData.append('image', imageInput.files[0] || '');
      formData.append('file', fileInput.files[0] || '');
      formData.append('idCompany', user.idCompany)
      formData.append('createdBy', user.id)
      formData.append('idModule', reportedError.idModule)
      formData.append('reason', reportedError.reason)
      formData.append('description', reportedError.description)
      props.dispatch(createError(formData)).then(res => {
        props.dispatch(showSnackBar('success', 'Error Registrado correctamente'));
        if (isClient) {
          props.dispatch(listErrorsByUser(""));
        } else {
          props.dispatch(listErrors(""));
        }
        if(res.errorZendy){
          history.push("/error-info/" + res.errorZendy.id);
        }        
        handleClose(false)
        props.dispatch(showBackdrop(false));
      }).catch(error => {
        props.dispatch(showBackdrop(false));
      });
    }
  };

  const changeModule = (value) => {
    setData({ module: value })
  }

  function processImage(event) {
    if (event && event.target.files && event.target.files.length > 0) {
      const imageFile = event.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrl(imageUrl)
    } else {
      setFileUrl(null)
    }
  }

  const onEdit = () => {
    setEditMode(true);
    setTitle("Editar Error");
    setIcon(<EditIcon />);
  }

  const deleteImage = (Link, id, values) => {
    if(id && values.image){
      props.dispatch(deleteImage(Link,id)).then(res => {
        if(res.error){
          onGetErrorData(res.error.id)
          setFileUrl(null);
          setData({...values, image: ""});
          document.getElementById('image').value = "";
          props.dispatch(showSnackBar('warning', 'Imagen eliminada'));
          props.setError && props.setError(res.error);
        }
      });
    }else{
      setFileUrl(null);
      setData({...values, image:null});
      document.getElementById('image').value = "";
    }
  }


  return (
    <Modal
      open={open}
      handleClose={handleClose}
      size="sm"
    >
      <ModalHeader
        icon={icon}
        text={title}
      />
      <ModalBody>
        <Formik enableReinitialize initialValues={data} validate={values => validateForm(values)} onSubmit={onSubmit}  encType="multipart/form-data">
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
            return (
              <Form onSubmit={handleSubmit} >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography style={{ fontWeight: "bold" }}>Módulo</Typography>
                    <CustomInput
                      id="idModule"
                      custom="select2"
                      value={values.idModule}
                      error={errors.idModule && touched.idModule ? true : false}
                      options={modules}
                      onChange={(event) => {
                        setFieldValue("idModule", event.target.value);
                      }}
                      icon={<CreateIcon />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography style={{ fontWeight: "bold" }}>Asunto</Typography>
                    <CustomInput
                      id="reason"
                      custom="inputText"
                      onChange={handleChange}
                      value={values.reason}
                      error={errors.reason && touched.reason ? true : false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography style={{ fontWeight: "bold" }}>Descripción</Typography>
                    <CustomInput
                      id="description"
                      custom="textArea"
                      onChange={handleChange}
                      value={values.description}
                      error={errors.description && touched.description ? true : false}
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
                      <input id="image" accept="image/*" type="file" onChange={processImage} />
                    </Button>
                    <Divider style={{ marginTop: "20px" }} />
                    <Grid container item xs={12} justify="center" style={{display: (fileUrl || (error && (error.id && error.image))) ? "flex" : "none"}}>
                      <Avatar
                        variant="rounded"
                        style={{ height: 140, width: 140, display: fileUrl || error && (error.id && error.image) ? "flex" : "none" }}
                        src={fileUrl ? fileUrl : (error && error.image ? (config.api + error.image) : defaultAvatar)}
                      />
                      {
                        !editMode && values.image && <HighlightOffTwoToneIcon style={{color: 'red'}} onClick={() => { deleteImage( (error.image && (error.image).substr(8)),error.id, values)  }} /> 
                      }                                         
                    </Grid>
                   
                  </Grid>
                  <Grid item xs={12}>
                    <p style={{ color: "rgba(0, 0, 0, 0.54)", marginBottom: "5px" }}> Archivo </p>
                    <Button
                      variant="contained"
                      component="label"
                      fullWidth
                    >
                      <GetAppIcon style={{ marginRight: "25px" }} />
                      <input id="file" type="file" />
                    </Button>
                  </Grid>
                </Grid>

                <Divider style={{ marginTop: "20px" }} />
                <ModalFooter
                  buttonType={"submit"}

                  cancelText={"Cancelar"}
                  onCancel={handleClose}

                  confirmText={editMode ? "Guardar" : "Guardar Cambios"}
                  onEdit={onEdit}
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
