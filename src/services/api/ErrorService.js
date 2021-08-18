import axios from '../../utils/axios';
import config from "../../config/Config";

class ErrorService {
    
    async createError(data) {
        return await axios.post(
            config.apiVersion + `errors/register`, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async updateError(id, data) {
        return await axios.post(
            config.apiVersion + `errors/update/` + id, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async findError(id) {
        return await axios.get(
            config.apiVersion + `errors/find/` + id,
            { 
                headers: config.headers
            }
    )}

    async listErrors() {
        return await axios.get(
            config.apiVersion + `errors/list`,
            { 
                headers: config.headers
            }
    )}

    async deleteError(id) {
        return await axios.delete(
            config.apiVersion + `errors/delete/` + id,
            { 
                headers: config.headers 
            }
    )}
   
}

export default ErrorService;