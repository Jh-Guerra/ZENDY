import { Button, Grid } from "@material-ui/core";
import ModalNuevaNotification from "components/Modals/ModalNuevaNotification";
import React, { Component } from "react";
import RateReviewIcon from '@material-ui/icons/RateReview';
import CustomButton from "components/CustomButtom";

class NewChatCall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    componentDidMount() {
    }

    handleClickOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {
        return (
            <>
            <Grid container spacing={3} className="mini-drawer-buttons">
                <Grid item xs={6}>
                    <CustomButton fullWidth onClick={() => this.handleClickOpen()} variant="contained" color="#158851" size="sm" startIcon={<RateReviewIcon />}>
                        Nuevo Chat
                    </CustomButton>
                </Grid>
                <Grid item xs={6}>
                    <CustomButton fullWidth disabled variant="contained" color="#158851" size="sm" startIcon={<RateReviewIcon />}>
                        Llamadas
                    </CustomButton>
                </Grid>
            </Grid >
            <ModalNuevaNotification 
                    open={this.state.open} 
                    handleClose={() => this.handleClose()}
                />
            </>
        )
    }
}
export default NewChatCall