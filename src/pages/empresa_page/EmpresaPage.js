import React from "react";
import ChatAvatar from "pages/main_page/Components/ChatAvatar";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { deleteCompany, findCompany } from 'services/actions/CompanyAction';
import { showBackdrop } from 'services/actions/CustomAction';
import { useHistory, useParams } from "react-router-dom";
import { listUsersByCompany } from "services/actions/UserAction";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import CustomTable from 'components/CustomTable';
import config from 'config/Config';

const useStyles = makeStyles((theme) => ({
    textHeader: {
        margin: '0px',
        fontWeight: 'bold',
        color:'white'
    }
}));

const columns = [
    { type: 'text', field: 'firstName', label: 'Nombres', minWidth: 250 },
    { type: 'text', field: 'lastName', label: 'Apellidos', minWidth: 250 },
    { type: 'text', field: 'type', label: 'Cargo', minWidth: 250 },
    { type: 'text', field: 'phone', label: 'N° Celular', minWidth: 170 },
    { type: 'text', field: 'email', label: 'Email', minWidth: 250 },
];

const EmpresaPage = props => {
    const classes = useStyles();
    const history = useHistory();

    const [company, setCompany] = React.useState({});
    const [users, setUsers] = React.useState([]);
    const { companyId } = useParams();

    React.useEffect(() => {
        if(!companyId) {
            return history.push("/inicio");
        }
        
        props.dispatch(showBackdrop(true));
        props.dispatch(findCompany(companyId)).then(res => {
            setCompany(res || []);
            props.dispatch(showBackdrop(false));
            onListUsers();
        }).catch(err => props.dispatch(showBackdrop(false)));
    }, [props.location.pathname]);

    const onListUsers = async () => {
        props.dispatch(showBackdrop(true));
        await props.dispatch(listUsersByCompany(companyId)).then(res => {
            setUsers(res || []);
            props.dispatch(showBackdrop(false));
        }).catch(err => props.dispatch(showBackdrop(false)));
    }

    return (
        <Grid container>
            <Grid item xs={12} className="top-header">
                <Grid style={{padding: '1vh 2vh'}}>
                    <ChatAvatar
                        isOnline="active"
                        image={company.avatar ? (config.api+company.avatar) :"https://images.assetsdelivery.com/compings_v2/triken/triken1608/triken160800029.jpg"}
                        imgClassName="avatar-header"
                    />
                </Grid>
                <Grid>
                    <Typography className={classes.textHeader} style={{fontSize:'150%'}}>{company.name}</Typography>
                    <Typography className={classes.textHeader}><small>{users.length} trabajadores</small></Typography>
                </Grid>
            </Grid>

            {
                company.description && (
                    <Grid item xs={12} style={{margin: '3vh 0', padding: '1vh 5vh'}}>
                        <Typography variant="h5" gutterBottom style={{fontWeight:'bold'}}>Descripción de la Empresa</Typography>
                        <Typography variant="body1" style={{width:'100%'}}> {company.description || ""} </Typography >
                    </Grid>
                )
            }
            <Grid item xs={12} style={{padding: '1vh 5vh'}}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: '2px 2px 30px 2px' }}
                    size='large'
                    endIcon={<NotificationsActiveIcon />}
                >
                    Enviar Notificación
                </Button>
                <Typography variant="h4" gutterBottom align='left' style={{color:'black',fontWeight:'bold'}}>Lista de trabajadores</Typography>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        rows={users}  
                    > 
                    </CustomTable>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default EmpresaPage;