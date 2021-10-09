import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalNewChat from '../ModalNewChat';
import ModalGroupChatDetail from '../ModalGroupChatDetail';
import ModalNewCustomerChat from '../ModalNewCustomerChat';
import ModalNewInternalChat from '../ModalNewInternalChat';
import ModalNewCompanyChat from '../ModalNewCompanyChat';
import ModalAcceptChat from '../ModalAcceptChat';
import ModalRecommendUser from '../ModalRecommendUser';
import ModalRecommendations from '../ModalRecommendations';
import ModalChatDetail from '../ModalChatDetail';
import ModalAddToConversation from '../ModalAddToConversation';
import ModalResendMessage from '../ModalResendMessage';
import ModalEntryQuery from '../ModalEntryQuery';
import ModalReportedErrors from '../ModalReportedErrors';
import ModalEndChat from '../ModalEndChat';
import ModalFrequentQuery from '../ModalFrequentQuery';
import ModalNotificationOptions from '../ModalNotificationOptions';
import ModalNewCompanyNotification from '../ModalNewCompanyNotification';
import ModalNewCompaniesNotification from '../ModalNewCompaniesNotification';
import ModalAddFrequentQuery from '../ModalAddFrequentQuery';
import ModalNotificationTo from '../ModalNotificationTo';
import ModalNotificationCompanyTo from '../ModalNotificationCompanyTo';

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
            case "ModalRecommendUser":
                return <ModalRecommendUser {...props}/>
            case "ModalRecommendations":
                return <ModalRecommendations {...props}/>
            case "ModalChatDetail":
                return <ModalChatDetail {...props}/>
            case "ModalAddToConversation":
                return <ModalAddToConversation {...props}/>
            case "ModalResendMessage":
                return <ModalResendMessage {...props}/>
            case "ModalEntryQuery":
                return <ModalEntryQuery {...props}/>
            case "ModalReportedErrors":
                return <ModalReportedErrors {...props}/>
            case "ModalEndChat":
                return <ModalEndChat {...props}/>
            case "ModalFrequentQuery":
                return <ModalFrequentQuery {...props}/>
            case "ModalNotificationOptions":
                return <ModalNotificationOptions {...props}/>
            case "ModalNewCompanyNotification":
                return <ModalNewCompanyNotification {...props}/>
            case "ModalNewCompaniesNotification":
                return <ModalNewCompaniesNotification {...props}/>
            case "ModalAddFrequentQuery":
                return <ModalAddFrequentQuery {...props}/>
            case "ModalNotificationTo":
                return <ModalNotificationTo {...props}/>
            case "ModalNotificationCompanyTo":
                return <ModalNotificationCompanyTo {...props}/>
            default:
                return null;
        }
    }

    return getCustomModal(props.customModal);
}

const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(withRouter(CustomModal));
