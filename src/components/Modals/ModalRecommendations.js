import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Avatar, Grid, makeStyles, Typography, Divider, Button,
        Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';
import List from '@material-ui/core/List';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CustomModal from 'components/Modals/common/CustomModal';
import { listExistingRecommendations } from 'services/actions/RecommendationAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import moment from 'moment';
import { checkPermission, getSessionInfo } from 'utils/common';

const ModalRecommendations = (props) => {

    const { open, handleClose, entryQuery={} } = props;

    const [showRecommendUser, setShowRecommendUser] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [recommendations, setRecommendations] = React.useState([]);
    const session = getSessionInfo();

    React.useEffect(() => {
        if(open){
            onListExistingRecommendations();
        }
    }, [open]);

    const openRecommendUser = () => {
        setShowRecommendUser(true);
    };

    const onListExistingRecommendations = () => {
        props.dispatch(showBackdrop(true));
        props.dispatch(listExistingRecommendations(entryQuery.id)).then(recommendations => {
            setRecommendations(recommendations);
            props.dispatch(showBackdrop(false));
          
        }).catch(err => props.dispatch(showBackdrop(false)));
    }

    const onRecommendUser = () => {
        const selectedUsers = users.filter(user => user.checked);
        const selectedUserIds = selectedUsers.map(user => user.id);
        props.onConfirm && props.onConfirm(selectedUserIds);
        setShowRecommendUser(false);
    }
    
    return (
      <div>
        <Modal 
          open={open} 
          handleClose={handleClose}
          size="lg"
        >
            <ModalHeader
                icon={<PersonAddIcon />}
                text="Recomendaciones"        
            />

            <ModalBody>
                <Grid container> 
                    {
                        checkPermission(session, "recommendUserEntryQuery") && (
                            <Grid item xs={12} style={{ paddingTop: "10px", maxHeight: "550px", overflow: "auto", textAlign: "right", paddingBottom:"30px" }}> 
                                <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={openRecommendUser}>
                                    Recomendar otro usuario
                                </Button>
                                <br />                  
                            </Grid>
                        )
                    }
                    <Grid item xs={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{color:"black", fontWeight:"bold"}}>Usuario Recomendado</TableCell>
                                    <TableCell style={{color:"black", fontWeight:"bold"}}>Recomendado por</TableCell>
                                    <TableCell style={{color:"black", fontWeight:"bold"}}>Fecha de recomendación</TableCell>
                                </TableRow>
                            </TableHead>
                
                            <TableBody>
                            {recommendations.map((recommendation, i) => {
                                const date = recommendation.recommendDate && moment().format("DD/MM/YYYY");
                                    return (         
                                        <TableRow key={recommendation.id}>
                                            <TableCell component="th" scope="row">
                                                {`${recommendation.user.firstName} ${recommendation.user.lastName}`}
                                            </TableCell>
                                            <TableCell>
                                                {`${recommendation.by.firstName} ${recommendation.by.lastName}`} 
                                            </TableCell>
                                            <TableCell>
                                                {date ? date : null}
                                            </TableCell>                
                                        </TableRow>
                                    );
                            })}

                            {
                                recommendations && recommendations.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={3} component="th" scope="row">
                                            No existen recomendaciones
                                        </TableCell>        
                                    </TableRow>
                                )
                            }
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>            
            </ModalBody>
        </Modal>

        <CustomModal
            customModal="ModalRecommendUser"
            open={showRecommendUser}
            handleClose={() => {
              setShowRecommendUser(false);
            }}
            entryQuery={entryQuery}
            onConfirm={onRecommendUser}
            onListExistingRecommendations={onListExistingRecommendations}
        />
      </div>
    )
}

export default ModalRecommendations