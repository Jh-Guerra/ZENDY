import axios from '../../utils/axios';
import config from "../../config/Config";
import { defaultHeaders, getCustomUrl } from 'utils/common';

const apiPrefix = config.apiVersion + "chats";
const apiPrefix2 = config.apiVersion + "chats-internal";
const apiPrefix3 = config.apiVersion + "chats-company";
const apiPrefix4 = config.apiVersion + "chats-client";

class ChatService {

    async listActiveChats(term, status) {
        return await axios.get( getCustomUrl(apiPrefix, `/active-list?term=${term}&status=${status}`), defaultHeaders());
    }

    async createClientChat(data) {
        return await axios.post( getCustomUrl(apiPrefix4, `/register`), data, defaultHeaders());
    }

    async createCompanyChat(users, company, allChecked) {
        return await axios.post( getCustomUrl(apiPrefix3, `/register`), { users, company, allChecked }, defaultHeaders());
    }

    async createInternalChat(data) {
        return await axios.post( getCustomUrl(apiPrefix2, `/register`), data, defaultHeaders());
    }

    async findChat(id) {
        return await axios.get( getCustomUrl(apiPrefix, `/find/${id}`), defaultHeaders());
    }

    async deleteChat(id) {
        return await axios.delete( getCustomUrl(apiPrefix, `/delete/${id}`), defaultHeaders());
    }

    async finalizeChat(idChat, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/finalize/${idChat}`), data, defaultHeaders());
    }

    async nameChat(idChat, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/name/${idChat}`), {name: data}, defaultHeaders());
    }

    async listAvailableUsersByCompany(roles, term) {
        return await axios.post( getCustomUrl(apiPrefix, `/available-by-company?term=${term || ""}`), { roles: roles}, defaultHeaders());
    }
}

export default ChatService;