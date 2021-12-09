import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getSessionInfo } from "utils/common";
import BusinessIcon from '@material-ui/icons/Business';
import { listCompaniesHelpdesk } from 'services/actions/CompanyAction';
import { showBackdrop } from 'services/actions/CustomAction';
import { changeHelpDesk } from 'services/actions/UserAction';

const ModalHelpDesks = (props) => {
    const { open, handleClose } = props;
    const session = getSessionInfo();
    const user = session && session.user || {};

    const [companiesHD, setCompaniesHD] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
      onListCompaniesHD();
    }, [open]);

    const onListCompaniesHD = () => {
        props.dispatch(listCompaniesHelpdesk()).then(res => {
            setCompaniesHD(res);
        });
    };

    const onSelectHelpDesk = (helpDesk) => {
        props.dispatch(changeHelpDesk(session.user.id, helpDesk)).then((res) => {
            props.dispatch(showBackdrop(true));
            localStorage.setItem("session", JSON.stringify(res.data));
            props.handleClose();
            props.dispatch(showBackdrop(false));         
            window.location.reload();
        });
       
    }

    return (
        <Modal
            open={open}
            handleClose={handleClose}
            size="sm"
            style={{minHeight: '100%', minWidth: '100%'}}
        >
            <ModalHeader
                icon={<BusinessIcon />}
                text="Mesas de Ayuda"
            />

            <ModalBody>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box textAlign="center">
                            <Typography gutterBottom>Seleccione la Mesa de Ayuda a la que desea cambiarse</Typography> 
                        </Box>
                    </Grid>
                    <Grid item xs={12}>            
                        {
                            companiesHD.map((helpDesk, i) => {
                                return (
                                    <List key={i} style={{padding: "0px", maxHeight: "550px", overflow: "auto"}}>
                                        <ListItem key={i} button divider onClick={() => { onSelectHelpDesk(helpDesk) }} disabled={user.idHelpDesk == helpDesk.id}>
                                            <ListItemText
                                                primary={helpDesk.name}
                                                secondary={user.idHelpDesk == helpDesk.id ? "Se ubica en esta mesa de ayuda" : null}
                                            />
                                        </ListItem>
                                    </List>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </ModalBody>
      </Modal>
    )
}

export default ModalHelpDesks