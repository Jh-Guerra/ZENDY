import axios from 'axios';
import config from "../../config/Config";

class NotificationViewService {
    
    async createNotificationView(data) {
        return await axios.post(
            config.apiVersion + `NotificationView/create`, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async updateNotificationView(idUsuario, idNotification) {
        return await axios.post(
            config.apiVersion + `NotificationView/update`,
            { 
                headers: {...config.headers},
                params: {
                    idUsuario: idUsuario,
                    idNotification: idNotification
                } 
            }
    )}

    async listNotificationView(idNotification) {
        return await axios.get(
            config.apiVersion + `NotificationView/list`+idNotification,
            { 
                headers: config.headers
            }
    )}
   
}

export default NotificationViewService;