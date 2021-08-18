import axios from '../../utils/axios';
import config from "../../config/Config";

class MessageService {

    async createMessage(data) {
        return await axios.post(
            config.apiVersion + `message/create`, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async findMessage(idChat, idUser) {
        return await axios.get(
            config.apiVersion + `messages/find/`,
            { 
                headers: config.headers,
                params: {
                    idChat : idChat,
                    idUser : idUser
                }
            }
    )}

    async listMessage(idChat) {
        return await axios.get(
            config.apiVersion + `messages/list` +idChat,
            { 
                headers: config.headers
            }
    )}

    async deleteMessage(idChat, idUser) {
        return await axios.delete(
            config.apiVersion + `messages/delete/`,
            { 
                headers: config.headers,
                params: {
                    idChat : idChat,
                    idUser : idUser
                }
            }
    )}
}

export default MessageService;