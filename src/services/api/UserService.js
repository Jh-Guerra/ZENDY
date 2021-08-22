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

    async listAvailableUsers(type, term) {
        return await axios.get(
            config.apiVersion + `users/list-available`,
            { 
                headers: {
                    ...config.headers, 
                    Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
                },
                params: { term, type }
            }
    )}

    async listUsersByCompany(company="", term="") {
        return await axios.get(
            config.apiVersion + `users/list-by-company?company=${company}&term=${term}`,
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
}

export default UserService;