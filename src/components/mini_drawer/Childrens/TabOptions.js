import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import RateReviewIcon from '@material-ui/icons/RateReview';
import CustomButton from 'components/CustomButtom';
import { successButtonColor } from 'assets/styles/zendy-css';
import CustomModal from 'components/Modals/common/CustomModal';

const TabOptions = (props) => {

  const { onSaveForm, view } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <div style={{ borderTop: '0.8px solid', borderColor: 'white' }}>
        <Grid container spacing={3} style={{ padding: '10px', marginTop: '10px' }}>
          {
            view=="reportedErrors" && (
              <Grid item xs={6}>
                <CustomButton
                  fullWidth
                  onClick={() => handleClickOpen()}
                  variant="contained"
                  customColor={successButtonColor}
                  startIcon={<RateReviewIcon />}
                >
                  Reportar Error
                </CustomButton>
              </Grid>
            )
          }
        </Grid>
        <CustomModal
          customModal={'ModalNewChat'}
          open={open}
          handleClose={() => handleClose()}
          onSaveForm={onSaveForm}
        />
      </div>
    </>
  );
}
export default TabOptions;
