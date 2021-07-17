import React from "react";
import ChatAvatar from "pages/main_page/Components/ChatAvatar";
import { Button, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import { deleteCompany, findCompany, listCompanies } from 'services/actions/CompanyAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import { useParams } from "react-router-dom";
import { findUserByIdCompany } from "services/actions/UserAction";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    Header: {
        height: '110px',
        width: '100%',
        background: "white",
        display: 'flex',
        justifyContent: 'center'
    },
    img: {
        padding: '1vh 2vh'
    },
    description: {
        margin: '1vh'
    },
    textDescription: {
        fontSize: '3.2vh',
        margin: '0px',
        fontWeight: 'bold'
    },
    Body: {
        marginTop: '5vh',
        height: '18%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    contentButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        width: '50%',
        border: '3px solid',
        background: 'transparent',
        borderRadius: '50px',
        padding: '1vh',
        margin: '1vh 0vh',
        color: 'white',
        fontSize: '1.8vh',
        fontWeight: 'bold'
    },
    contentText: {
        color: 'white',
        padding: '1vh 20vh 1vh 0vh'
    },
    table: {
        Width: '100%',
        marginTop: '4vh',
        minHeight: '60%',
        maxHeight: '60%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '0vh 15vh'
    },
    TableHead: {
        background: 'lightgrey'
    }
}));

const EmpresaPage = props => {
    const classes = useStyles();

    const [companies, setCompanies] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const { empresaId } = useParams();

    React.useEffect(() => {
        onListCompanies();
    }, [props.location.pathname]);

    const onListCompanies = () => {
        props.dispatch(showBackdrop(true));
        props.dispatch(findCompany(empresaId)).then(res => {
                setCompanies(res || []);
            props.dispatch(findUserByIdCompany(empresaId)).then(res => {
                setUsers(res || []); 
                props.dispatch(showBackdrop(false));
            });       
        });      
    }

    return (
        <Grid container className={classes.root, 'container-chat-empresa'} direction="column">
            <Grid container className={classes.Header}>
                <Grid className={classes.img}>
                    <ChatAvatar
                        isOnline="active"
                        image={companies.logo != "" ? companies.logo :"https://images.assetsdelivery.com/compings_v2/triken/triken1608/triken160800029.jpg"}
                        imgClassName="avatar-header"
                    />
                </Grid>
                <Grid className={classes.description}>
                    <Typography className={classes.textDescription}>{companies.name}</Typography>
                    <Typography className={classes.textDescription}>{users.length} trabajadores</Typography>
                </Grid>
            </Grid>
            <Grid className={classes.Body}>
                <Grid className={classes.contentButton} xs={4}>
                    <Button className={classes.button}>Iniciar Chat</Button>
                    <Button className={classes.button}>Enviar Notificación</Button>
                </Grid>
                <Grid className={classes.contentText} xs={8}>
                    <Typography variant="h5" gutterBottom>Descripción de la Empresa</Typography>
                    <Typography variant="body1">"Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"</Typography >
                </Grid>
            </Grid>
            <Grid className={classes.table}>
                <Typography variant="h4" gutterBottom align='left'>Lista de trabajadores</Typography>
                <TableContainer component={Paper}>
                    <Table size="medium">
                        <TableHead className={classes.TableHead}>
                            <TableRow>
                                <TableCell align="center">NOMBRES</TableCell>
                                <TableCell align="center">APELLIDOS</TableCell>
                                <TableCell align="center">CARGO</TableCell>
                                <TableCell align="center">CELULAR</TableCell>
                                <TableCell align="center">EMAIL</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell align="center">{row.firstName}</TableCell>
                                    <TableCell align="center">{row.lastName}</TableCell>
                                    <TableCell align="center">{row.type}</TableCell>
                                    <TableCell align="center">{row.phone}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}

export default EmpresaPage;