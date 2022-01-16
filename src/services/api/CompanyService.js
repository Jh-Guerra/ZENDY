import axios from '../../utils/axios';
import config from "../../config/Config";
import { defaultHeaders, getCustomUrl } from 'utils/common';

const apiPrefix = config.apiVersion + "companies";

class CompanyService {


    async createCompany(data) {
        return await axios.post( getCustomUrl(apiPrefix, `/register`), data, defaultHeaders() );
    }

    async updateCompany(id, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/update/${id}`), data, defaultHeaders());
    }

    async findCompany(id) {
        return await axios.get( getCustomUrl(apiPrefix, `/find/${id}`), defaultHeaders() );
    }

    async updateHelpDeskCompany(id) {
        return await axios.get( getCustomUrl(apiPrefix, `/updateHelpDeskCompany/${id}`), defaultHeaders() );
    }

    async listCompanies(term="") {
        return await axios.get( getCustomUrl(apiPrefix, `/list?term=${term}`), defaultHeaders() );
    }

    async listCompaniesClient(term="") {
        return await axios.get( getCustomUrl(apiPrefix, `/list-client?term=${term}`), defaultHeaders() );
    }

    async listCompaniesHelpdesk(term="") {
        return await axios.get( getCustomUrl(apiPrefix, `/list-helpdesk?term=${term}`), defaultHeaders() );
    }

    async listWithUsersCount() {
        return await axios.get( getCustomUrl(apiPrefix, `/list/count/users`), defaultHeaders() );
    }

    async deleteCompany(id) {
        return await axios.delete( getCustomUrl(apiPrefix, `/delete/${id}`), defaultHeaders() )
    }

    async deleteImageCompany(imageLink, id) {
        return await axios.post( getCustomUrl(apiPrefix, `/deleteImage`), {imageLink, id}, defaultHeaders() );
    }

    async importErpCompanies() {
        return await axios.post( getCustomUrl(apiPrefix, `/import-erp`), {}, defaultHeaders() );
    }
   
}

export default CompanyService;