import axios from '../../utils/axios';
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

    async listStatusChats(term, status) {
        return await axios.get(
            config.apiVersion + `chats/list?term=${term}`,
            { 
                headers: {
                    ...config.headers, 
                    Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
                },
                params: { status }
            }
    )}


//  CHAT - CLIENT ...................................................................................

    async createClientChat(data) {
        return await axios.post(
            config.apiVersion + `chats-client/register`, 
            data,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
            } }
    )}

    async listClientChats(term) {
        return await axios.get(
            config.apiVersion + `chats-client/list?term=${term}`,
            { 
                headers: {
                    ...config.headers, 
                    Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
                }
            }
    )}

//  CHAT - COMPANY ...................................................................................
    async createCompanyChat(userIds, companyId, allChecked) {
        return await axios.post(
            config.apiVersion + `chats-company/register`,
            {userIds, companyId, allChecked},
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
            } }
    )}

    // async listClientChats(term) {
    //     return await axios.get(
    //         config.apiVersion + `chats-client/list?term=${term}`,
    //         { 
    //             headers: {
    //                 ...config.headers, 
    //                 Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
    //             }
    //         }
    // )}

//  CHAT - INTERNAL ...................................................................................
    async createInternalChat(data) {
        return await axios.post(
            config.apiVersion + `chats-internal/register`, 
            data,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
            } }
    )}

    async listInternalChats(term) {
        return await axios.get(
            config.apiVersion + `chats-internal/list?term=${term}`,
            { 
                headers: {
                    ...config.headers, 
                    Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
                }
            }
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