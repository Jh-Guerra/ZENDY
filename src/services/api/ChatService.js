import axios from 'axios';
import config from "../../config/Config";

class ChatService {
    
    async createChat(data) {
        return await axios.post(
            config.apiVersion + `chats/register`, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async updateChat(id, data) {
        return await axios.post(
            config.apiVersion + `chats/update/` + id, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async findChat(id) {
        return await axios.get(
            config.apiVersion + `chats/find/` + id,
            { 
                headers: config.headers
            }
    )}

    async listChats() {
        return await axios.get(
            config.apiVersion + `chats/list`,
            { 
                headers: config.headers
            }
    )}

    async deleteChat(id) {
        return await axios.delete(
            config.apiVersion + `chats/delete/` + id,
            { 
                headers: config.headers 
            }
    )}
   
}

export default ChatService;