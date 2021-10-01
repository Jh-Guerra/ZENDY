import axios from '../../utils/axios';
import config from "../../config/Config";
import { defaultHeaders, getCustomUrl } from 'utils/common';

const apiPrefix = config.apiVersion + "errors";

class ErrorService {    
    async createError(data) {
        return await axios.post( getCustomUrl(apiPrefix, `/register`), data, defaultHeaders() );
    }

    async findError(id) {
        return await axios.get( getCustomUrl(apiPrefix, `/find/${id}`), defaultHeaders() );
    }

    async confirmError(id) {
        return await axios.get( getCustomUrl(apiPrefix, `/confirmError/${id}`), defaultHeaders() );
    }

    async errorSolved(id) {
        return await axios.delete( getCustomUrl(apiPrefix, `/errorSolved/${id}`), defaultHeaders() )
    }

    async listErrors(term) {
        return await axios.get( getCustomUrl(apiPrefix, `/list?term=${term}`), defaultHeaders());
    }

    async updateError(id, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/update/${id}`), data, defaultHeaders());
    }

    async listErrorsByUser(term) {
        return await axios.get( getCustomUrl(apiPrefix, `/list-by-user?term=${term}`), defaultHeaders());
    }

    async deleteError(id) {
        return await axios.delete( getCustomUrl(apiPrefix, `/delete/${id}`), defaultHeaders() )
    }

    async fakeError(id) {
        return await axios.delete( getCustomUrl(apiPrefix, `/fakeError/${id}`), defaultHeaders() )
    }
}

export default ErrorService;