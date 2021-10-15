import React from 'react';
import Modal from './common/Modal';
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import { Grid, Divider, TextField } from "@material-ui/core";
import { getFileImage, isImageFile } from 'utils/common';
import ModalFooter from './common/ModalFooter';

const ModalUploadFile = props => {
  const { open, handleClose, uploadImage, fileExtension, sendMessage } = props;

  const [comentary, setComentary] = React.useState("");

  const onChangeComentary = (event) => {
    setComentary(event.target.value);
  }

  const isImage = isImageFile(fileExtension);

  return (      
      <Modal open={open} handleClose={handleClose} size="md" transitionModal>
          <ModalHeader text="Vista Previa" />
              <ModalBody>
              <Grid container>
                <Grid item xs={12} style={{textAlign: "center"}}>
                  <img
                      height="250px"
                      height="250px"
                      src={isImage ? uploadImage : getFileImage(fileExtension)}
                  />
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
                    onKeyPress={event => { event.key === 'Enter' && sendMessage("file", event.target.value) }}
                  />
                </Grid>
              </Grid>
              
            </ModalBody>

            <ModalFooter
              cancelText="Cancelar"
              onCancel={handleClose}
              confirmText="Enviar"
              onConfirm={() => { sendMessage("file", comentary) }}
            />  

      </Modal>
    )
};

export default ModalUploadFile;