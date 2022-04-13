import { Box, Grid, makeStyles,Paper,Button} from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import ModalFooter from './common/ModalFooter';
// import KeyboardArrowLeft from '@material-ui/core/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/core/KeyboardArrowRight';
import { useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MobileStepper from '@material-ui/core/MobileStepper';
import icon1 from '../../assets/images/img_zendy01.jpeg';
import icon2 from '../../assets/images/img_zendy02.jpeg';
import icon3 from '../../assets/images/img_zendy03.jpeg';
import icon4 from '../../assets/images/img_zendy04.jpeg';
import icon5 from '../../assets/images/img_zendy05.jpeg';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
    typography: {
        align: 'justify',
    },
    button: {
        border: '3px solid',
        borderRadius: '50px',
        color: 'white',
    }
}));

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {
        label: 'CONSULTAS',
        imgPath:
            icon5,
    },
    {
        label: 'CONSULTAS FRECUENTES',
        imgPath:
            icon3,
    },
    {
        label: 'LISTA DE CONSULTAS FRECUENTES',
        imgPath:
            icon4,
    },
    {
        label: 'CREAR UNA NUEVA CONSULTA',
        imgPath:
            icon1,
    },
    {
        label: 'INGRESAR LOS VALORES PARA LA NUEVA CONSULTA',
        imgPath:
            icon2,
    },
];


const ModalCarrusel = (props) => {

    const classes = useStyles();
    const { open, handleClose, onConfirm } = props;
    
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };

    return (
        <Modal 
            open={open} 
            handleClose={handleClose}
            size="xl"
        >
            {/* <ModalHeader 
                icon={<ChatIcon />}
                text="Aceptar Chat"
            /> */}
            <ModalBody>
                <Grid container>
                    <Grid item xs={12}>
                        <Box sx={{width:'980px',height:'550px'}} textAlign="center">
                            <Box sx={{ flexGrow: 1, position:'relative'}}>
                                {/* <Paper
                                    square
                                    elevation={0}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: 50,
                                        pl: 2,
                                        bgcolor: 'background.default',
                                    }}
                                >
                                    <Typography >{images[activeStep].label}</Typography>
                                </Paper> */}
                                <Box sx={{zIndex:100,  position:'absolute', left:'980px',top:'-20px'}}> 
                                <ClearIcon onClick={()=>{handleClose()}}/>
                                </Box>
                                <AutoPlaySwipeableViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={activeStep}
                                    onChangeIndex={handleStepChange}
                                    enableMouseEvents
                                >
                                    {images.map((step, index) => (
                                        <div key={step.label}>
                                            {Math.abs(activeStep - index) <= 2 ? (
                                                <Box
                                                    component="img"
                                                    sx={{
                                                        height: 500,
                                                        display: 'block',
                                                        // maxHeight:500,
                                                        // maxWidth: 400,
                                                          overflow: 'hidden',
                                                        width: 980,
                                                    }}
                                                    src={step.imgPath}
                                                    alt={step.label}
                                                />
                                            ) : null}
                                        </div>
                                    ))}
                                </AutoPlaySwipeableViews>
                                <MobileStepper
                                    steps={maxSteps}
                                    position="static"
                                    activeStep={activeStep}
                                    nextButton={
                                        <Button
                                            size="small"
                                            onClick={handleNext}
                                            color={'primary'}
                                            variant='contained'
                                            disabled={activeStep === maxSteps - 1}
                                        >
                                            <strong>Siguiente</strong>
                                            {/* {theme.direction === 'rtl' ? (
                                                <ChatIcon />
                                            ) : (
                                                <ChatIcon />
                                            )} */}
                                        </Button>
                                    }
                                    backButton={
                                        <Button size="small" onClick={handleBack}
                                            color={'primary'}
                                            variant='contained'
                                            disabled={activeStep === 0}>
                                            {/* {theme.direction === 'rtl' ? (
                                                <ChatIcon />
                                            ) : (
                                                <ChatIcon />
                                            )} */}
                                            <strong>Regresar</strong>
                                        </Button>
                                    }
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ModalBody>

            {/* <ModalFooter
                confirmText={"Aceptar"}
                onConfirm={onConfirm}
                cancelText={"Cancelar"}
                onCancel={handleClose}
            /> */}
        </Modal>
    )
}

export default ModalCarrusel
