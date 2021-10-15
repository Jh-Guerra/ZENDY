import React from 'react';
import Modal from './common/Modal';
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import { Grid, TextField } from "@material-ui/core";
import ModalFooter from './common/ModalFooter';

const ModalUploadImage = props => {
    const { open, handleClose, uploadImage, sendMessage } = props;

    const [comentary, setComentary] = React.useState("");

    const onChangeComentary = (event) => {
      setComentary(event.target.value);
    }

    return (      
        <Modal open={open} handleClose={handleClose} size="md" transitionModal>
            <ModalHeader text="Vista Previa" />
                <ModalBody>
                  <Grid container>
                    <Grid item xs={12}>
                      <img height="350px" width="100%" src={uploadImage}/>
                    </Grid>
                    
                    <Grid item xs={12} style={{marginTop:"20px"}}>
                      <TextField
                        id="name"
                        type="text"
                        fullWidth
                        autoFocus
                        placeholder="Añadir un comentario..."
                        value={comentary}
                        onChange={onChangeComentary}
                        onKeyPress={event => { event.key === 'Enter' && sendMessage("image", event.target.value) }}
                      />
                    </Grid>
                  </Grid>
                </ModalBody>

              <ModalFooter
                cancelText="Cancelar"
                onCancel={handleClose}
                confirmText="Enviar"
                onConfirm={() => { sendMessage("image", comentary) }}
              />  
        </Modal>
    )
};

export default ModalUploadImage;