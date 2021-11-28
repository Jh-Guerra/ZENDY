import axios from '../../utils/axios';
import config from "../../config/Config";
import { defaultHeaders, getCustomUrl } from 'utils/common';

const apiPrefix = config.apiVersion + "organizations";

class OrganizationService {

    async createOrganization(data) {
        return await axios.post( getCustomUrl(apiPrefix, `/register`), data, defaultHeaders() );
    }

    async updateOrganization(id, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/update/${id}`), data, defaultHeaders());
    }

    async findOrganization(id) {
        return await axios.get( getCustomUrl(apiPrefix, `/find/${id}`), defaultHeaders() );
    }

    async listOrganizations(term="") {
        return await axios.get( getCustomUrl(apiPrefix, `/list?term=${term}`), defaultHeaders() );
    }

    async listOWithUsersCount(term="") {
        return await axios.get( getCustomUrl(apiPrefix, `/list/count/users?term=${term}`), defaultHeaders() );
    }

    async deleteOrganization(id) {
        return await axios.delete( getCustomUrl(apiPrefix, `/delete/${id}`), defaultHeaders() )
    }

    async deleteImageOrganization(imageLink, id) {
        return await axios.post( getCustomUrl(apiPrefix, `/deleteImage`), {imageLink, id}, defaultHeaders() );
    }
   
}

export default OrganizationService;