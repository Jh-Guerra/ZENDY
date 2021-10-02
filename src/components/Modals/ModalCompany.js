import { Grid, Divider, Avatar, Button } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import ModalFooter from './common/ModalFooter';
import { AccountCircle } from '@material-ui/icons';
import BusinessIcon from '@material-ui/icons/Business';
import { Form, Formik } from 'formik';
import CustomInput from 'components/CustomInput';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import { onlyNumbers, trimObject } from 'utils/common';
import PhoneIcon from '@material-ui/icons/Phone';
import { createCompany, deleteImageCompany, findCompany, updateCompany } from 'services/actions/CompanyAction';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import { showBackdrop } from 'services/actions/CustomAction';
import defaultCompany from 'assets/images/defaultCompany.png';
import config from 'config/Config';
import GetAppIcon from '@material-ui/icons/GetApp';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOff';

const ModalCompany = (props) => {
    
    const { open, handleClose, company } = props;

    const [data, setData] = React.useState({
        id: "",
        name: "",
        address: "",
        ruc: "",
        adminName: "",
        email: "",
        phone: "",
        logo: "",
        currentBytes: 0,
        maxBytes: 0,
        avatar: "",
        description: "",
    });

    const [title, setTitle] = React.useState("Agregar Empresa");
    const [icon, setIcon] = React.useState(<BusinessIcon />);
    const [editMode, setEditMode] = React.useState(false);
    const [fileUrl, setFileUrl] = React.useState(null);

    React.useEffect(() => {
        if(open){
            if(company && company.id){
                // Ver el detalle de una empresa
                setData(company);
                setTitle("Detalle de la Empresa");
                setIcon(<AssignmentIndIcon />);
                setEditMode(false);
            }else{
                // Crear una nueva empresa
                setData({
                    id: "",
                    name: "",
                    address: "",
                    ruc: "",
                    adminName: "",
                    email: "",
                    phone: "",
                    logo: "",
                    currentBytes: 0,
                    maxBytes: 0,
                    avatar: "",
                    description:""
                });
                setTitle("Agregar empresa");
                setIcon(<BusinessIcon />);
                setEditMode(true);
            }
            setFileUrl(null)
        }
    }, [open]);

    const validateForm = company => {
        const errors = {};
        company = trimObject(company);
        if (!company.name) 
            errors.name = true;
        
        if (!company.address)
            errors.address = true;

        if (!company.adminName)
            errors.adminName = true;
            
        if (!company.email)
            errors.email = true;

        if (!company.phone)
            errors.phone = true;

        if (!company.maxBytes) 
            errors.maxBytes = true;

        return errors;
    };

    const onSubmit = (company, { setSubmitting }) => {
        props.dispatch(showBackdrop(true));
        if(company.id){
            // Editar
            const fileInput = document.querySelector('#icon-button-file') ;
            const formData = new FormData();
            formData.append('image', fileInput.files[0]);
            formData.append('name', company.name);
            formData.append('address', company.address);
            formData.append('email', company.email);
            formData.append('adminName', company.adminName);
            formData.append('ruc', company.ruc);
            formData.append('phone', company.phone);
            formData.append('maxBytes', company.maxBytes);
            formData.append('description', company.description);
            formData.append('currentBytes', company.currentBytes);
            formData.append('oldImage', data.avatar);

                // Editar
                props.dispatch(updateCompany(data.id, formData)).then(res => {
                    props.dispatch(showBackdrop(false));
                    props.onConfirmCallBack();
                }).catch(error => {
                    props.dispatch(showBackdrop(false));
                });                
        }else{
            // Agregar
            const fileInput = document.querySelector('#icon-button-file') ;
            const formData = new FormData();
            formData.append('image', fileInput.files[0]);
            formData.append('name', company.name);
            formData.append('address', company.address);
            formData.append('email', company.email);
            formData.append('adminName', company.adminName);
            formData.append('ruc', company.ruc);
            formData.append('phone', company.phone);
            formData.append('maxBytes', company.maxBytes);
            formData.append('description', company.description);
            formData.append('currentBytes', company.currentBytes);

            // Agregar
            props.dispatch(createCompany(formData)).then(res => {
               props.dispatch(showBackdrop(false));
               props.onConfirmCallBack();
           }).catch(error => {
               props.dispatch(showBackdrop(false));
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
        setTitle("Editar Empresa");
        setIcon(<EditIcon />);
    }

    const deleteImage = (Link,id) => {
        props.dispatch(deleteImageCompany(Link,id)).then(res => {
          if(res.company){
            setFileUrl(null)
            setData({...data,avatar:null})
          }});
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
                <Formik enableReinitialize validateOnMount initialValues={data} validate={values => validateForm(values)} onSubmit={onSubmit}>
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue}) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="name"
                                            label={<p>Nombre *</p>}
                                            inputType="inputText"
                                            onChange={handleChange}
                                            value={values.name}
                                            error={ errors.name && touched.name ? true : false }
                                            icon={<BusinessIcon />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="address"
                                            inputType="inputText"
                                            label={<p>Dirección *</p>}
                                            onChange={handleChange}
                                            value={values.address}
                                            error={ errors.address && touched.address ? true : false }
                                            icon={<HomeIcon />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="email"
                                            inputType="inputText"
                                            label={<p>Correo Electrónico *</p>}
                                            onChange={handleChange}
                                            value={values.email}
                                            error={ errors.email && touched.email ? true : false }
                                            icon={<AlternateEmailIcon />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomInput
                                            id="phone"
                                            inputType="inputText"
                                            label={<p>N° Celular *</p>}
                                            onChange={(event) => { 
                                                setFieldValue("phone", onlyNumbers(Math.max(0, parseInt(event.target.value)).toString().slice(0,15)))
                                            }}
                                            value={values.phone}
                                            error={ errors.phone && touched.phone ? true : false }
                                            icon={<PhoneIcon />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomInput
                                            id="maxBytes"
                                            inputType="inputText"
                                            label={<p>Mbsmáximos *</p>}
                                            onChange={(event) => { 
                                                setFieldValue("maxBytes", onlyNumbers(event.target.value))
                                            }}
                                            value={values.maxBytes}
                                            error={ errors.maxBytes && touched.maxBytes ? true : false }
                                            icon={<PhoneIcon />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="ruc"
                                            label={<p>RUC</p>}
                                            inputType="inputText"
                                            onChange={handleChange}
                                            value={values.ruc}
                                            error={ errors.ruc && touched.ruc ? true : false }
                                            icon={<AccountBalanceIcon />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="adminName"
                                            label={<p>Administrador *</p>}
                                            inputType="inputText"
                                            onChange={handleChange}
                                            value={values.adminName}
                                            error={ errors.adminName && touched.adminName ? true : false }
                                            icon={<AccountCircle />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="description"
                                            label={<p>Descripción</p>}
                                            inputType="textArea"
                                            onChange={handleChange}
                                            value={values.description}
                                            error={ errors.description && touched.description ? true : false }
                                            disabled={!editMode}
                                        />
                                    </Grid>
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
                                                    <input id="icon-button-file" accept="image/*" type="file" onChange={processImage} />
                                                </Button>
                                            </Grid>
                                        )
                                    }
                                    <Grid container item xs={12} justify = "center">
                                        <Avatar 
                                            style={{height:140, width:140, display:fileUrl || (company.id && company.avatar) ? "flex" : "none"}} 
                                            src={fileUrl ? fileUrl : (data.avatar ? (config.api+data.avatar) : defaultCompany)}
                                        />
                                        {
                                            editMode && <HighlightOffTwoToneIcon fontSize="medium" style={{color: 'red', display:fileUrl || (company.id && company.avatar) ? "flex" : "none"}} onClick={() => { deleteImage( (data.avatar && (data.avatar).substr(8)),data.id)  }}/>
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

export default ModalCompany
