import { Grid, Divider } from '@material-ui/core';
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
import { onlyNumbers, trimObject, userTypes } from 'utils/common';
import PhoneIcon from '@material-ui/icons/Phone';
import BusinessIcon from '@material-ui/icons/Business';
import { createUser } from 'services/actions/UserAction';

const ModalUser = (props) => {
    
    const { open, handleClose } = props;

    const [data, setData] = React.useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dob: new Date(),
        phone: "",
        type: "User",
        company: ""
    });

    const validateForm = user => {
        const errors = {};
        user = trimObject(user);
        if (!user.firstName) 
            errors.firstName = 'Nombre requerido';
        
        if (!user.lastName)
            errors.lastName = 'Apellido requerido'

        if (!user.email)
            errors.email = 'Correo requerido'

        if (!user.password)
            errors.password = 'Contraseña requerida'

        if (!user.dob)
            errors.dob = 'Fecha de Nacimiento requerido'

        if (!user.phone)
            errors.phone = 'N° celular requerido'

        if (!user.type)
            errors.type = 'Tipo de Usuario requerido'

        if (user.type != 'Admin' && !user.company)
            errors.company = 'Empresa requerida'

        return errors;
    };

    const onSubmit = (user, { setSubmitting }) => {
        props.showBackdrop(true);
        props.dispatch(createUser(user)).then(res => {
            props.showBackdrop(false);
            props.onConfirmCallBack();
        }).catch(error => {
            props.showBackdrop(false);
            console.error('error', error);
        });
    }

    return (
        <Modal 
            open={open} 
            handleClose={handleClose} 
            size="sm"
        >
            <ModalHeader 
                icon={<PersonAddIcon />}
                text="Nuevo Usuario"
            />

            <ModalBody>
                <Formik enableReinitialize initialValues={data} validate={values => validateForm(values)} onSubmit={onSubmit}>
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue}) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="firstName"
                                            label="Nombre"
                                            inputType="inputText"
                                            onChange={handleChange}
                                            value={values.firstName}
                                            error={ errors.firstName && touched.firstName ? true : false }
                                            helperText={ errors.firstName && touched.firstName && errors.firstName }
                                            icon={<AccountCircle />}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="lastName"
                                            inputType="inputText"
                                            label="Apellido"
                                            onChange={handleChange}
                                            value={values.lastName}
                                            error={ errors.lastName && touched.lastName ? true : false }
                                            helperText={ errors.lastName && touched.lastName && errors.lastName }
                                            icon={<AccountCircle />}
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
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomInput
                                            id="password"
                                            inputType="inputText"
                                            label="Contraseña"
                                            type="password"
                                            onChange={handleChange}
                                            value={values.password}
                                            error={ errors.password && touched.password ? true : false }
                                            helperText={ errors.password && touched.password && errors.password }
                                            icon={<LockIcon />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomInput
                                            id="dob"
                                            inputType="inputDate"
                                            label="Fecha de Nacimiento"
                                            onChange={(date) => {
                                                setFieldValue("dob", date);
                                            }}
                                            value={values.dob}
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
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                       <CustomInput 
                                            id="type"
                                            inputType="select"
                                            label="Tipo de Usuario"
                                            onChange={(event) => {
                                                setFieldValue("type", event.target.value)
                                            }}
                                            value={values.type}
                                            options={userTypes}
                                       />
                                    </Grid>
                                    {
                                        values.type != 'Admin' && (
                                            <Grid item xs={12}>
                                                <CustomInput
                                                    id="company"
                                                    inputType="inputText"
                                                    label="Empresa"
                                                    onChange={handleChange}
                                                    value={values.company}
                                                    error={ errors.company && touched.company ? true : false }
                                                    helperText={ errors.company && touched.company && errors.company }
                                                    icon={<BusinessIcon />}
                                                />
                                            </Grid>
                                        )
                                    }
                                </Grid>
                                
                                <Divider style={{marginTop:"20px"}} />

                                <ModalFooter
                                    confirmText={"Guardar"}
                                    buttonType={"submit"}
                                    cancelText={"Cancelar"}
                                    onCancel={handleClose}
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
