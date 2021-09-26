import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import RateReviewIcon from '@material-ui/icons/RateReview';
import CustomButton from 'components/CustomButton';
import { successButtonColor } from 'assets/styles/zendy-css';
import CustomModal from 'components/Modals/common/CustomModal';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import ErrorIcon from '@material-ui/icons/Error';

const TabOptions = (props) => {

  const { onSaveForm, onOpenModal, onOpenModal2, view } = props;

  return (
    <>
      <div style={{ borderTop: '0.8px solid', borderColor: 'white' }}>
        <Grid container spacing={3} style={{ padding: '10px', marginTop: '10px' }}>
          {
            view=="reportedErrors" && (
              <Grid item xs={6}>
                <CustomButton
                  fullWidth
                  onClick={() => { onOpenModal && onOpenModal() }}
                  variant="contained"
                  customColor={successButtonColor}
                  startIcon={<ErrorIcon />}
                >
                  Reportar Error
                </CustomButton>
              </Grid>
            )
          }
          {
            view=="entryQueries" && (
              <Grid container spacing={3} style={{ padding: '10px', marginTop: '10px' }}>
              <Grid item xs={6}>
                <CustomButton
                  fullWidth
                  onClick={() => { onOpenModal && onOpenModal() }}
                  variant="contained"
                  customColor={successButtonColor}
                  startIcon={<RateReviewIcon />}
                >
                  Iniciar Consulta
                </CustomButton>
              </Grid>
              <Grid item xs={6}>
              <CustomButton
                fullWidth
                onClick={() => { onOpenModal2 && onOpenModal2() }}
                variant="contained"
                customColor={successButtonColor}
                startIcon={<RateReviewIcon />}
              >
                Consulta Frecuente
              </CustomButton>
            </Grid>
                </Grid>
            )
          }
          {
            view=="adminNotifications" && (
              <Grid item xs={6}>
                <CustomButton
                  fullWidth
                  onClick={() => { onOpenModal && onOpenModal() }}
                  variant="contained"
                  customColor={successButtonColor}
                  startIcon={<AddAlertIcon />}
                >
                  Crear Notificación
                </CustomButton>
              </Grid>
            )
          }
        </Grid>
      </div>
    </>
  );
}
export default TabOptions;
