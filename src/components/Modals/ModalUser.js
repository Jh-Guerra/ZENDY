import { Grid, Divider, Avatar } from '@material-ui/core';
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
import { createUser, updateUser,uploadImage} from 'services/actions/UserAction';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EditIcon from '@material-ui/icons/Edit';
import { showBackdrop } from 'services/actions/CustomAction';
import { listCompanies } from 'services/actions/CompanyAction';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const ModalUser = (props) => {
    
    const { open, handleClose, user } = props;

    const [data, setData] = React.useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dob: new Date(),
        phone: "",
        type: "User",
        idCompany: ""
    });

    const [title, setTitle] = React.useState("Agregar Usuario");
    const [icon, setIcon] = React.useState(<PersonAddIcon />);
    const [editMode, setEditMode] = React.useState(false);
    const [companies, setCompanies] = React.useState([]);

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
                    phone: "",
                    type: "User",
                    idCompany: ""
                });
                setTitle("Agregar usuario");
                setIcon(<PersonAddIcon />);
                setEditMode(true);
            }
            props.dispatch(listCompanies()).then(response =>{
                setCompanies(response)
            })
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

        if (!user.type)
            errors.type = 'Tipo de Usuario requerido'

        if (user.type != 'Admin' && !user.idCompany)
            errors.idCompany = 'Empresa requerida'

        return errors;
    };

        //upload image
        const fileSelectedHandler =(file)=>{
            setData({image:file[0]})
        }
    
        const handleSubmitImage =(event)=>{
            
            const fileInput = document.querySelector('#icon-button-file') ;
            const formData = new FormData();
            formData.append('image', fileInput.files[0]);
            console.log('image', fileInput.files[0])
            fetch('http://127.0.0.1:8000/api/users/upload', {
              method: 'POST',
              body: formData
            })
            .then(res => res.json())
            .then(data => {
                console.log('data',data)
            })
      
        }

    const onSubmit = (user, { setSubmitting }) => {
        props.dispatch(showBackdrop(true));
        if(user.id){
            // Editar
            props.dispatch(updateUser(user.id, user)).then(res => {
                props.dispatch(showBackdrop(false));
                props.onConfirmCallBack();
            }).catch(error => {
                props.dispatch(showBackdrop(false));
                console.error('error', error);
            });
        }else{
            // Agregar
            handleSubmitImage()
            props.dispatch(createUser(user)).then(res => {
                props.dispatch(showBackdrop(false));
                props.onConfirmCallBack();
            }).catch(error => {
                props.dispatch(showBackdrop(false));
                console.error('error', error);
            });
        }
    }

    const onEdit = () => {
        setEditMode(true);
        setTitle("Editar Usuario");
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
                                            id="firstName"
                                            label="Nombre"
                                            inputType="inputText"
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
                                            inputType="inputText"
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
                                    {
                                        !data.id && editMode && (
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
                                                    disabled={!editMode}
                                                />
                                            </Grid>
                                        )
                                    }
                                    <Grid item xs={12} md={6}>
                                        <CustomInput
                                            id="dob"
                                            inputType="inputDate"
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
                                            inputType="inputText"
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
                                            id="type"
                                            inputType="select"
                                            label="Tipo de Usuario"
                                            onChange={(event) => {
                                                setFieldValue("type", event.target.value)
                                            }}
                                            value={values.type}
                                            options={userTypes}
                                            disabled={!editMode}
                                       />
                                    </Grid>
                                    {
                                        values.type != 'Admin' && (
                                            <Grid item xs={12}>
                                                <CustomInput
                                                    id="idCompany"
                                                    inputType="select2"
                                                    label="Empresa"
                                                    onChange={(event) => {
                                                        setFieldValue("idCompany", event.target.value)
                                                    }}
                                                    value={values.idCompany}
                                                    options={companies}
                                                    disabled={!editMode}
                                                />
                                            </Grid>
                                        )
                                    }

                                    <Grid item xs={12} md={8}>
                                        <input accept="image/*" id="icon-button-file" type="file" onchange={e => fileSelectedHandler(e.target.files)}
                                         ref={fileInput => fileInput = fileInput} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Avatar variant="rounded" style={{height:100, width:100}} src="*"/>
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
