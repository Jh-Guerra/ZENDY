import { Grid, Divider, Avatar, Button, Checkbox, FormControlLabel } from '@material-ui/core';
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
import { createCompany, deleteImageCompany, findCompany, listCompaniesHelpdesk, updateCompany, updateHelpDeskCompany } from 'services/actions/CompanyAction';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import defaultCompany from 'assets/images/defaultCompany.png';
import config from 'config/Config';
import GetAppIcon from '@material-ui/icons/GetApp';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOff';

const ModalCompany = (props) => {
    
    const { open, handleClose, company, isHD } = props;

    const [data, setData] = React.useState({
        id: "",
        name: "",
        address: "",
        ruc: "",
        adminName: "",
        email: "",
        phone: "",
        logo: "",
        avatar: "",
        description: "",
    });

    const [title, setTitle] = React.useState("Agregar Empresa");
    const [icon, setIcon] = React.useState(<BusinessIcon />);
    const [editMode, setEditMode] = React.useState(false);
    const [fileUrl, setFileUrl] = React.useState(null);
    const [companies, setCompanies] = React.useState([]);
    const [companySearch, setCompanySearch] = React.useState("");
    const [isHelpDesk, setIsHelpDesk] =React.useState(false);

    React.useEffect(() => {
        if(open){
            if(company && company.id){
                // Ver el detalle de una empresa
                setData({
                    ...company,
                    helpDesks: getCustomCompanies(company.mappedCompanies || []),
                    isHelpDesk: onChangeCheck(company.isHelpDesk)
                });
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
                    avatar: "",
                    description:"",
                    helpDesks: [],
                });
                setTitle("Agregar empresa - " + (isHD ? "Mesa de Ayuda" : "Cliente"));
                setIcon(<BusinessIcon />);
                setEditMode(true);
                setIsHelpDesk(false);
            }
            setFileUrl(null)
            props.dispatch(listCompaniesHelpdesk()).then(response =>{
                setCompanies(response);
            }).catch(err => props.dispatch(showBackdrop(false)));
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

        if (!company.ruc) 
            errors.ruc = 'RUT es requerido'

        return errors;
    };

    const onSubmit = (company, { setSubmitting }) => {
        props.dispatch(showBackdrop(true));
        if(company.id){
            // Editar
            const fileInput = document.querySelector('#image') ;
            const formData = new FormData();
            formData.append('image', fileInput.files[0]);
            formData.append('name', company.name);
            formData.append('address', company.address);
            formData.append('email', company.email);
            formData.append('adminName', company.adminName);
            formData.append('ruc', company.ruc);
            formData.append('phone', company.phone);
            if(company.description) formData.append('description', company.description);
            formData.append('oldImage', data.avatar);
            formData.append('isHelpDesk', isHelpDesk);
            for (var i = 0; i < company.helpDesks.length; i++) {
                formData.append('helpDesks[]',company.helpDesks[i].id);
            }

                // Editar
                props.dispatch(updateCompany(data.id, formData)).then(res => {
                    props.dispatch(showBackdrop(false));
                    props.dispatch(showSnackBar('success', isHD ? 'Mesa de Ayuda actualizada' : 'Empresa actualizada'));
                    props.onConfirmCallBack();
                    validateIsHelpdesk(data.id);
                }).catch(error => {
                    props.dispatch(showBackdrop(false));
                });                
        }else{
            // Agregar
            const fileInput = document.querySelector('#image') ;
            const formData = new FormData();
            formData.append('image', fileInput.files[0]);
            formData.append('name', company.name);
            formData.append('address', company.address);
            formData.append('email', company.email);
            formData.append('adminName', company.adminName);
            formData.append('ruc', company.ruc);
            formData.append('phone', company.phone);
            if(company.description) formData.append('description', company.description);
            formData.append('isHelpDesk', isHelpDesk);
            for (var i = 0; i < company.helpDesks.length; i++) {
                formData.append('helpDesks[]',company.helpDesks[i].id);
            }

            // Agregar
            props.dispatch(createCompany(formData)).then(res => {
               props.dispatch(showBackdrop(false));
               props.dispatch(showSnackBar('success', isHD ? 'Mesa de Ayuda registrada' : 'Empresa registrada'));
               props.openModalNext(res);
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
        setTitle("Editar Empresa - " + (isHD ? "Mesa de Ayuda" : "Cliente"));
        setIcon(<EditIcon />);
    }

    const validateIsHelpdesk = (idCompany) => {
        const { company } = props;
        if(company.isHelpDesk != isHelpDesk){
            props.dispatch(updateHelpDeskCompany(idCompany))
        }
    }

    const deleteImage = (Link, id, values) => {
        if(id && values.avatar){
          props.dispatch(deleteImageCompany(Link,id)).then(res => {
            if(res.company){
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

    const onChangeCheck = (value) => {
        if(value == 0){
            setIsHelpDesk(false)
        }else if (value == 1) {
            setIsHelpDesk(true)
        } else {
            setIsHelpDesk(!isHelpDesk)
        }
    }
      
    const getCustomCompanies = (originalCompanies) => {
        return originalCompanies ? originalCompanies.map(company => ({id: company.id, name: company.name})) : [];
    }
    const customCompanies = getCustomCompanies(companies || []);

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
                                            custom="inputText"
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
                                            custom="inputText"
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
                                            custom="inputText"
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
                                            custom="inputText"
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
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="ruc"
                                            label={<p>RUT *</p>}
                                            custom="inputText"
                                            onChange={handleChange}
                                            value={values.ruc || ""}
                                            error={ errors.ruc && touched.ruc ? true : false }
                                            icon={<AccountBalanceIcon />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="adminName"
                                            label={<p>Administrador *</p>}
                                            custom="inputText"
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
                                            custom="textArea"
                                            onChange={handleChange}
                                            value={values.description || ""}
                                            error={ errors.description && touched.description ? true : false }
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    {
                                        isHD && (
                                            <Grid item xs={12}>
                                                <FormControlLabel
                                                    value="isHelpDesk"
                                                    control={<Checkbox color="primary" checked={isHelpDesk}/>}
                                                    onChange={(event) => { onChangeCheck() }}
                                                    label="Is Help Desk"
                                                    disabled={!editMode}
                                                />
                                            </Grid>
                                        )
                                    }
                                    {
                                        !isHD && !isHelpDesk && (
                                            <Grid item xs={12}>
                                                <CustomInput
                                                    id="helpDesks"
                                                    custom="multiAutocomplete"
                                                    label="Help Desk"
                                                    onChange={(event, newValues) => {
                                                        setFieldValue("helpDesks", newValues)
                                                    }}
                                                    onInputChange={(event, newInputValue) => {
                                                        setCompanySearch(newInputValue);
                                                    }}
                                                    value={values.helpDesks}
                                                    inputValue={companySearch}
                                                    options={customCompanies}
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
                                        <Grid container item xs={12} justify = "center">
                                            <Avatar 
                                                style={{height:140, width:140, display:fileUrl || (company.id && company.avatar) ? "flex" : "none"}} 
                                                src={fileUrl ? fileUrl : (data.avatar ? (config.api+data.avatar) : defaultCompany)}
                                            />
                                            {
                                                editMode && values.avatar && <HighlightOffTwoToneIcon style={{color: 'red', display:fileUrl || (company.id && company.avatar) ? "flex" : "none"}} onClick={() => { deleteImage( (data.avatar && (data.avatar).substr(8)), data.id, values)  }}/>
                                            }
                                        </Grid>
                                </Grid>
                                
                                <Divider style={{marginTop:"20px"}} />
                                <ModalFooter
                                    buttonType={"submit"}

                                    cancelText={editMode && "Cancelar"}
                                    onCancel={handleClose}

                                    confirmText={editMode && (company && company.id ? "Actualizar" : "Guardar y Continuar")}
                                    
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
