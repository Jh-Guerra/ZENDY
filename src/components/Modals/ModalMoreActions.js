import { Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PeopleIcon from '@material-ui/icons/People';
import CustomButton from "components/CustomButton";
import { successButtonColor } from 'assets/styles/zendy-css';
import BusinessIcon from '@material-ui/icons/Business';
import { checkPermission } from 'utils/common';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const ModalMoreActions = (props) => {
    
    const classes = useStyles();
    const { open, handleClose, handleChangeTab, session, secondSections, getIcon } = props;

    const role = session && session.role && session.role.name || {};
     
    return (
        <Modal 
            open={open} 
            handleClose={handleClose} 
            size="xs" 
        >
            <ModalHeader 
                icon={<MoreVertIcon />}
                text="Más opciones..."
            />

            <ModalBody>
                <Grid container spacing={1}>
                    <Grid item xs={12}>

                    {
                    secondSections && secondSections.map((section,index)=>{
                      return (
           
                        <CustomButton 
                            variant="contained"
                            fullWidth
                            className={classes.button}
                            startIcon={getIcon(section.icon)}
                            color={successButtonColor}
                            style={{display: !section.icon ? "none" : "inline-flex"}}
                            onClick={() => {
                                handleClose();
                                handleChangeTab(null, index + 4);
                            }}
                        >
                            {section.title}
                        </CustomButton>
                     );
                    })
                  }
                                           {
                        checkPermission(session, "showCompanyUsersCrud") && (role == 'AdminEmpresa' ) && (
                            <Grid item xs={12}>
                                <CustomButton 
                                    variant="contained"
                                    fullWidth
                                    className={classes.button}
                                    startIcon={<PeopleIcon />}
                                    color={successButtonColor}
                                    onClick={() => { props.goToView && props.goToView("usuarios-empresa") }}
                                >
                                    Usuarios
                                </CustomButton>
                            </Grid>
                        )
                     }
                    {
                        checkPermission(session, "showCompanyCrud") && (
                            <Grid item xs={12}>
                                <CustomButton 
                                    variant="contained"
                                    fullWidth
                                    className={classes.button}
                                    startIcon={<BusinessIcon />}
                                    color={successButtonColor}
                                    onClick={() => { props.goToView && props.goToView("empresas") }}
                                >
                                    Empresas
                                </CustomButton>
                            </Grid>
                        )
                     }
                    </Grid>
                  
                </Grid>
            </ModalBody>
        </Modal>
    )
}

export default ModalMoreActions