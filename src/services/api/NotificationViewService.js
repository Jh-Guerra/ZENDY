import axios from '../../utils/axios';
import config from "../../config/Config";
import { defaultHeaders, getCustomUrl } from 'utils/common';

const apiPrefix = config.apiVersion + "notifications-viewed";

class NotificationViewedService {    
    async createNotificationViewed(data) {
        return await axios.post( getCustomUrl(apiPrefix, `/register`), data, defaultHeaders() );
    }

    async findNotificationViewed(userId, notificationId) {
        return await axios.get( getCustomUrl(apiPrefix, `/find/${userId}/${notificationId}`), defaultHeaders() );
    }

    async listNotificationViewed(notificationId) {
        return await axios.get( getCustomUrl(apiPrefix, `/list/` + notificationId), defaultHeaders());
    }

    async listNotificationViewedByUser() {
        return await axios.get( getCustomUrl(apiPrefix, `/list-by-user`), defaultHeaders());
    }

    async deleteNotificationViewed(id) {
        return await axios.delete( getCustomUrl(apiPrefix, `/delete/${id}`), defaultHeaders() )
    }

}

export default NotificationViewedService;