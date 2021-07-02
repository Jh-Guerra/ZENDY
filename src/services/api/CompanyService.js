import axios from 'axios';
import config from "../../config/Config";

class CompanyService {
    
    async createCompany(data) {
        return await axios.post(
            config.apiVersion + `companies/register`, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async updateCompany(id, data) {
        return await axios.post(
            config.apiVersion + `companies/update/` + id, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async findCompany(id) {
        return await axios.get(
            config.apiVersion + `companies/find/` + id,
            { 
                headers: config.headers
            }
    )}

    async listCompanies() {
        return await axios.get(
            config.apiVersion + `companies/list`,
            { 
                headers: config.headers
            }
    )}

    async deleteCompany(id) {
        return await axios.delete(
            config.apiVersion + `companies/delete/` + id,
            { 
                headers: config.headers 
            }
    )}
   
}

export default CompanyService;