import { Button, Grid } from '@material-ui/core';
import React, { Component } from 'react';
import RateReviewIcon from '@material-ui/icons/RateReview';
import CustomModal from 'components/Modals/common/CustomModal';

class NewChatCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {}

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <>
        <div style={{ borderTop: '0.8px solid', borderColor: 'white' }}>
          <Grid container spacing={3} style={{ padding: '10px', marginTop: '10px' }}>
            <Grid item xs={6}>
              <Button
                fullWidth
                onClick={() => this.handleClickOpen()}
                variant="contained"
                color="secondary"
                startIcon={<RateReviewIcon />}
              >
                Buscar Chat
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                onClick={() => this.handleClickOpen()}
                variant="contained"
                color="secondary"
                disabled
                startIcon={<RateReviewIcon />}
              >
                Llamadas
              </Button>
            </Grid>
          </Grid>
          <CustomModal
            customModal={this.props.isChatCompany ? 'ModalNewCompanyChat' : 'ModalNewChat'}
            open={this.state.open}
            handleClose={() => this.handleClose()}
            onSaveForm={this.props.onSaveForm}
          />
        </div>
      </>
    );
  }
}
export default NewChatCall;
