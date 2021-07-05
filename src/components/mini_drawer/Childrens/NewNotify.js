import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import CustomButton from "components/CustomButtom";
import { successButtonColor } from "assets/styles/zendy-css";
import NotificationsNew from '@material-ui/icons/NotificationsActive';
import ModalNuevaNotification from "components/Modals/ModalNuevaNotification";


class NewNotify extends Component {
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
                <Grid container spacing={3} className="mini-drawer-buttons" direction="row"
                justify="center"
                alignItems="center">
                    <Grid item xs={8}>
                        <CustomButton fullWidth onClick={() => this.handleClickOpen()} variant="contained" customColor={successButtonColor} startIcon={<NotificationsNew />}>
                            Nueva Notificacion
                        </CustomButton>
                    </Grid>
                </Grid >
                   {/* Modal */}
                   <ModalNuevaNotification
                    open={this.state.open} 
                    handleClose={() => this.handleClose()}
                />
            </>
        )
    }
}
export default NewNotify