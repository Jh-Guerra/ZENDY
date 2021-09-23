import React from 'react';
import Modal from './common/Modal';
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import { Button, Card, CardActions, CardActionArea, CardMedia, CardContent } from "@material-ui/core";

const ModalUploadImage = props => {
    const { open, handleClose, uploadImage, msg, onChangeMessage, sendMessageWithImage } = props;

    return (      
        <Modal open={open} handleClose={handleClose} size="md" transitionModal={true} >
            <ModalHeader text="Vista Previa" />
                <ModalBody>         
                  <Card>                
                      <CardActionArea>
                        <CardMedia
                            style={{height:"700px", width:"700px"}}
                            image={uploadImage}
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
                        <Button size="small" variant="contained" color="primary" style={{marginLeft:"580px"}} onClick={sendMessageWithImage}>
                            Enviar
                        </Button>
                      </CardActions>              
                </Card>            
              </ModalBody>      
        </Modal>
    )
};

export default ModalUploadImage;