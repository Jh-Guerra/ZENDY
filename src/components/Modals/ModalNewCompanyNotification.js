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
import { listCompanies } from 'services/actions/CompanyAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { listUsersByCompany } from 'services/actions/UserAction';
import { createCompanyNotification, deleteImageNotification, updateNotification, listAdminNotifications } from 'services/actions/NotificationAction';
import { getImageProfile, trimObject,getCustomRoleName } from 'utils/common';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { pColor } from 'assets/styles/zendy-css';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import config from 'config/Config';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import GetAppIcon from '@material-ui/icons/GetApp';
import { errorSolved } from 'services/actions/ErrorAction';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOff';
import { useHistory } from 'react-router-dom';

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

const ModalNewCompanyNotification = (props) => {
    
    const classes = useStyles();
    const { open, handleClose, onSaveForm, notification={}, idError, headerText, idCompany,  onGetErrorData } = props;
    const history = useHistory();
    const [companies, setCompanies] = React.useState([]);
    const [companyId, setCompanyId] = React.useState("");
    const [users, setUsers] = React.useState([]);

    const [term, setTerm] = React.useState('');
    const [allChecked, setAllChecked] = React.useState(false);
    const [editMode, setEditMode] = React.useState(true);

    const [imageUrl, setImageUrl] = React.useState(null);

    const [data, setData] = React.useState({
        id: null,
        reason: "",
        description: "",
        allUsersCompany: false,
        companiesNotified: [],
        usersNotified: [],
        idError: "",
        solved: false,
        image: null,
        file: null
    });

    const [newData, setNewData] = React.useState({
        id: null,
        reason: "",
        description: "",
        allUsersCompany: false,
        companiesNotified: [],
        usersNotified: [],
        idError: "",
        solved: false,
        image: null,
        file: null
    });

    React.useEffect(() => {
        if(open){
            if(newData && newData.id){
                setData({...data});
                setNewData({...newData});
                setCompanyId(newData.companiesNotified[0]);
                onListUsersByCompany(newData.companiesNotified[0], "");
                onListCompanies(true);
            }else{
                idCompany ? onListByCompany(idCompany) :  onListCompanies(false);
            }
        }else{
            setUsers([]);
        }
        setImageUrl(null);
    }, [open]);

    const onListUpdatedNotifications = (term) => {
        props.dispatch(showBackdrop(true));
        props.dispatch(listAdminNotifications(term)).then(res => {
            props.dispatch(showBackdrop(false));
        }).catch(err => props.dispatch(showBackdrop(false)));;
    };

    const onListCompanies = (isEdit) => {
        props.dispatch(showBackdrop(true));
        props.dispatch(listCompanies()).then(res => {
            setCompanies(res || []);
            if(res && res[0] && !isEdit){
                setCompanyId(res[0].id || null);
                setData({...data, companiesNotified: [...data.companiesNotified, res[0].id]});
                setNewData({...newData, companiesNotified: [...newData.companiesNotified, res[0].id]});
                onListUsersByCompany(res[0].id, "");
            }
            props.dispatch(showBackdrop(false));
        }).catch(err => props.dispatch(showBackdrop(false)));;
    }

    const onListByCompany = (idCompany) => {
        props.dispatch(showBackdrop(true));
        props.dispatch(listCompanies()).then(res => {
            setCompanies(res || []);
            if(res && res[0]){
                setCompanyId(idCompany);
                setData({
                    ...data,
                    companiesNotified: [...data.companiesNotified, idCompany],
                    idError: idError
                });   
                setNewData({
                    ...newData,
                    companiesNotified: [...newData.companiesNotified, idCompany],
                    idError: idError
                });
                onListUsersByCompany(idCompany, "");
            }
            props.dispatch(showBackdrop(false));
        }).catch(err => props.dispatch(showBackdrop(false)));;
    }
    
    const onListUsersByCompany = (paramCompanyId, term) => {
        props.dispatch(showBackdrop(true));
        props.dispatch(listUsersByCompany(paramCompanyId, term)).then(res => {
            setUsers(res);
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

    const onSubmit = () => {
        if(!newData.usersNotified || newData.usersNotified.length == 0)
            return props.dispatch(showSnackBar('warning', 'Necesita seleccionar al menos algún usuario'));

        props.dispatch(showBackdrop(true));
        const imageInput = document.querySelector('#image') ;
        const fileInput = document.querySelector('#file') ;

        const formData = new FormData();
        if(newData.id) formData.append('id', newData.id);
        formData.append('image', imageInput.files[0] || '');
        formData.append('file', fileInput.files[0] || '');
        formData.append("allUsersCompany", newData.allUsersCompany)
        formData.append("idError", idError)
        formData.append("reason", newData.reason)
        formData.append('description', newData.description)
        formData.append('oldImage', newData.image);
        

        for (var i = 0; i < newData.companiesNotified.length; i++) {
            formData.append('companiesNotified[]', newData.companiesNotified[i]);
        }

        for (var i = 0; i < newData.usersNotified.length; i++) {
            formData.append('usersNotified[]', newData.usersNotified[i]);
        }

        if(newData.id){
            // Update
            props.dispatch(updateNotification(newData.id, formData)).then(res => {
                props.dispatch(showSnackBar('success', 'Notificación actualizada'));
                props.dispatch(showBackdrop(false));
                onSaveForm && onSaveForm(res.notification);
                onListUpdatedNotifications('');
            }).catch(error => { props.dispatch(showBackdrop(false)); props.dispatch(showSnackBar("error", error.message || "")); });
        } else{
            props.dispatch(createCompanyNotification(formData)).then(res => {
                props.dispatch(showSnackBar('success', 'Notificación enviada'));
                props.dispatch(showBackdrop(false));
                onSaveForm && onSaveForm();
                if(newData.solved){
                    history.push("/notificaciones/" + res.notification.id);
                }else{                   
                    idCompany ? onListByCompany(idCompany) :  onListCompanies(false);
                    onGetErrorData && onGetErrorData(newData.idError);
                }               
                handleClose(false);
            }).catch(error => { props.dispatch(showBackdrop(false)); props.dispatch(showSnackBar("error", error.message || "")); });
        }
        
        if(idError){
            newData.solved && props.dispatch(errorSolved(idError))
        }
    }

    const deleteImage = (Link, id, values) => {
        if(id && values.image){
          props.dispatch(deleteImageNotification(Link,id)).then(res => {
            if(res.notification){
              setImageUrl(null);
              setData({...values, image: ""});
              setNewData({...values, image: ""});
              document.getElementById('image').value = "";
              props.dispatch(showSnackBar('warning', 'Imagen eliminada'));
            }
          });
        }else{
          setImageUrl(null);
          setData({...values, image:null});
          setNewData({...values, image:null});
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
                icon={<NotificationsIcon />}
                text={newData.id ? "Actualizar Notificación" : ( headerText ? headerText : "Nueva notificación para 1 empresa") }
            />

            <ModalBody>
                <Formik enableReinitialize initialValues={data} validate={values => validateForm(values)} onSubmit={onSubmit} encType="multipart/form-data">
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
                        return (
                        <Form onSubmit={handleSubmit} encType="multipart/form-data">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <CustomInput
                                        id="companyId"
                                        custom="select"
                                        label="Empresa"
                                        onChange={(event) => {
                                            setCompanyId(event.target.value);
                                            setFieldValue("companiesNotified", [event.target.value]);
                                            setFieldValue("allUsersCompany", false);
                                            setNewData({ 
                                                ...newData,
                                                companiesNotified: [event.target.value],
                                                allUsersCompany: false 
                                            });
                                            onListUsersByCompany(event.target.value, "");
                                        }}
                                        value={companyId}
                                        options={companies}
                                        disabled={!editMode || !!newData.id || !!idCompany}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid>
                                        <Typography>Todos los usuarios</Typography>
                                        <Checkbox
                                            checked={!!values.allUsersCompany}
                                            onChange={(event) => { 
                                                setFieldValue("allUsersCompany", !values.allUsersCompany);
                                                setNewData({
                                                    ...newData,
                                                    allUsersCompany: !values.allUsersCompany
                                                });
                                                if(!values.allUsersCompany){
                                                    setFieldValue("usersNotified", [...users.map(user => user.id) ]);
                                                    setNewData({
                                                        ...newData,
                                                        usersNotified: [...users.map(user => user.id)] 
                                                    });
                                                }else{
                                                    setFieldValue("usersNotified", []);
                                                    setNewData({
                                                        ...newData,
                                                        usersNotified: []
                                                    });
                                                }
                                                
                                            }}
                                            checkedIcon={<CheckBoxIcon style={{ color: pColor }} />}
                                            disabled={users.length==0 || !!newData.id}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <List dense style={{ maxHeight: 250, overflow: 'auto' }}>
                                    {
                                        users.map((user, i) => {
                                            var defaultImageType = user && user.sex || "O";

                                            var onSelectUser = (userId) => {
                                                var newUsersNotified = [];
                                                if(values.usersNotified.includes(userId)){
                                                    newUsersNotified = values.usersNotified.filter(id => id != userId);
                                                }else{
                                                    newUsersNotified = [...values.usersNotified, userId];
                                                }

                                                setFieldValue("usersNotified", newUsersNotified);
                                                setNewData({
                                                    ...newData,
                                                    usersNotified: newUsersNotified
                                                });
                                                setFieldValue("allUsersCompany", newUsersNotified.length == users.length);
                                                setNewData({
                                                    ...newData,
                                                    allUsersCompany: newUsersNotified.length == users.length
                                                });
                                            }

                                            return (
                                                <ListItem key={i} button divider onClick={() => { onSelectUser(user.id) }} disabled={!!newData.id}>
                                                    <ListItemAvatar>
                                                        <Avatar alt="" src={user.avatar ? (config.api+user.avatar) : getImageProfile(defaultImageType)} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={`${user.firstName} ${user.lastName}`}
                                                        secondary={`${getCustomRoleName(user.roleName)}`}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <Checkbox
                                                            checked={values.usersNotified && values.usersNotified.includes(user.id)}
                                                            onChange={() => {onSelectUser(user.id)}}
                                                            icon={<RadioButtonUncheckedIcon />}
                                                            checkedIcon={<RadioButtonCheckedIcon style={{ color: pColor }} />}
                                                            disabled={!!newData.id}
                                                        />
                                                    </ListItemSecondaryAction>
                                                    </ListItem>
                                            );
                                        })
                                    }
                                    {
                                        users.length === 0 && (
                                        <ListItem divider   style={{ padding: '12px 55px 12px 55px' }}>
                                            <ListItemText
                                                primary={`No hay usuarios registrados `}
                                            />
                                        </ListItem>        
                                        )
                                    }
                                    </List>
                                </Grid>

                                <Grid item xs={12}>
                                    <CustomInput
                                        id="reason"
                                        custom="inputText"
                                        label="Asunto"
                                        //onChange={handleChange}
                                        onChange={(event) => {
                                            setFieldValue("reason", event.target.value)
                                            setNewData({
                                            ...newData,
                                            reason: event.target.value
                                        })}}
                                        value={values.reason}
                                        error={ errors.reason && touched.reason ? true : false }
                                        icon={<SubtitlesIcon />}
                                        disabled={!editMode}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomInput
                                        id="description"
                                        custom="textArea"
                                        label="Descripcion"
                                        //onChange={handleChange}
                                        onChange={(event) => {
                                            setFieldValue("description", event.target.value)
                                            setNewData({
                                            ...newData,
                                            description: event.target.value
                                        })}}
                                        value={values.description}
                                        error={ errors.description && touched.description ? true : false }
                                    />
                                </Grid>
                                {
                                    idError && (
                                        <Grid item xs={12}>
                                            <Grid>
                                            <Typography>¿Ha sido resuelto?</Typography>
                                            <Checkbox
                                                checked={!!values.solved}
                                                onChange={() => { setFieldValue("solved", !values.solved);
                                                                    setData({...values,solved:(!values.solved)})
                                                                    setNewData({
                                                                        ...newData,
                                                                        solved: !values.solved
                                                                    })
                                                                }}
                                                                    
                                                checkedIcon={<CheckBoxIcon style={{ color: pColor }} />}
                                            />
                                            </Grid>
                                        </Grid>
                                    )
                                }
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
                                        editMode && values.image && <HighlightOffTwoToneIcon style={{color: 'red', display: (imageUrl || values.image) ? "flex" : "none"}} onClick={() => { deleteImage( ((values.image).substr(8)), newData.id, values)  }}/>
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
                        </Form>
                        );
                    }}
                </Formik>
                
            </ModalBody>

            <ModalFooter
                //buttonType="submit"
                confirmText={!!data.id ? "Guardar" : "Enviar"}
                cancelText={"Cancelar"}
                onCancel={handleClose}
                onConfirm={onSubmit}
            />
        </Modal>
    )
}

export default ModalNewCompanyNotification
