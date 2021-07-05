import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalNewChat from '../ModalNewChat';
import ModalGroupChatDetail from '../ModalGroupChatDetail';
import ModalNewCustomerChat from '../ModalNewCustomerChat';
import ModalNewInternalChat from '../ModalNewInternalChat';
import ModalNewCompanyChat from '../ModalNewCompanyChat';
import ModalAcceptChat from '../ModalAcceptChat';
import ModalRecomendarUsuario from '../ModalRecomendarUsuario';
import ModalChatDetail from '../ModalChatDetail';
import ModalAddToConversation from '../ModalAddToConversation';
import ModalResendMessage from '../ModalResendMessage';

const CustomModal = (props) => {
    const getCustomModal = (customModal) => {
        switch(customModal){
            case "ModalNewChat":
                return <ModalNewChat dispatch={props.dispatch} open={props.open} handleClose={props.handleClose}/>
            case "ModalGroupChatDetail":
                return <ModalGroupChatDetail dispatch={props.dispatch} open={props.open} handleClose={props.handleClose}/>
            case "ModalNewCustomerChat":
                return <ModalNewCustomerChat dispatch={props.dispatch} open={props.open} handleClose={props.handleClose}/>
            case "ModalNewInternalChat":
                return <ModalNewInternalChat dispatch={props.dispatch} open={props.open} handleClose={props.handleClose}/>
            case "ModalNewCompanyChat":
                return <ModalNewCompanyChat dispatch={props.dispatch} open={props.open} handleClose={props.handleClose}/>
            case "ModalAcceptChat":
                return <ModalAcceptChat dispatch={props.dispatch} open={props.open} handleClose={props.handleClose}/>
            case "ModalRecomendarUsuario":
                return <ModalRecomendarUsuario dispatch={props.dispatch} open={props.open} handleClose={props.handleClose}/>
            case "ModalChatDetail":
                return <ModalChatDetail dispatch={props.dispatch} open={props.open} handleClose={props.handleClose}/>
            case "ModalAddToConversation":
                return <ModalAddToConversation dispatch={props.dispatch} open={props.open} handleClose={props.handleClose}/>
            case "ModalResendMessage":
                return <ModalResendMessage dispatch={props.dispatch} open={props.open} handleClose={props.handleClose}/>
                
            default:
                return null;
        }
    }

    return getCustomModal(props.customModal);
}

const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(withRouter(CustomModal));
