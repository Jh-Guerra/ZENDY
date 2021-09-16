import axios from '../../utils/axios';
import config from "../../config/Config";
class ErrorService {    
    async createError(data) {
        return await axios.post( 
            config.apiVersion + `errors/register`, 
            data,
            { 
                headers: { 
                    ...config.headers, 
                    Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            } 
    )}

    async findError(id) {
        return await axios.get( 
            config.apiVersion + `errors/find/` + id, 
            { 
                headers: { 
                    ...config.headers, 
                    Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            } 

    )}

    async listErrors(term="") {
        return await axios.get( 
            config.apiVersion + `errors/list?term=${term}`, 
            { 
                headers: { 
                    ...config.headers, 
                    Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            } 
    )}

    async listErrorsByUser(term="") {
        return await axios.get( 
            config.apiVersion + `errors/list-by-user?term=${term}`, 
            { 
                headers: { 
                    ...config.headers, 
                    Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            }
    )}

    async deleteError(id) {
        return await axios.delete( 
            config.apiVersion + `errors/delete/` + id, 
            { 
                headers: { 
                    ...config.headers, 
                    Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            }  
    )}
}

export default ErrorService;