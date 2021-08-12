import axios from 'axios';
import config from "../../config/Config";

class CompanyService {
    
    async createCompany(data) {
        return await axios.post(
            config.apiVersion + `companies/register`, 
            data,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` }
            }
    )}

    async updateCompany(id, data) {
        return await axios.post(
            config.apiVersion + `companies/update/` + id, 
            data,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` }
            }
    )}

    async findCompany(id) {
        return await axios.get(
            config.apiVersion + `companies/find/` + id,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` }
            }
    )}

    async listCompanies() {
        return await axios.get(
            config.apiVersion + `companies/list`,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` }
            }
    )}

    async listWithUsersCount(term) {
        return await axios.get(
            config.apiVersion + `companies/list/count/users`,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` },
                params: { term } 
            }
    )}

    async deleteCompany(id) {
        return await axios.delete(
            config.apiVersion + `companies/delete/` + id,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` }
            }
    )}
   
}

export default CompanyService;