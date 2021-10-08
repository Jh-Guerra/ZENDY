import { Grid, Divider, Avatar, Button } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import ModalFooter from './common/ModalFooter';
import { AccountCircle } from '@material-ui/icons';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Form, Formik } from 'formik';
import CustomInput from 'components/CustomInput';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import { onlyNumbers, trimObject, userRoles, sexTypes } from 'utils/common';
import PhoneIcon from '@material-ui/icons/Phone';
import { createUser, deleteImageUser, updateUser,uploadImage} from 'services/actions/UserAction';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EditIcon from '@material-ui/icons/Edit';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { listCompanies } from 'services/actions/CompanyAction';
import defaultAvatar from 'assets/images/defaultAvatarMale.jpg';
import config from "../../config/Config";
import GetAppIcon from '@material-ui/icons/GetApp';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOff';
import { getImageProfile, getSessionInfo } from "utils/common";

const ModalUser = (props) => {
    
    const { open, handleClose, user } = props;
    const session = getSessionInfo();
    const role = session && session.role && session.role.name || {};
    const companyId = session && session.user && session.user.idCompany || {};

    const [data, setData] = React.useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dob: new Date(),
        sex: "M",
        phone: "",
        idRole: "4",
        idCompany: "",
        avatar: ""
    });

    const [title, setTitle] = React.useState("Agregar Usuario");
    const [icon, setIcon] = React.useState(<PersonAddIcon />);
    const [editMode, setEditMode] = React.useState(false);
    const [companies, setCompanies] = React.useState([]);
    const [fileUrl, setFileUrl] = React.useState(null);

    React.useEffect(() => {
        if(open){
            if(user && user.id){
                // Ver el detalle de un usuario
                setData(user);
                setTitle("Detalle del usuario");
                setIcon(<AssignmentIndIcon />);
                setEditMode(false);
            }else{
                // Crear un nuevo usuario
                setData({
                    id: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    dob: new Date(),
                    sex: "M",
                    phone: "",
                    idRole: "4",
                    idCompany: "",
                    avatar: ""
                });
                setTitle("Agregar usuario");
                setIcon(<PersonAddIcon />);
                setEditMode(true);
            }
            props.dispatch(showBackdrop(true));
            props.dispatch(listCompanies()).then(response =>{
                setCompanies(response)
                props.dispatch(showBackdrop(false))
            }).catch(err => props.dispatch(showBackdrop(false)));
            setFileUrl(null)
        }
    }, [open]);

    const validateForm = user => {
        const errors = {};
        user = trimObject(user);

        if (!user.firstName) 
            errors.firstName = 'Nombre requerido';

        if (!user.lastName)
            errors.lastName = 'Apellido requerido'

        if (!user.email)
            errors.email = 'Correo requerido'

        if(user && user.id){
        } else { if (!user.password)
                errors.password = 'Contraseña requerida'
            }

        if (!user.dob)
            errors.dob = 'Fecha de Nacimiento requerido'

        if (!user.phone)
            errors.phone = 'N° celular requerido'

        if(role != 'AdminEmpresa') {
            if (!['1', '2'].includes(user.idRole+"") && !user.idCompany)
                errors.idCompany = 'Empresa requerida'
        }

        return errors;
    };

    const onSubmit = (user, { setSubmitting }) => {
        props.dispatch(showBackdrop(true));
        if(user.id){
            // Editar
            const fileInput = document.querySelector('#image') ;
            const formData = new FormData();
            formData.append('image', fileInput.files[0]);
            formData.append('image', fileInput.files[0]);
            //for de objetos averiguar
            formData.append('firstName', user.firstName)
            formData.append('lastName', user.lastName)
            formData.append('email', user.email)
            var dateDOB = (new Date(user.dob)).toUTCString();
            formData.append('dob', dateDOB)
            formData.append('phone', user.phone)
            formData.append('sex', user.sex)
            formData.append('idRole', user.idRole)
            formData.append('idCompany', user.idCompany)
            formData.append('oldImage', data.avatar);

            // Editar
           props.dispatch(updateUser(data.id, formData)).then(res => {
               props.dispatch(showBackdrop(false));
               props.onConfirmCallBack();
           }).catch(error => {
               props.dispatch(showBackdrop(false));                    
                    props.dispatch(showBackdrop(false));                    
               props.dispatch(showBackdrop(false));                    
           });
        }else{
            // Agregar
            const fileInput = document.querySelector('#image') ;
            const formData = new FormData();
            formData.append('image', fileInput.files[0]);
            //for de objetos averiguar
            formData.append('firstName', user.firstName)
            formData.append('lastName', user.lastName)
            formData.append('email', user.email)
            var dateDOB = (new Date(user.dob)).toUTCString();
            formData.append('dob', dateDOB)
            formData.append('phone', user.phone)
            formData.append('sex', user.sex)
            formData.append('idRole', user.idRole)
            if(role == 'AdminEmpresa') { 
                formData.append('idCompany', companyId)
            }
            else {
                formData.append('idCompany', user.idCompany)
            }
            
            props.dispatch(createUser(formData)).then(res => {
                props.dispatch(showBackdrop(false));
                props.onConfirmCallBack();
            }).catch(error => {
                props.dispatch(showBackdrop(false));
                console.log('error', error);
            });
        }
    }

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
        setTitle("Editar Usuario");
        setIcon(<EditIcon />);
    }

    const deleteImage = (Link, id, values) => {
        if(id && values.avatar){
          props.dispatch(deleteImageUser(Link,id)).then(res => {
            if(res.user){
              setFileUrl(null);
              setData({...values, avatar: ""});
              document.getElementById('image').value = "";
              props.dispatch(showSnackBar('warning', 'Imagen eliminada'));
            }
          });
        }else{
          setFileUrl(null);
          setData({...values, avatar:null});
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
                <Formik enableReinitialize initialValues={data} validate={values => validateForm(values)} onSubmit={onSubmit} encType="multipart/form-data">
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue}) => {
                        return (
                            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="firstName"
                                            label="Nombre"
                                            custom="inputText"
                                            onChange={handleChange}
                                            value={values.firstName}
                                            error={ errors.firstName && touched.firstName ? true : false }
                                            helperText={ errors.firstName && touched.firstName && errors.firstName }
                                            icon={<AccountCircle />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="lastName"
                                            custom="inputText"
                                            label="Apellido"
                                            onChange={handleChange}
                                            value={values.lastName}
                                            error={ errors.lastName && touched.lastName ? true : false }
                                            helperText={ errors.lastName && touched.lastName && errors.lastName }
                                            icon={<AccountCircle />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="email"
                                            custom="inputText"
                                            label="Correo Electrónico"
                                            onChange={handleChange}
                                            value={values.email}
                                            error={ errors.email && touched.email ? true : false }
                                            helperText={ errors.email && touched.email && errors.email }
                                            icon={<AlternateEmailIcon />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    {
                                        !data.id && editMode && (
                                            <Grid item xs={12}>
                                                <CustomInput
                                                    id="password"
                                                    label="Contraseña"
                                                    custom="inputText"
                                                    type="password"
                                                    onChange={handleChange}
                                                    value={values.password}
                                                    error={ errors.password && touched.password ? true : false }
                                                    helperText={ errors.password && touched.password && errors.password }
                                                    icon={<LockIcon />}
                                                    disabled={!editMode}
                                                />
                                            </Grid>
                                        )
                                    }
                                    <Grid item xs={12} md={6}>
                                        <CustomInput
                                            id="sex"
                                            custom="select"
                                            label="Sexo"
                                            onChange={(event) => {
                                                setFieldValue("sex", event.target.value);
                                            }}
                                            value={values.sex}
                                            options={sexTypes}
                                            error={ errors.sex && touched.sex ? true : false }
                                            helperText={ errors.sex && touched.sex && errors.sex }
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomInput
                                            id="dob"
                                            custom="inputDate"
                                            label="Fecha de Nacimiento"
                                            onChange={(date) => {
                                                setFieldValue("dob", date);
                                            }}
                                            value={values.dob}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomInput
                                            id="phone"
                                            custom="inputText"
                                            maxlength="16"
                                            label="N° Celular"
                                            onChange={(event) => { 
                                                 setFieldValue("phone", onlyNumbers(Math.max(0, parseInt(event.target.value)).toString().slice(0,15)))
                                            }}
                                            value={values.phone}
                                            error={ errors.phone && touched.phone ? true : false }
                                            helperText={ errors.phone && touched.phone && errors.phone }
                                            icon={<PhoneIcon />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                       <CustomInput 
                                            id="idRole"
                                            custom="select"
                                            label="Tipo de Usuario"
                                            onChange={(event) => {
                                                setFieldValue("idRole", event.target.value)
                                            }}
                                            value={values.idRole}
                                            options={userRoles}
                                            error={ errors.idRole && touched.idRole ? true : false }
                                            helperText={ errors.idRole && touched.idRole && errors.idRole }
                                            disabled={!editMode}
                                       />
                                    </Grid>
                                    {
                                        !['1', '2'].includes(values.idRole+"") && role == 'Admin' && (
                                            <Grid item xs={12}>
                                                <CustomInput
                                                    id="idCompany"
                                                    custom="select2"
                                                    label="Empresa"
                                                    onChange={(event) => {
                                                        setFieldValue("idCompany", event.target.value)
                                                    }}
                                                    value={values.idCompany}
                                                    error={ errors.idCompany && touched.idCompany ? true : false }
                                                    helperText={ errors.idCompany && touched.idCompany && errors.idCompany }
                                                    options={companies}
                                                    disabled={!editMode}
                                                />
                                            </Grid>
                                        )
                                    }
                                    {
                                        editMode && (
                                            <Grid item xs={12}>
                                                <p style={{color: "rgba(0, 0, 0, 0.54)", marginBottom:"5px"}}> Avatar </p>
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    fullWidth
                                                    disabled={!editMode}
                                                >
                                                    <GetAppIcon style={{marginRight: "12px"}} />
                                                    <input id="image" accept="image/*" type="file" onChange={processImage} />
                                                </Button>
                                            </Grid>
                                        )
                                    }
                                    <Grid container item xs={12} justify = "center" >
                                        <Avatar 
                                            style={{height:140, width:140, display:fileUrl || (user.id && user.avatar) ? "flex" : "none"}} 
                                            src={fileUrl ? fileUrl : (data.avatar ? (config.api+data.avatar) : defaultAvatar)}
                                        />
                                        {
                                            editMode && (user.id && user.avatar) && <HighlightOffTwoToneIcon style={{color: 'red', display:fileUrl || (user.id && user.avatar) ? "flex" : "none"}} onClick={() => { deleteImage( (data.avatar && (data.avatar).substr(8)), data.id, values)  }}/>
                                        }
                                    </Grid>
                                </Grid>
                                
                                <Divider style={{marginTop:"20px"}} />

                                <ModalFooter
                                    buttonType={"submit"}

                                    cancelText={editMode && "Cancelar"}
                                    onCancel={handleClose}

                                    confirmText={editMode && "Guardar"}
                                    
                                    deleteText={!editMode && "Eliminar"}
                                    onDelete={() => { props.openModalDelete() }}

                                    editText={!editMode && "Editar"}
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

export default ModalUser
