import { Button, Grid } from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ModalMoreActions = (props) => {
    
    const { open, handleClose, handleChangeTab, session, secondSections, getIcon } = props;
     
    return (
        <Modal 
            open={open} 
            handleClose={handleClose} 
            size="xs" 
        >
            <ModalHeader 
                icon={<MoreVertIcon />}
                text="Más opciones..."
            />

            <ModalBody>
                <Grid container spacing={1}>
                    {
                        secondSections && secondSections.map((section, index)=>{
                            return (
                                <Grid item xs={12} key={index}>
                                    <Button
                                        fullWidth
                                        onClick={() => {
                                            handleClose();
                                            handleChangeTab(null, index + 5);
                                        }}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={getIcon(section.name)}
                                        style={{display: !section.name ? "none" : "inline-flex"}}
                                    >
                                        {section.title}
                                    </Button>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </ModalBody>
        </Modal>
    )
}

export default ModalMoreActions