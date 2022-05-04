import { Button, Grid } from '@material-ui/core';
import React, { Component } from 'react';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import ErrorIcon from '@material-ui/icons/Error';

const TabOptions = (props) => {

  const { onSaveForm, onOpenModal, onOpenModal2, view } = props;

  // const changeStatusModal = () => {
  //   var status = document.getElementById('statusModal')
  //   console.log(status)
  //   if(status){
  //     status.style.display = 'none';
  //   }
  // }

  return (
    <>
      <div style={{ borderTop: '0.8px solid', borderColor: 'white', textAlign: 'center' }}>
        <Grid container spacing={3} style={{ padding: '5px', margin: 'auto' }}>
          {
            view=="reportedErrors" && (
              <Grid item xs={6}>
                <Button
                  fullWidth
                  onClick={() => { onOpenModal && onOpenModal() }}
                  variant="contained"
                  color="secondary"
                  startIcon={<ErrorIcon />}
                >
                  Reportar Error
                </Button>
              </Grid>
            )
          }
          {
            view=="entryQueries" && (
              <Grid container spacing={3} style={{ padding: '10px' }}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    onClick={() => { onOpenModal && onOpenModal() }}
                    variant="contained"
                    color="secondary"
                    startIcon={<RateReviewIcon />}
                  >
                    Iniciar Consulta
                  </Button>
                </Grid>
                {/* <Grid item xs={6}>
                  <Button
                    fullWidth
                    onClick={() => { onOpenModal2 && onOpenModal2() }}
                    variant="contained"
                    color="secondary"
                    startIcon={<RateReviewIcon />}
                  >
                    Consulta Frecuente
                  </Button>
                </Grid> */}
              </Grid>
            )
          }
          {
            view=="adminNotifications" && (
              <Grid item xs={6}>
                <Button
                  fullWidth
                  onClick={() => { onOpenModal && onOpenModal() }}
                  variant="contained"
                  color="secondary"
                  startIcon={<AddAlertIcon />}
                >
                  Crear Notificación
                </Button>
              </Grid>
            )
          }
        </Grid>
      </div>
    </>
  );
}
export default TabOptions;
