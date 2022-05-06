import { Grid, Typography, Button, Divider, Avatar } from '@material-ui/core';
import React, { useEffect } from 'react';
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
import {
  createEntryQuery,
  updateEntryQuery,
  listQueries,
  listPendingQueries,
  deleteImageEntryQuery,
  deleteFileEntryQuery,
  consultaPendiente,
  listFrequent,
  findEntryQuery,
  statusModalOff

} from 'services/actions/EntryQueryAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import defaultCompany from 'assets/images/defaultCompany.png';
import defaultImage from 'assets/images/defaultImage.png';
import defaultArchive from 'assets/images/defaultArchive.png';
import config from 'config/Config';
import { useHistory } from 'react-router-dom';
import { listModules, findModule } from 'services/actions/ModuleAction';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOff';
import ThemeError from 'components/ThemeSettings/ThemeError';
import { getSessionInfo } from "utils/common";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const filter = createFilterOptions();

const ModalEntryQuery = props => {
  const { open, handleClose, onSaveForm, entryQuery, setEntryQuery, onGetData, statusActive = false } = props;
  const history = useHistory();
  const session = getSessionInfo();

  const [data, setData] = React.useState({
    id: '',
    reason: '',
    description: '',
    image: '',
    file: '',
    idModule: '',
    externo: '',
  });

  const [dataFrequent, setDataFrequent] = React.useState({
    id: '',
    reason: '',
    description: '',
    image: '',
    file: '',
    idModule: '',
    idFrequentQuery: "",
    isFrequentQuery: true,
  });
  const [title, setTitle] = React.useState('Iniciar Consulta');
  const [editMode, setEditMode] = React.useState(false);
  const [detailMode, setDetailMode] = React.useState(false);
  const [fileUrl, setFileUrl] = React.useState(null);
  const [file, setFile] = React.useState(false);
  const [modules, setModules] = React.useState([]);
  const [value, setValue] = React.useState(null);//se agrego
  const [frequentQueries, setFrequentQueries] = React.useState([]);//se agrego
  const { inactivo, activo } = React.useState(false);
  const { newMotivo, setNewMotivo } = React.useState('');

  var sectionsIds = session && session.role && session.role.sectionIds;
  var idHelpdesk = session && session.user && session.user.idHelpDesk;
  var nameHelpDesk = session && session.user && session.user.helpDesk && session.user.helpDesk.name;
  var idRoleUser = session && session.role && session.role.id;


  React.useEffect(() => {
    setFileUrl(null);
    setDetailMode(false)
    setEditMode(false)
    if (open) {
      props.dispatch(showBackdrop(true));
      props.dispatch(listFrequent()).then(res => {
        if (res && res.length > 0) {
          const firstFrequentQuery = res[0];
          const dataForm = {
            ...dataFrequent,
            reason: firstFrequentQuery.reason,
            description: firstFrequentQuery.description,
            idModule: firstFrequentQuery.idModule || "",
            idFrequentQuery: firstFrequentQuery.id
          }
          setDataFrequent(dataForm)
        }
        setFrequentQueries(res || [])
      }).catch(err => props.dispatch(showBackdrop(false)));

      props.dispatch(listModules())
        .then(res => {
          const moduleList = res || [];
          console.log(entryQuery)
          if (entryQuery && entryQuery.id) {
            setData(entryQuery);
            setTitle('Detalle de la Consulta');
            setEditMode(false);
            // setDetailMode(false)
          } else {
            setData({
              id: '',
              reason: '',
              description: '',
              image: '',
              file: '',
              idModule: moduleList[0] && moduleList[0].id,
              externo: ''
            });
            setTitle('Mesa de ayuda: ' + nameHelpDesk);
            setEditMode(true);
          }

          setModules(moduleList);
          props.dispatch(showBackdrop(false));

        })
        .catch(err => props.dispatch(showBackdrop(false)));
    }
  }, [open]);

  const validateForm = entryQuery => {
    const errors = {};
    entryQuery = trimObject(entryQuery);

    if (!entryQuery.reason) errors.reason = true;

    if (!entryQuery.description) errors.description = true;

    return errors;
  };

  const onSubmit = (entryQuery, { setSubmitting }) => {
    props.dispatch(showBackdrop(true));

    const imageInput = document.querySelector('#image');
    const fileInput = document.querySelector('#file');

    const formData = new FormData();
    formData.append('image', imageInput.files[0] || '');
    formData.append('file', fileInput.files[0] || '');
    formData.append('reason', entryQuery.reason);
    formData.append('description', entryQuery.description);
    formData.append('idModule', entryQuery.idModule);
    formData.append('idHelpdesk', idHelpdesk);
    formData.append('externo', 0);

    console.log(entryQuery.id)
    if (entryQuery.id) {
      // Editar
      formData.append('oldImage', data.image);

      props.dispatch(updateEntryQuery(data.id, formData)).then(res => {
        props.dispatch(showSnackBar('success', 'Consulta editada correctamente'));
        props.dispatch(showBackdrop(false));
        if (idRoleUser == "5") {
          props.dispatch(listQueries('', "", (sectionsIds.indexOf("4") ? idHelpdesk : "")));
        } else {
          props.dispatch(listPendingQueries('', (sectionsIds.indexOf("4") ? idHelpdesk : "")));
        }
        onSaveForm && onSaveForm();
        setEntryQuery && setEntryQuery(res.entryQuery);
      }).catch(error => {
        props.dispatch(showBackdrop(false));
      });
    } else {
      // Crear

      props.dispatch(consultaPendiente()).then(res => {
        if (res.status) {
          props.dispatch(createEntryQuery(formData)).then(res => {
            props.dispatch(showSnackBar('success', 'Consulta registrada'));
            props.dispatch(showBackdrop(false));

            onSaveForm && onSaveForm();
            history.push('/consultas/' + res.entryQuery.id);
          })
            .catch(error => {
              props.dispatch(showBackdrop(false));
              props.dispatch(showSnackBar('error', error.message || ''));
            });

        } else {
          props.dispatch(showSnackBar('warning', 'Usted ya creo una consulta, termine esa consulta para poder crear otra'));
          handleClose();
          props.dispatch(showBackdrop(false));
        }
        console.log(res)
      }).catch(error => {
        props.dispatch(showSnackBar("error", error.message || ""));
      });

    }
  };

  function processImage(event) {
    console.log(event.target.file)
    console.log(event.target.accept == 'image/*')
    if (event.target.accept == 'image/*') {
      if (event && event.target.files && event.target.files.length > 0) {
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        setFileUrl(imageUrl);
      } else {
        setFileUrl(null);
      }
    } else {
      setFile(true)
    }

  }

  const onEdit = () => {
    setEditMode(true);
    setTitle('Editar Consulta');
  };

  const deleteImage = (Link, id, values) => {
    if (id && values.image) {
      props.dispatch(deleteImageEntryQuery(Link, id)).then(res => {
        if (res.entryQuery) {
          setFileUrl(null);
          setData({ ...values, image: '' });
          document.getElementById('image').value = '';
          setEntryQuery && setEntryQuery({ ...values, image: null })
          props.dispatch(showSnackBar('warning', 'Imagen eliminada'));
        }
      });
    } else {
      setFileUrl(null);
      setData({ ...values, image: null });
      document.getElementById('image').value = '';
    }
  };

  const deleteFile = (link, values) => {
    props.dispatch(deleteFileEntryQuery(link, entryQuery.id)).then(res => {
      if (res.entryQuery) {
        setFileUrl(null);
        setData({ ...values, file: "" });
        setFile(false)
        props.dispatch(showSnackBar('warning', 'Archivo eliminado'));
        setEntryQuery && setEntryQuery({ ...values, file: null })
      }
    });
  }

  //se agrego
  const changeOptions = (value) => {
    if (value.id) {
      props.dispatch(findEntryQuery(value.id)).then(res => {
        console.log(res)
        const dataForm = {
          reason: res && res.entryQuery.reason,
          description: res && res.entryQuery.description,
          idModule: res && res.entryQuery.idModule || "",
          // idFrequentQuery: res && res.entryQuery.id
        }
        setData(dataForm)
      })
    } else {
      const dataForm = {
        reason: value.inputValue && value.inputValue,
        description: value.inputValue && value.inputValue,
        // idFrequentQuery: res && res.entryQuery.id
      }
      setData(dataForm)
    }

  }

  const changeStatusModal = (event) => {

    var checked = event.target.checked
    // localStorage.getItem('session')
    var statusModal = session.user.statusModal;
    if (checked) {
      console.log(checked)
      var valor = {
        status: '0'
      }
      props.dispatch(statusModalOff(valor)).then(res => {
        console.log(res)
      })
    } else {
      console.log(checked)
      var valor = {
        status: '1'
      }
      props.dispatch(statusModalOff(valor)).then(res => {
        console.log(res)
      })
    }
  }

  const handleSetMotivo = (event) => {
    // setState({ ...state, [event.target.name]: event.target.checked });
    setData({
      ...data,
      // reason: event,
      description: event,
    });

  };




  const frequentQueriesMap = frequentQueries && frequentQueries.map(fq => { return { name: fq.name, id: fq.id } }) || [];
  return (
    <Modal open={open} handleClose={handleClose} size="sm">
      <ModalHeader icon={<LibraryBooksIcon />} text={title} />
      <ModalBody>
        <Formik
          enableReinitialize
          initialValues={data}
          validate={values => validateForm(values)}
          onSubmit={onSubmit}
          encType="multipart/form-data"
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
            return (
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Grid container spacing={3}>
                  {console.log(editMode)}
                  {editMode && (
                    <Grid item xs={12}>
                      <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            changeOptions(newValue)
                            if (typeof newValue === 'string') {
                              setValue({
                                name: newValue,
                              });
                            } else if (newValue && newValue.inputValue) {
                              // Create a new value from the user input
                              setValue({
                                name: newValue.inputValue,
                              });
                            } else {
                              setValue(newValue);
                            }
                          }
                        }}
                        // onBlur
                        filterOptions={(options, params) => {
                          const filtered = filter(options, params);
                          // Suggest the creation of a new value
                          if (params.inputValue !== '') {
                            filtered.push({
                              inputValue: params.inputValue,
                              name: `Guardar Motivo "${params.inputValue}"`,
                            });
                          }
                          return filtered;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        id="free-solo-with-text-demo"
                        options={frequentQueriesMap}
                        getOptionLabel={(option) => {
                          // Value selected with enter, right from the input
                          if (typeof option === 'string') {
                            return option;
                          }
                          // Add "xxx" option created dynamically
                          if (option.inputValue) {
                            return option.inputValue;
                          }
                          // Regular option
                          return option.name;
                        }}
                        renderOption={(option) => option.name}
                        style={{ width: '100%' }}
                        freeSolo
                        renderInput={(params) => (
                          <TextField style={{ width: '100%' }}{...params} label="Agregar Consulta" variant="standard" />
                        )}
                        disabled={title == "Editar Consulta" ? editMode : !editMode}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <CustomInput
                      id="idModule"
                      custom="select2"
                      label="Modulo"
                      onChange={event => {
                        setFieldValue('idModule', event.target.value);
                      }}
                      value={values.idModule}
                      error={errors.idModule && touched.idModule ? true : false}
                      options={modules}
                      disabled={!editMode}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomInput
                      id="reason"
                      label={<p>Motivo *</p>}
                      custom="inputText"
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
                      custom="textArea"
                      onChange={handleChange}
                      value={values.description}
                      error={errors.description && touched.description ? true : false}
                      disabled={!editMode}
                    />
                  </Grid>
                  {editMode && (
                    <Grid item xs={6} container>
                      <Grid item xs={12}>
                        <p style={{ color: 'rgba(0, 0, 0, 0.54)', marginBottom: '5px' }}> Imágen </p>
                      </Grid>
                      <Grid item xs={12} style={{ padding: '0px 5px' }}>
                        <Button
                          variant="contained"
                          component="label"
                          style={{ maxWidth: '100%', width: '100%' }}
                          disabled={!editMode}
                        >
                          {/* <GetAppIcon style={{ marginRight: '10px' }} />//*/}
                          <AddPhotoAlternateIcon style={{ marginRight: '10px' }} />
                          <input id="image" accept="image/*" type="file" onChange={processImage} style={{ display: 'none' }} />
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                  {(fileUrl || values.image) && (
                    <Grid container item xs={6} justify="center">
                      <Avatar
                        style={{
                          height: 100,
                          width: 100,
                          display: fileUrl || (entryQuery && entryQuery.id && entryQuery.image) ? 'flex' : 'none',
                        }}
                        src={fileUrl ? fileUrl : data.image ? config.api + data.image : defaultCompany}
                      />
                      {editMode && values.image && (
                        <HighlightOffTwoToneIcon
                          style={{
                            color: 'red',
                            display: fileUrl || (entryQuery && entryQuery.id && entryQuery.image) ? 'flex' : 'none',
                          }}
                          onClick={() => {
                            deleteImage(data.image && data.image.substr(8), data.id, values);
                          }}
                        />
                      )}
                    </Grid>
                  )}
                  {editMode && (
                    <Grid item xs={6} container>
                      <Grid item xs={12}>
                        <p style={{ color: 'rgba(0, 0, 0, 0.54)', marginBottom: '5px' }}> Archivo </p>
                      </Grid>
                      {
                        editMode && values.file ? (
                          <Grid item xs={12} style={{ padding: "0px 5px" }}>
                            <p style={{ textAlign: "flex-start" }}>
                              <Button
                                variant="contained"
                                href={(config.api + entryQuery.file)} target="_blank"
                                endIcon={<GetAppIcon />}
                                color="secondary"
                              >
                                Descargar
                              </Button>
                              <ThemeError>
                                <Button
                                  style={{ margin: "0px 5px" }}
                                  variant="contained"
                                  color="primary"
                                  onClick={() => { deleteFile((values.file).substr(8), values) }}
                                >
                                  <HighlightOffTwoToneIcon />
                                </Button>
                              </ThemeError>
                            </p>
                          </Grid>
                        ) : (
                          <Grid item xs={12} style={{ padding: "0px 5px" }}>
                            <Button variant="contained" component="label" style={{ maxWidth: "100%", width: "100%" }} disabled={!editMode}>
                              <UploadFileIcon style={{ marginRight: '10px' }} />
                              <input id="file" type="file" onChange={processImage} style={{ display: 'none' }} />
                            </Button>
                          </Grid>
                        )
                      }
                    </Grid>
                  )}
                  {file && <Grid container item xs={6} justify="center">
                    <Avatar
                      style={{
                        height: 100,
                        width: 100,
                        display: file ? 'flex' : 'none',
                      }}
                      src={defaultArchive}
                    />
                    {editMode && values.file && (
                        <HighlightOffTwoToneIcon
                          style={{
                            color: 'red',
                            display: fileUrl || (entryQuery && entryQuery.id && entryQuery.file) ? 'flex' : 'none',
                          }}
                          onClick={() => {
                            // deleteImage(data.image && data.image.substr(8), data.id, values);
                            deleteFile((values.file).substr(8), values)
                          }}
                        />
                      )}
                  </Grid>}
                </Grid>

                <Divider style={{ marginTop: '20px' }} />
                <ModalFooter
                  buttonType={'submit'}
                  cancelText={editMode && 'Cancelar'}
                  onCancel={handleClose}
                  confirmText={editMode && 'Guardar'}
                  editText={!editMode && 'Editar'}
                  onEdit={onEdit}
                />
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
      {statusActive && (
        <Grid id='statusModal'>
          <FormControlLabel
            style={{ margin: '5px 15px' }}
            control={<Checkbox checked={inactivo} onClick={(event) => changeStatusModal(event)} /*  onChange={changeStatusModal} */ name="check" />}
            label="No deseo mostrar esto al inicio"
          />

        </Grid>
      )}
    </Modal>
  );
};

export default ModalEntryQuery;