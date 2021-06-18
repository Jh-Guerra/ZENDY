import axios from 'axios';
import config from "../../config/Config";

class UserService {
    
    async createUser(data) {
        return await axios.post(
            config.apiVersion + `register`, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async updateUser(id, data) {
        return await axios.post(
            config.apiVersion + `users/update/` + id, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async findUser(id) {
        return await axios.get(
            config.apiVersion + `users/find/` + id,
            { 
                headers: config.headers
            }
    )}

    async listUsers() {
        return await axios.get(
            config.apiVersion + `users/list`,
            { 
                headers: config.headers
            }
    )}

    async deleteUser(id) {
        return await axios.delete(
            config.apiVersion + `users/delete/` + id,
            { 
                headers: config.headers 
            }
    )}
   
}

export default UserService;