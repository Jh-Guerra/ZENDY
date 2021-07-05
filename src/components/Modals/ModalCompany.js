import { Grid, Divider } from '@material-ui/core';
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
import { createCompany, updateCompany } from 'services/actions/CompanyAction';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';

const ModalCompany = (props) => {
    
    const { open, handleClose, company } = props;

    const [data, setData] = React.useState({
        id: "",
        name: "",
        address: "",
        adminName: "",
        email: "",
        phone: "",
        logo: "",
        currentBytes: 0,
        maxBytes: 0
    });

    const [title, setTitle] = React.useState("Agregar Empresa");
    const [icon, setIcon] = React.useState(<BusinessIcon />);
    const [editMode, setEditMode] = React.useState(false);

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
                    adminName: "",
                    email: "",
                    phone: "",
                    logo: "",
                    currentBytes: 0,
                    maxBytes: 0
                });
                setTitle("Agregar empresa");
                setIcon(<BusinessIcon />);
                setEditMode(true);
            }
        }
    }, [open]);

    const validateForm = company => {
        const errors = {};
        company = trimObject(company);
        if (!company.name) 
            errors.name = 'Nombre requerido';
        
        if (!company.address)
            errors.address = 'Dirección requerido'

        if (!company.adminName)
            errors.adminName = 'Administrador requerido'
            
        if (!company.email)
            errors.email = 'Correo electrónico requerido'

        if (!company.phone)
            errors.phone = 'N° Celular requerido'

        if (!company.maxBytes) 
            errors.maxBytes = 'Mbs requeridos';

        return errors;
    };

    const onSubmit = (company, { setSubmitting }) => {
        props.showBackdrop(true);
        if(company.id){
            // Editar
            props.dispatch(updateCompany(company.id, company)).then(res => {
                props.showBackdrop(false);
                props.onConfirmCallBack();
            }).catch(error => {
                props.showBackdrop(false);
                console.error('error', error);
            });
        }else{
            // Agregar
            props.dispatch(createCompany(company)).then(res => {
                props.showBackdrop(false);
                props.onConfirmCallBack();
            }).catch(error => {
                props.showBackdrop(false);
                console.error('error', error);
            });
        }
    }

    const onEdit = () => {
        setEditMode(true);
        setTitle("Editar Empresa");
        setIcon(<EditIcon />);
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
                <Formik enableReinitialize initialValues={data} validate={values => validateForm(values)} onSubmit={onSubmit}>
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue}) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="name"
                                            label="Nombre"
                                            inputType="inputText"
                                            onChange={handleChange}
                                            value={values.name}
                                            error={ errors.name && touched.name ? true : false }
                                            helperText={ errors.name && touched.name && errors.name }
                                            icon={<BusinessIcon />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="address"
                                            inputType="inputText"
                                            label="Dirección"
                                            onChange={handleChange}
                                            value={values.address}
                                            error={ errors.address && touched.address ? true : false }
                                            helperText={ errors.address && touched.address && errors.address }
                                            icon={<HomeIcon />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="email"
                                            inputType="inputText"
                                            label="Correo Electrónico"
                                            onChange={handleChange}
                                            value={values.email}
                                            error={ errors.email && touched.email ? true : false }
                                            helperText={ errors.email && touched.email && errors.email }
                                            icon={<AlternateEmailIcon />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomInput
                                            id="phone"
                                            inputType="inputText"
                                            label="N° Celular"
                                            onChange={(event) => { 
                                                setFieldValue("phone", onlyNumbers(event.target.value))
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
                                            id="adminName"
                                            label="Administrador"
                                            inputType="inputText"
                                            onChange={handleChange}
                                            value={values.adminName}
                                            error={ errors.adminName && touched.adminName ? true : false }
                                            helperText={ errors.adminName && touched.adminName && errors.adminName }
                                            icon={<AccountCircle />}
                                            disabled={!editMode}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomInput
                                            id="maxBytes"
                                            inputType="inputText"
                                            label="Mbsmáximos"
                                            onChange={(event) => { 
                                                setFieldValue("maxBytes", onlyNumbers(event.target.value))
                                            }}
                                            value={values.maxBytes}
                                            error={ errors.maxBytes && touched.maxBytes ? true : false }
                                            helperText={ errors.maxBytes && touched.maxBytes && errors.maxBytes }
                                            icon={<PhoneIcon />}
                                            disabled={!editMode}
                                        />
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