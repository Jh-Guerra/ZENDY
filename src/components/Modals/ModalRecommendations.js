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

const ModalRecommendations = (props) => {

    const { open, handleClose, entryQuery={}, session } = props;

    const [showRecommendUser, setShowRecommendUser] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [recommendations, setRecommendations] = React.useState([]);

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
          size="md"
        >
        <ModalHeader
          icon={<PersonAddIcon />}
          text="Listado de Recomendaciones"
          
        />

        <ModalBody>
            <List style={{ padding: "0px", maxHeight: "550px", overflow: "auto", textAlign: "center", paddingBottom:"10px" }}> 
                <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={openRecommendUser}>
                    Recomendar otro usuario
                </Button>
                         
                <Divider />
            </List>

            <Table responsive striped>
                <TableHead>
                    <TableRow>
                        <TableCell style={{color:"black", fontWeight:"bold"}}>Usuario Recomendado</TableCell>
                        <TableCell style={{color:"black", fontWeight:"bold"}}>Recomendado por</TableCell>
                        <TableCell style={{color:"black", fontWeight:"bold"}}>Fecha de recomendación</TableCell>
                    </TableRow>
                </TableHead>
    
                <TableBody>
                  {recommendations.map((recommendation, i) => {
                    const date = recommendation.recommendDate && moment().format("YYYY-MM-DD");
                        return (         
                          <TableRow key={recommendation.id}>
                              <TableCell component="th" scope="row">
                                  {`${recommendation.user.firstName} ${recommendation.user.lastName}`}
                              </TableCell>
                              <TableCell align="right">
                                  {`${recommendation.by.firstName} ${recommendation.by.lastName}`} 
                              </TableCell>
                              <TableCell align="right">
                                  {date ? date : null}
                              </TableCell>                
                          </TableRow>
                        );
                  })}

                  {
                      recommendations && recommendations.length === 0 && (
                        <tr><td colSpan={12} style={{fontSize:"15px", textAlign:"center", paddingBottom:"20px"}}>NO EXISTEN RECOMENDACIONES</td></tr>
                      )
                  }
                  </TableBody>
            </Table>

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
        />
      </div>
    )
}

export default ModalRecommendations