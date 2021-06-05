import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ChatAvatar from "pages/chat_page/Components/ChatAvatar";
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({

  root: {
    height: '100vh',
  },
  form: {
    width: '80%',
    height: '100%'  
  },
  reportBtn: {
    fontSize:'15px',
    minWidth:'201px',
    height:'50px',
    borderRadius:'20px',
    backgroundColor:'#6D909B',
    color:'#ffff'
  },
  nameHeader:{
    fontSize:'30px',
  },
  containerReport:{
    backgroundColor:'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    height:'610px',
    width:'82%',
    paddingTop:'40px',
    minWidth:'82%',
    minHeight:'610px'
  },
  fontError:{
    color: '#000000',
    marginTop:'20px',
    alignItems: 'center',
    fontSize:'20px',
  },
  headerName:{
    width: '100%',
    backgroundColor:'#ffff',
    height:'110px',
    justifyContent:'center'
  },
  imageError:{
    height:'300px',
    width:'708px',
    border:'2px solid #ebe7fb'
  },
  containerImage:{
    marginTop:'80px',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageErrorS:{
    height:'300px',
    width:'340px',
    border:'2px solid #ebe7fb'
  }
}));


const ErrorInfoPage = props => {
  const classes = useStyles();
  const [modulo, setModulo] = React.useState('');
  //const [allChatUsers, setAllChat] = React.useState([]);

  const handleChange = (event) => {
    setModulo(event.target.value);
  };

  return (
    <>
      <CssBaseline />
      <Grid container className={classes.root}>
        <Grid item xs={12} className="report-form">
          <Grid container className={classes.headerName} direction="column" justifyContent='center'
          alignItems='center' style={{textAlign: "center"}}>
            <div >
            <Grid  containter style={{display:"flex"}}  justifyContent='center'
          alignItems='center'>        
                <Grid item xs={6}>
                    <ChatAvatar
                      isOnline="active"
                      image="http://pm1.narvii.com/6243/9ec76120e367892837884808897852a49e5dbc40_00.jpg"
                      imgClassName="avatar-header"
                    />
                </Grid>
                <Grid item xs={6} style={{paddingLeft:'0px'}}>
                  <span className={classes.nameHeader}>Monsters Inc.</span>
                </Grid>
            </Grid>
            </div>
          </Grid> 
          <Grid container item xs={12}>
          <Grid item xs={6}
            container
            spacing={0}
            direction="column"
            alignItems="flex-start"
            verticalAlign="center"
            justify="flex-start">
          <Box 
            className={classes.containerReport}
            m={10}
            justifyContent='center'
            alignItems='center'
            style={{textAlign: "center"}}>
          <Grid 
          container
          >
            <Grid item xs={12} alignItems='center' alignContent='center' style={{textAlign: "center", marginTop:'10px'}}>
            <span className={classes.fontError} style={{fontWeight:'bold', fontStyle:'italic', textDecorationLine:'underline',alignItems:'center', marginTop:'10px', marginLeft:'30px'}} >INFORMACIÓN DEL REPORTE</span>
            </Grid>

            <Grid item xs={5} alignItems='flex-start' alignContent='flex-start' style={{textAlign: "left", marginTop:'25px'}}>
            <span className={classes.fontError} style={{fontWeight:'bold', fontStyle:'italic', alignItems:'flex-end', marginTop:'10px', marginLeft:'30px'}} >Nombre de Empresa:</span>
            </Grid>
            <Grid item xs={7} alignItems='flex-start' alignContent='flex-start' style={{textAlign: "left", marginTop:'25px'}}>
            <span className={classes.fontError} style={{ alignItems:'flex-start', marginTop:'10px'}}>ERP ZENDY</span>
            </Grid>

            <Grid item xs={5} alignItems='flex-start' alignContent='flex-start' style={{textAlign: "left", marginTop:'20px'}}>
            <span className={classes.fontError} style={{fontWeight:'bold', fontStyle:'italic', alignItems:'flex-end', marginLeft:'30px'}} >Usuario:</span>
            </Grid>
            <Grid item xs={7} alignItems='flex-start' alignContent='flex-start' style={{textAlign: "left", marginTop:'20px'}}>
            <span className={classes.fontError} style={{ alignItems:'flex-start', marginTop:'10px'}}>Tim Hover</span>
            </Grid>

            <Grid item xs={5} alignItems='flex-start' alignContent='flex-start' style={{textAlign: "left", marginTop:'20px'}}>
            <span className={classes.fontError} style={{fontWeight:'bold', fontStyle:'italic', alignItems:'flex-end', marginLeft:'30px'}} >Fecha de Reporte:</span>
            </Grid>
            <Grid item xs={7} alignItems='flex-start' alignContent='flex-start' style={{textAlign: "left", marginTop:'20px'}}>
            <span className={classes.fontError} style={{ alignItems:'flex-start', marginTop:'10px'}}>30-05-2021</span>
            </Grid>

            <Grid item xs={5} alignItems='flex-start' alignContent='flex-start' style={{textAlign: "left", marginTop:'20px'}}>
            <span className={classes.fontError} style={{fontWeight:'bold', fontStyle:'italic', alignItems:'flex-end', marginLeft:'30px'}} >Modulo:</span>
            </Grid>
            <Grid item xs={7} alignItems='flex-start' alignContent='flex-start' style={{textAlign: "left", marginTop:'20px'}}>
            <span className={classes.fontError} style={{ alignItems:'flex-start', marginTop:'10px'}}>Modulo Reporte</span>
            </Grid>

            <Grid item xs={12} alignItems='flex-start' alignContent='flex-start' style={{textAlign: "left", marginTop:'20px', marginLeft:'30px'}}>
            <span className={classes.fontError} style={{fontWeight:'bold', fontStyle:'italic', alignItems:'flex-end'}} >Descripción:</span>
            </Grid>
            <Grid item xs={12} alignItems='flex-start' alignContent='flex-start' style={{textAlign: "justify", marginTop:'20px',padding:'0px 30px 30px 30px'}}>
            <span style={{ alignItems:'flex-start', textAlign:'justify', fontSize:'15px',marginRight:'2px'}}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </span>
            </Grid>


            <Grid item xs={6} alignItems='center' alignContent='center' style={{textAlign: "center", marginTop:'25px'}}>
            <Button className={classes.reportBtn}>Confirmar error</Button>
            </Grid>
            <Grid item xs={6} alignItems='center' alignContent='center' style={{textAlign: "center", marginTop:'25px'}}>
              <Button className={classes.reportBtn}>Reportar error falso</Button>
            </Grid>
          </Grid>
  
          <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center">

          </Grid>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12} className={classes.containerImage} justifyContent='center'
            alignItems='center'
            style={{textAlign: "center"}}>
            <img className={classes.imageError} src='https://larepublica.pe/resizer/S5q2wql4s7IJLYelN8PPhM_Mf7o=/1250x735/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/RQYYEDJXARCCBBXC4OD4AGRAUU.png'></img>
            </Grid>

            <Grid container item xs={12}>
            <Grid item xs={6} justifyContent='center'
            alignItems='center'
            style={{textAlign: "center", marginTop:'10px'}}>
            <img className={classes.imageErrorS} src='https://www.campusmvp.es/recursos/image.axd?picture=/2018/4T/Top-10-Errores-JS/javascript-error-graph.png'></img>
            </Grid>

            <Grid item xs={6}  justifyContent='center'
            alignItems='center' 
            style={{textAlign: "center", marginTop:'10px'}}>
            <img className={classes.imageErrorS} src='https://larepublica.pe/resizer/S5q2wql4s7IJLYelN8PPhM_Mf7o=/1250x735/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/RQYYEDJXARCCBBXC4OD4AGRAUU.png'></img>
            </Grid>
            </Grid>

          </Grid>
          <Grid>
          </Grid>         
          </Grid>         
        </Grid>
    </Grid>
    </>
  );
}

export default ErrorInfoPage;