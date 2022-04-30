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
import { trimObject, modulesQuery, getSessionInfo } from 'utils/common';
import TitleIcon from '@material-ui/icons/Title';
import {createEntryQuery,consultaPendiente} from 'services/actions/EntryQueryAction';
import { showBackdrop , showSnackBar} from 'services/actions/CustomAction';
import defaultCompany from 'assets/images/defaultCompany.png';
import config from 'config/Config';
import { useHistory } from 'react-router-dom';
import { listModules, findModule } from 'services/actions/ModuleAction';
import { findEntryQuery, listFrequent } from 'services/actions/EntryQueryAction';

const ModalFrequentQuery = props => {
  const { open, handleClose, onSaveForm, entryQuery } = props;
  const history = useHistory();
  const session = getSessionInfo();

  const [data, setData] = React.useState({
    id: '',
    reason: '',
    description: '',
    image: '',
    file: '',
    idModule:'',
    idFrequentQuery: "",
    isFrequentQuery: true,
  });

  const [frequentQueries, setFrequentQueries] = React.useState([]);
  const [title, setTitle] = React.useState("Iniciar Consulta Frecuente");
  const [editMode, setEditMode] = React.useState(false);
  const [modules, setModules] = React.useState([]);

  const sectionsIds = session && session.role && session.role.sectionIds;
  var idHelpdesk = session && session.user && session.user.idHelpDesk;
  var nameHelpDesk = session && session.user && session.user.helpDesk && session.user.helpDesk.name; 

  React.useEffect(() => {
    if(open){
      props.dispatch(showBackdrop(true));
      props.dispatch(listModules()).then(response =>{
        setModules(response)
        props.dispatch(showBackdrop(false))
      }).catch(err => props.dispatch(showBackdrop(false)));

      if(entryQuery && entryQuery.id){
          setData(entryQuery);
          setTitle("Detalle de la Consulta Frecuente");
          setEditMode(false);
      }else{
        setTitle('Mesa de ayuda: '+ nameHelpDesk);
        props.dispatch(listFrequent()).then(res =>{
          if(res && res.length > 0){
            const firstFrequentQuery = res[0];
            const dataForm = {
              ...data,
              reason: firstFrequentQuery.reason,
              description: firstFrequentQuery.description,
              idModule: firstFrequentQuery.idModule || "",
              idFrequentQuery: firstFrequentQuery.id
            }
            setData(dataForm)
            setEditMode(true);
          }
          setFrequentQueries(res || [])
          props.dispatch(showBackdrop(false))
        }).catch(err => props.dispatch(showBackdrop(false)));
      }
    }
  }, [open]);

  const changeOptions = (id) => {
    props.dispatch(findEntryQuery(id)).then(res => {
      const dataForm = {
        ...data,
        reason: res && res.entryQuery.reason,
        description: res && res.entryQuery.description,
        idModule: res && res.entryQuery.idModule || "",
        idFrequentQuery: res && res.entryQuery.id
      }
      setData(dataForm) 
    })
 }

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
    props.dispatch(consultaPendiente()).then(res => {
      if(res.status)
      {
        props.dispatch(showBackdrop(true));

        const formData = new FormData();
        formData.append("reason", entryQuery.reason)
        formData.append('description', entryQuery.description)
        formData.append('idModule', entryQuery.idModule)
        formData.append('idHelpdesk', idHelpdesk);

        props.dispatch(createEntryQuery(formData)).then(res => {
          props.dispatch(showSnackBar('success', 'Consulta registrada'));
          props.dispatch(showBackdrop(false));
          onSaveForm && onSaveForm();
          history.push("/consultas/" + res.entryQuery.id);
        }).catch(error => {
          props.dispatch(showBackdrop(false));
          props.dispatch(showSnackBar("error", error.message || ""));
        }); 
      }else{
        props.dispatch(showSnackBar('warning', 'Usted ya creo una consulta, termine esa consulta para poder crear otra'));
        handleClose();
      }
      console.log(res)
    }).catch(error => {
      props.dispatch(showSnackBar("error", error.message || ""));
    });  
            
  };

  const onEdit = () => {
    setEditMode(true);
    setTitle("Editar Consulta Frecuente");
  }

  const frequentQueriesMap = frequentQueries && frequentQueries.map(fq => { return {name: fq.name, id: fq.id} }) || [];

  return (
    <Modal open={open} handleClose={handleClose} size="sm">
      <ModalHeader icon={<LibraryBooksIcon />} text={title} />
      <ModalBody>
        {
          frequentQueries.length==0 ? (
            <span>No hay consultas frecuentes.</span>
          ) : (
          <Formik enableReinitialize initialValues={data} validate={values => validateForm(values)} onSubmit={onSubmit} encType="multipart/form-data">
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
              return (
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CustomInput
                          id="idfrequentQuery"
                          custom="select2"
                          label="Consulta Frecuente"
                          onChange={(event) => {
                            setFieldValue("idfrequentQuery", event.target.value)
                            changeOptions(event.target.value)
                          }}
                          options={frequentQueriesMap}
                          value={values.idFrequentQuery}
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
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomInput
                          id="description"
                          label={"Descripción*"}
                          custom="textArea"
                          onChange={handleChange}
                          value={values.description}
                          error={errors.description && touched.description ? true : false}
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                      <CustomInput
                          id="idModule"
                          custom="select2"
                          label="Modulo"
                          onChange={(event) => {
                            setFieldValue("idModule", event.target.value)
                          }}
                          value={values.idModule}
                          error={errors.idModule && touched.idModule ? true : false}
                          options={modules}
                          disabled
                        />
                      </Grid>

                      {
                        entryQuery && entryQuery.image && (
                          <Grid container item xs={12} justify="center">
                            <Avatar
                              style={{ height: 140, width: 140, display: (entryQuery && entryQuery.image) ? "flex" : "none" }}
                              src={data.image ? (config.api + data.image) : defaultCompany}
                            />
                          </Grid>
                        )
                      }
                    </Grid>

                    <Divider style={{ marginTop: "20px" }} />
                    <ModalFooter
                      buttonType="submit"
                      cancelText={editMode && "Cancelar"}
                      onCancel={handleClose}

                      confirmText={editMode && "Guardar"}

                      editText={!editMode && "Editar"}
                      onEdit={onEdit}
                    />
                  </Form>
                );
              }}
            </Formik>
          )
        }
      </ModalBody>
    </Modal>
  );
};

export default ModalFrequentQuery;
