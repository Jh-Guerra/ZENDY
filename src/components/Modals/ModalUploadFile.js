import React from 'react';
import Modal from './common/Modal';
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import { Button, Card, CardActions, CardActionArea, CardMedia, CardContent } from "@material-ui/core";
import { config } from 'react-transition-group';
import { getFileImage, isImageFile } from 'utils/common';

const ModalUploadFile = props => {
  const { open, handleClose, uploadImage, fileExtension, msg, onChangeMessage, sendMessage } = props;

  const isImage = isImageFile(fileExtension);

  return (      
      <Modal open={open} handleClose={handleClose} size="md" transitionModal={true} >
          <ModalHeader text="Vista Previa" />
              <ModalBody>         
                <Card>                
                    <CardActionArea>
                      <img
                          style={{height:"350px", width:"350px"}}
                          src={isImage ? uploadImage : getFileImage(fileExtension)}
                      />                   
                    </CardActionArea>

                    <CardContent>
                      <input
                          type="text"
                          placeholder="Escribe un mensaje aquí."
                          onChange={onChangeMessage}
                          value={msg}
                          style={{width:"100%"}} 
                      />
                    </CardContent>
                    
                    <CardActions>
                      <Button size="small" variant="contained" color="primary" style={{marginLeft:"5px"}} onClick={handleClose}>
                          Cancelar
                      </Button>  
                      <Button size="small" variant="contained" color="primary" style={{marginLeft:"580px"}} onClick={sendMessage}>
                          Enviar
                      </Button>
                    </CardActions>              
              </Card>            
            </ModalBody>      
      </Modal>
    )
};

export default ModalUploadFile;