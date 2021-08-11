import React from "react";
import ChatAvatar from "pages/main_page/Components/ChatAvatar";
import { Button, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import { deleteCompany, findCompany, listCompanies } from 'services/actions/CompanyAction';
import { showBackdrop } from 'services/actions/CustomAction';
import { useParams } from "react-router-dom";
import { listUsersByCompany } from "services/actions/UserAction";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import CustomTable from 'components/CustomTable';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import config from 'config/Config';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    Header: {
        height: '110px',
        minHeight:'110px',
        maxHeight:'110px',
        width: '100%',
        background: "#303e7a",
        display: 'flex',
        justifyContent: 'center'
    },
    img: {
        padding: '1vh 2vh'
    },
    description: {
        margin: '1vh',  
        height: '50px'
    },
    textDescription: {
        fontSize: '150%',
        margin: '0px',
        fontWeight: 'bold',
        color:'white'
    },
    Body: {
        marginTop: '5vh',
        height: '150px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    contentButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center'
    },
    button: {
        width: '50%',
        border: '3px solid',
        borderRadius: '30px',
        padding: '1vh',
        margin: '1vh 0vh',
        color: 'white',
        fontSize: '1.8vh',
        fontWeight: 'bold'
    },
    contentText: {
        padding: '1vh 25vh 1vh 10vh',
        textAlign: 'justifyContent',
        color: 'black',
        with:'100%'       
    },
    table: {
        Width: '100%',
        maxHeight: '10%',
        color: 'white',
        padding: '1vh 25vh 1vh 10vh',
    },
    TableHead: {
        background: 'lightgrey'
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

    const [companies, setCompanies] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const { companyId } = useParams();

    React.useEffect(() => {
        onListCompanies();
    }, [props.location.pathname]);

    const onListCompanies = async () => {
        props.dispatch(showBackdrop(true));
        await props.dispatch(findCompany(companyId)).then(res => {
            setCompanies(res || []);
        });
        await props.dispatch(listUsersByCompany(companyId)).then(res => {
            setUsers(res || []);
        });
        props.dispatch(showBackdrop(false));
    }

    return (
        <Grid container className={classes.root, 'container-chat-empresa'} direction="column" style={{backgroundColor:'white'}}>
            <Grid container className={classes.Header}>
                <Grid className={classes.img}>
                    <ChatAvatar
                        isOnline="active"
                        image={companies.avatar != "" ? (config.api+companies.avatar) :"https://images.assetsdelivery.com/compings_v2/triken/triken1608/triken160800029.jpg"}
                        imgClassName="avatar-header"
                    />
                </Grid>
                <Grid className={classes.description}>
                    <Typography className={classes.textDescription}>{companies.name}</Typography>
                    <Typography className={classes.textDescription}>{users.length} trabajadores</Typography>
                </Grid>
            </Grid>
            <Grid className={classes.Body}>
                <Grid item className={classes.contentText} xs={12}>
                    <Typography variant="h5" gutterBottom style={{fontWeight:'bold'}}>Descripción de la Empresa</Typography>
                    <Typography variant="body1" style={{width:'100%'}}>"Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"</Typography >
                </Grid>
            </Grid>
            <Grid className={classes.table} xs={12} >
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