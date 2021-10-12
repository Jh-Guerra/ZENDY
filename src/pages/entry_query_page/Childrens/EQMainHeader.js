import React, { useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import { Grid, TextField, Typography, Button, Tooltip } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import CustomModal from "components/Modals/common/CustomModal";
import { useHistory, withRouter } from "react-router-dom";
import config from "config/Config";
import { getImageProfile } from "utils/common";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ModalDelete from 'components/Modals/ModalDelete';

const EQMainHeader = props => {

  const { entryQuery={},  onDelete , session , setEntryQuery, onGetData} = props;

  const user = session && session.user && session.user.id|| "";

  const history = useHistory();

  const [showModalEntryChat, setShowModalEntryChat] = React.useState(false);
  const [showModalDelete, setShowModalDelete] = React.useState(false);

  const onOpenModal = () => {
    setShowModalEntryChat(true);
  }

  const onOpenModalDelete = () => {
    setShowModalDelete(true);
  }

  var image = entryQuery.user && entryQuery.user.avatar || "";
  var defaultImageType =entryQuery.user && entryQuery.user.sex || "O";
  var name = entryQuery.user && (entryQuery.user.firstName + ' ' + entryQuery.user.lastName) || "";
  var status = entryQuery.status || "";

  return (
    <Grid container className="chat-header">    
      <Grid container className="chat-header-content">
        <Grid item xs={6}>       
          <Grid container style={{height:"100%", padding:"0px 10px"}}>           
            <Grid item xs={2} style={{display:"flex"}}>             
              <div className="chat-header-avatar">
                <div className="avatar-header">
                  <div className="avatar-img">
                    <img src={image ? config.api+image : getImageProfile(defaultImageType)} alt="#" />
                  </div>
                </div>
              </div>
            </Grid>                      
            <Grid item xs={8} className="chat-header-name">
              <div>
                <Typography noWrap variant="h5">{name}</Typography>
              </div>
              <div>
                <Typography style={{fontSize:"14px"}}>{status}</Typography>
              </div>
            </Grid>               
          </Grid>
        </Grid>
        
        <Grid item xs={6}>
          <Grid container className="chat-header-buttons">
            {
              ((entryQuery && entryQuery.status == "Pendiente") && (entryQuery && entryQuery.createdBy == user) ) && (
                <div>
                  {
                    entryQuery && !entryQuery.isFrequentQuery && (
                      <Tooltip title="Editar Consulta">
                        <IconButton onClick={() => { onOpenModal && onOpenModal(); }} className="chat-header-button"><EditIcon style={{ fontSize: 35, color: "white" }} /></IconButton>
                      </Tooltip>
                    )
                  }
                  <Tooltip title="Eliminar Consulta">
                    <IconButton onClick={() => { onOpenModalDelete && onOpenModalDelete() }} className="chat-header-button"><DeleteIcon style={{ fontSize: 35, color: "white" }} /></IconButton>
                  </Tooltip>
                </div>
              )
            }
          </Grid>              
        </Grid>       
      </Grid>
      <CustomModal
        customModal={'ModalEntryQuery'}
        open={showModalEntryChat}
        entryQuery={entryQuery}
        setEntryQuery={setEntryQuery}
        handleClose={() => { setShowModalEntryChat(false) }}
        onSaveForm={() => { setShowModalEntryChat(false) }}
        onGetData={onGetData}
      />
      <ModalDelete
        open={showModalDelete}
        title="Eliminar Consulta"
        handleClose={() => {
          setShowModalDelete(false)
        }}
        onDelete={onDelete}
      />
    </Grid>
  );

}

export default withRouter(EQMainHeader);
