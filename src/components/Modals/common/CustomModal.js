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
                return <ModalNewChat {...props}/>
            case "ModalGroupChatDetail":
                return <ModalGroupChatDetail {...props}/>
            case "ModalNewCustomerChat":
                return <ModalNewCustomerChat {...props}/>
            case "ModalNewInternalChat":
                return <ModalNewInternalChat {...props}/>
            case "ModalNewCompanyChat":
                return <ModalNewCompanyChat {...props}/>
            case "ModalAcceptChat":
                return <ModalAcceptChat {...props}/>
            case "ModalRecomendarUsuario":
                return <ModalRecomendarUsuario {...props}/>
            case "ModalChatDetail":
                return <ModalChatDetail {...props}/>
            case "ModalAddToConversation":
                return <ModalAddToConversation {...props}/>
            case "ModalResendMessage":
                return <ModalResendMessage {...props}/>
                
            default:
                return null;
        }
    }

    return getCustomModal(props.customModal);
}

const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(withRouter(CustomModal));
