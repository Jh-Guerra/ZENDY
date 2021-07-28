import axios from 'axios';
import config from "../../config/Config";

class ChatService {
    
    async createChat(data) {
        return await axios.post(
            config.apiVersion + `chats/register`, 
            data,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
            } }
    )}

    async createClientChat(data) {
        return await axios.post(
            config.apiVersion + `chats-client/register`, 
            data,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
            } }
    )}

    async listClientChats() {
        return await axios.get(
            config.apiVersion + `chats-client/list`,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
            } }
    )}

    async updateChat(id, data) {
        return await axios.post(
            config.apiVersion + `chats/update/` + id, 
            data,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
            } }
    )}

    async findChat(id) {
        return await axios.get(
            config.apiVersion + `chats/find/` + id,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
            } }
    )}

    async listChats() {
        return await axios.get(
            config.apiVersion + `chats/list`,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
            } }
    )}

    async deleteChat(id) {
        return await axios.delete(
            config.apiVersion + `chats/delete/` + id,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
            } }
    )}
   
}

export default ChatService;