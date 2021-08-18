import axios from '../../utils/axios';
import config from "../../config/Config";

class NotificationService {
    
    async createNotification(data) {
        return await axios.post(
            config.apiVersion + `notification/create`, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async updateNotification(idNotification, idUser, idError, data) {
        return await axios.post(
            config.apiVersion + `notification/update/`, 
            data,
            { 
                headers: config.headers,
                params: {
                    idNotification : idNotification,
                    idUser : idUser,
                    idError : idError
                } 
            }
    )}

    async findNotification(idNotification) {
        return await axios.get(
            config.apiVersion + `notification/find/` + idNotification,
            { 
                headers: config.headers
            }
    )}

    async listNotification() {
        return await axios.get(
            config.apiVersion + `notification/list`,
            { 
                headers: config.headers
            }
    )}

}

export default NotificationService;