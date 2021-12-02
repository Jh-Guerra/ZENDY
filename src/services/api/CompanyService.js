import axios from '../../utils/axios';
import config from "../../config/Config";

class CompanyService {
    
    async createCompany(data) {
        return await axios.post(
            config.apiVersion + `companies/register`, 
            data,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            }
    )}

    async updateCompany(id, data) {
        return await axios.post(
            config.apiVersion + `companies/update/` + id, 
            data,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            }
    )}

    async findCompany(id) {
        return await axios.get(
            config.apiVersion + `companies/find/` + id,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            }
    )}

    async listCompanies() {
        return await axios.get(
            config.apiVersion + `companies/list`,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            }
    )}

    async listHelpDeskCompanies() {
        return await axios.get(
            config.apiVersion + `companies/listHelpDesk`,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            }
    )}

    async listWithUsersCount(term) {
        return await axios.get(
            config.apiVersion + `companies/list/count/users`,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` },
                params: { term } 
            }
    )}

    async deleteCompany(id) {
        return await axios.delete(
            config.apiVersion + `companies/delete/` + id,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            }
    )}

    async deleteImageCompany(imageLink,id) {
        return await axios.post(
            config.apiVersion + `companies/deleteImage`, 
            {imageLink,id},
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            }
    )}

    async importErpCompanies() {
        return await axios.post(
            config.apiVersion + `companies/import-erp`,
            {},
            { headers: {
                ...config.headers, 
                Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
            } }
    )}
   
}

export default CompanyService;