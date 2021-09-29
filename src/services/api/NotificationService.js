import axios from '../../utils/axios';
import config from "../../config/Config";
import { defaultHeaders, getCustomUrl } from 'utils/common';

const apiPrefix = config.apiVersion + "notifications";

class NotificationService {    
    async createCompanyNotification(data) {
        return await axios.post( getCustomUrl(apiPrefix, `/register-company`), data, defaultHeaders() );
    }

    async createCompaniesNotification(data) {
        return await axios.post( getCustomUrl(apiPrefix, `/register-companies`), data, defaultHeaders() );
    }

    async findNotification(id) {
        return await axios.get( getCustomUrl(apiPrefix, `/find/${id}`), defaultHeaders() );
    }

    async listAdminNotifications(term) {
        return await axios.get( getCustomUrl(apiPrefix, `/admin/list?term=${term}`), defaultHeaders());
    }

    async listNotifications(term) {
        return await axios.get( getCustomUrl(apiPrefix, `/list?term=${term}`), defaultHeaders());
    }

    async deleteNotification(id) {
        return await axios.delete( getCustomUrl(apiPrefix, `/delete/${id}`), defaultHeaders() )
    }

}

export default NotificationService;