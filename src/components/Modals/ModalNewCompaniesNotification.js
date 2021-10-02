import { Avatar, Button, Checkbox, Divider, Grid, InputAdornment, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import { TextField } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ModalFooter from './common/ModalFooter';
import { Form, Formik } from 'formik';
import CustomInput from 'components/CustomInput';
import { listWithUsersCount } from 'services/actions/CompanyAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { listUsersByCompany } from 'services/actions/UserAction';
import { createCompaniesNotification, deleteImageNotification, updateNotification } from 'services/actions/NotificationAction';
import { getImageProfile, trimObject } from 'utils/common';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { pColor } from 'assets/styles/zendy-css';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import config from 'config/Config';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import GetAppIcon from '@material-ui/icons/GetApp';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOff';


const useStyles = makeStyles(theme => ({
    inputText: {
        margin: theme.spacing(1),
        width: "50%"
    },
    fullInputText: {
        margin: theme.spacing(1),
        width: "100%"
    }
}));

const ModalNewCompaniesNotification = (props) => {
    
    const classes = useStyles();
    const { open, handleClose, onSaveForm, notification={} } = props;

    const [companies, setCompanies] = React.useState([]);
    const [editMode, setEditMode] = React.useState(true);
    const [imageUrl, setImageUrl] = React.useState(null);

    const [data, setData] = React.useState({
        id: "",
        reason: "",
        description: "",
        allUsersCompany: true,
        companiesNotified: [],
        usersNotified: [],
        idError: "",
        solved: false,
        image: null,
        file: null
    });

    React.useEffect(() => {
        if(open){
            if(notification && notification.id){
                setData({...notification});
            }

            onListCompanies();
            setImageUrl(null);
        }
    }, [open]);


    const onListCompanies = () => {
        props.dispatch(showBackdrop(true));
        props.dispatch(listWithUsersCount("")).then(res => {
            setCompanies(res || []);
            props.dispatch(showBackdrop(false));
        }).catch(err => props.dispatch(showBackdrop(false)));;
    }
    const validateForm = notification => {
        const errors = {};
        notification = trimObject(notification);
    
        if (!notification.reason) 
          errors.reason = true;

        if (!notification.description) 
          errors.description = true;
    
        return errors;
    };

    function processImage(event){
        if(event && event.target.files && event.target.files.length > 0){
            const imageFile = event.target.files[0];
            const imageUrl = URL.createObjectURL(imageFile);
            setImageUrl(imageUrl)
        }else{
            setImageUrl(null)
        }
    }

    const onSubmit = (notification, { setSubmitting }) => {
        if(!notification.companiesNotified || notification.companiesNotified.length == 0)
            return props.dispatch(showSnackBar('warning', 'Necesita seleccionar al menos algún usuario'));

        props.dispatch(showBackdrop(true));
        const imageInput = document.querySelector('#image') ;
        const fileInput = document.querySelector('#file') ;

        const formData = new FormData();
        if(notification.id) formData.append('id', notification.id);
        formData.append('image', imageInput.files[0] || '');
        formData.append('file', fileInput.files[0] || '');
        formData.append("allUsersCompany", true)
        formData.append("idError", notification.idError)
        formData.append("solved", notification.solved)
        formData.append("reason", notification.reason)
        formData.append('description', notification.description)
        formData.append('oldImage', data.image);
        
        for (var i = 0; i < notification.companiesNotified.length; i++) {
            formData.append('companiesNotified[]', notification.companiesNotified[i]);
        }

        if(notification.id){
            // Update
            props.dispatch(updateNotification(notification.id, formData)).then(res => {
                props.dispatch(showSnackBar('success', 'Notificación actualizada'));
                props.dispatch(showBackdrop(false));
                onSaveForm && onSaveForm(res.notification);
            }).catch(error => { props.dispatch(showBackdrop(false)); props.dispatch(showSnackBar("error", error.message || "")); });
        } else{
            props.dispatch(createCompaniesNotification(formData)).then(res => {
                props.dispatch(showSnackBar('success', 'Notificación enviada'));
                props.dispatch(showBackdrop(false));
                onSaveForm && onSaveForm();
            }).catch(error => { props.dispatch(showBackdrop(false)); props.dispatch(showSnackBar("error", error.message || "")); });
        }
    }

    const deleteImage = (Link,id) => {
        props.dispatch(deleteImageNotification(Link,id)).then(res => {
          if(res.notification){
            setImageUrl(null)
            setData({...data,image:null})
          }});
    }

    return (
        <Modal 
            open={open} 
            handleClose={handleClose} 
            size="sm"
        >
            <ModalHeader 
                icon={<NotificationsIcon />}
                text={notification.id ? "Actualizar Notificación" : "Nueva Notificación para muchas empresas"}
            />

            <ModalBody>
                <Formik enableReinitialize initialValues={data} validate={values => validateForm(values)} onSubmit={onSubmit} encType="multipart/form-data">
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                        return (
                        <Form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <p style={{ color: 'rgba(0, 0, 0, 0.54)', marginBottom: '5px' }}> Empresas con usuarios activos </p>
                                </Grid>
                                <Grid item xs={12}>
                                    <List dense style={{ maxHeight: 250, overflow: 'auto' }}>
                                    {
                                        companies.map((company, i) => {

                                            var onSelectCompany = (companyId) => {
                                                var newCompaniesNotified = [];
                                                if(values.companiesNotified.includes(companyId)){
                                                    newCompaniesNotified = values.companiesNotified.filter(id => id != companyId);
                                                }else{
                                                    newCompaniesNotified = [...values.companiesNotified, companyId];
                                                }

                                                setFieldValue("companiesNotified", newCompaniesNotified);
                                            }

                                            return (
                                                <ListItem key={i} button divider onClick={() => { onSelectCompany(company.id) }} disabled={notification.id}>
                                                    <ListItemAvatar>
                                                        <Avatar alt="" src={company.avatar ? (config.api+company.avatar) : getImageProfile("Company")} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={company.name}
                                                        secondary={`${company.usersCount} usuarios`}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <Checkbox
                                                            checked={values.companiesNotified && values.companiesNotified.includes(company.id)}
                                                            onChange={() => {onSelectCompany(company.id)}}
                                                            icon={<RadioButtonUncheckedIcon />}
                                                            checkedIcon={<RadioButtonCheckedIcon style={{ color: pColor }} />}
                                                            disabled={notification.id}
                                                        />
                                                    </ListItemSecondaryAction>
                                                    </ListItem>
                                            );
                                        })
                                    }
                                    {
                                        companies.length === 0 && (
                                        <ListItem divider   style={{ padding: '12px 55px 12px 55px' }}>
                                            <ListItemText
                                                primary={`No hay empresas registradas`}
                                            />
                                        </ListItem>        
                                        )
                                    }
                                    </List>
                                </Grid>

                                <Grid item xs={12}>
                                    <CustomInput
                                        id="reason"
                                        type="inputText"
                                        label="Asunto"
                                        onChange={handleChange}
                                        value={values.reason}
                                        error={ errors.reason && touched.reason ? true : false }
                                        helperText={ errors.reason && touched.reason && errors.reason }
                                        icon={<SubtitlesIcon />}
                                        disabled={!editMode}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomInput
                                        id="description"
                                        type="textArea"
                                        onChange={handleChange}
                                        value={values.description}
                                        error={ errors.description && touched.description ? true : false }
                                        helperText={ errors.description && touched.description && errors.description }
                                    />
                                </Grid>
                                <Grid item xs={12} container>
                                    <Grid item xs={12}>
                                        <p style={{ color: 'rgba(0, 0, 0, 0.54)', marginBottom: '5px' }}> Imágen </p>
                                    </Grid>
                                    <Grid item xs={12} style={{ padding: "0px 5px" }}>
                                        <Button variant="contained" component="label" style={{ maxWidth: "100%", width: "100%" }} disabled={!editMode}>
                                            <GetAppIcon style={{ marginRight: '10px' }} />
                                            <input id="image" accept="image/*" type="file" onChange={processImage} />
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={12} justify="center" style={{display: (imageUrl || values.image) ? "flex" : "none"}}>
                                    <Avatar
                                        style={{ height: 140, width: 140 }}
                                        src={imageUrl ? imageUrl : (config.api + values.image)}
                                    />
                                    {
                                        editMode && <HighlightOffTwoToneIcon fontSize="medium" style={{color: 'red', display: (imageUrl || values.image) ? "flex" : "none"}} onClick={() => { deleteImage( ((values.image).substr(8)),data.id)  }}/>
                                    }
                                </Grid>
                                <Grid item xs={12} container>
                                    <Grid item xs={12}>
                                        <p style={{ color: 'rgba(0, 0, 0, 0.54)', marginBottom: '5px' }}> Archivo </p>
                                    </Grid>
                                    <Grid item xs={12} style={{ padding: "0px 5px" }}>
                                        <Button variant="contained" component="label" style={{ maxWidth: "100%", width: "100%"}} disabled={!editMode}>
                                            <GetAppIcon style={{ marginRight: '10px' }} />
                                            <input id="file" type="file" />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Divider style={{ marginTop: "20px" }} />
                            <ModalFooter
                                buttonType="submit"
                                confirmText={"Enviar"}
                                cancelText={"Cancelar"}
                                onCancel={handleClose}
                            />
                        </Form>
                        );
                    }}
                </Formik>
                
            </ModalBody>
        </Modal>
    )
}

export default ModalNewCompaniesNotification
