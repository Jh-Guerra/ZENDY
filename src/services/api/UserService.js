import axios from '../../utils/axios';
import config from "../../config/Config";

class UserService {
    
    async createUser(data) {
        return await axios.post(
            config.apiVersion + `register`, 
            data,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
            } }
    )}

    async updateUser(id, data) {
        return await axios.post(
            config.apiVersion + `users/update/` + id, 
            data,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
            } }
    )}

    async findUser(id) {
        return await axios.get(
            config.apiVersion + `users/find/` + id,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
            } }
    )}

    async listUsers(term="") {
        return await axios.get(
            config.apiVersion + `users/list?term=${term}`,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
            } }
    )}

    async listAvailableUsers(type, term, idCompany) {
        return await axios.post(
            config.apiVersion + `users/list-available`,
            { roles: type },
            { 
                headers: {
                    ...config.headers, 
                    Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
                },
                params: { term, idCompany }
            }
    )}

    async listAdmins(term) {
        return await axios.get(
            config.apiVersion + `users/list-admins`,
            { 
                headers: {
                    ...config.headers, 
                    Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
                },
                params: { term }
            }
    )}

    async listUsersByCompany(companyId="", term="") {
        return await axios.get(
            config.apiVersion + `users/list-by-company/${companyId}?term=${term}`,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
            } }
    )}

    async deleteUser(id) {
        return await axios.delete(
            config.apiVersion + `users/delete/` + id,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
            } }
    )}
   
    async uploadImage(){
        return await axios.post(
            config.apiVersion + `users/sample-restful-apis`,
            {},
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
            } }
        )
    }

    async listUsersOnline() {
        return await axios.get(
            config.apiVersion + `users/listUserOnline`,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
            } }
    )}

    async updateStatus(id, data) {
        return await axios.post(
            config.apiVersion + `users/updateStatus/` + id,
            data,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
            } }
    )}

    async findUserStatusOn(id, data) {
        return await axios.post(
            config.apiVersion + `users/updateStatusOn/` + id,
            data,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
            } }
    )}

    async listAvailableUsersSameCompany(type, term) {
        return await axios.post(
            config.apiVersion + `users/list-available-sameCompany`,
            { roles: type },
            { 
                headers: {
                    ...config.headers, 
                    Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
                },
                params: { term }
            }
    )}

    async deleteImageUser(imageLink,id) {
        return await axios.post(
            config.apiVersion + `users/deleteImage`, 
            {imageLink,id},
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            }
    )}

    async listUsersSameCompany(term="") {
        return await axios.get(
            config.apiVersion + `users/list-same-company?term=${term}`,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
            } }
    )}

    async listCompanyNotify(term="") {
        return await axios.get(
            config.apiVersion + `users/list-company-notify?term=${term}`,
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
            } }
    )}

}

export default UserService;