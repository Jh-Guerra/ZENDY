import React from "react";
import ChatAvatar from "pages/chat_page/Components/ChatAvatar";
import { Button, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { Label } from "@material-ui/icons";

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
        background:'lightgrey'
    }
}));

const EmpresaPage = props => {
    const classes = useStyles();

    const rows = [{
        nombres: 'Tim Ayub',
        apellidos: 'Hover Rossi',
        cargo: 'Administrador',
        celular: '999999999',
        email: 'Tim@tim.com'
    },
    {
        nombres: 'Ayub Tim',
        apellidos: 'Rossi Hover',
        cargo: 'Administrador',
        celular: '999999999',
        email: 'Ayub@ayub.com'
    },
    {
        nombres: 'Tim Ayub',
        apellidos: 'Hover Rossi',
        cargo: 'Administrador',
        celular: '999999999',
        email: 'Tim@tim.com'
    },
    {
        nombres: 'Ayub Tim',
        apellidos: 'Rossi Hover',
        cargo: 'Administrador',
        celular: '999999999',
        email: 'Ayub@ayub.com'
    },
    {
        nombres: 'Tim Ayub',
        apellidos: 'Hover Rossi',
        cargo: 'Administrador',
        celular: '999999999',
        email: 'Tim@tim.com'
    },
    {
        nombres: 'Ayub Tim',
        apellidos: 'Rossi Hover',
        cargo: 'Administrador',
        celular: '999999999',
        email: 'Ayub@ayub.com'
    },
    {
        nombres: 'Tim Ayub',
        apellidos: 'Hover Rossi',
        cargo: 'Administrador',
        celular: '999999999',
        email: 'Tim@tim.com'
    },
    {
        nombres: 'Ayub Tim',
        apellidos: 'Rossi Hover',
        cargo: 'Administrador',
        celular: '999999999',
        email: 'Ayub@ayub.com'
    }
    ];

    return (
        <Grid container className={classes.root, 'container-chat-empresa'} direction="column">
            <Grid container className={classes.Header}>
                <Grid className={classes.img}>
                    <ChatAvatar
                        isOnline="active"
                        image="http://pm1.narvii.com/6243/9ec76120e367892837884808897852a49e5dbc40_00.jpg"
                        imgClassName="avatar-header"
                    />
                </Grid>
                <Grid className={classes.description}>
                    <Typography className={classes.textDescription}>Monsters Inc.</Typography>
                    <Typography className={classes.textDescription}>{rows.length} trabajadores</Typography>
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
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell align="center">{row.nombres}</TableCell>
                                    <TableCell align="center">{row.apellidos}</TableCell>
                                    <TableCell align="center">{row.cargo}</TableCell>
                                    <TableCell align="center">{row.celular}</TableCell>
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