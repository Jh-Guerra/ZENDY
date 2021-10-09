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

    async updateNotification(id, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/update/` + id), data, defaultHeaders() );
    }

    async updateListUsersNotified(id, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/update-users-notified/` + id), data, defaultHeaders() );
    }

    async findNotification(id) {
        return await axios.get( getCustomUrl(apiPrefix, `/find/${id}`), defaultHeaders() );
    }

    async listAdminNotifications(term) {
        return await axios.get( getCustomUrl(apiPrefix, `/admin/list?term=${term}`), defaultHeaders());
    }

    async listNotificationsByCompany(term) {
        return await axios.get( getCustomUrl(apiPrefix, `/company/list?term=${term}`), defaultHeaders());
    }

    async listNotificationsByUser(term, status) {
        return await axios.get( getCustomUrl(apiPrefix, `/user/list/${status || 'Pendiente'}?term=${term}`), defaultHeaders());
    }

    async deleteNotification(id) {
        return await axios.delete( getCustomUrl(apiPrefix, `/delete/${id}`), defaultHeaders() )
    }

    async deleteImage(imageLink,id) {
        return await axios.post( getCustomUrl(apiPrefix, `/deleteImage`), {imageLink,id}, defaultHeaders() )
    }
    async updateListCompaniesNotified(id, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/update-companies-notified/` + id), data, defaultHeaders() );
    }
}

export default NotificationService;