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

    async listErrors(term) {
        return await axios.get( getCustomUrl(apiPrefix, `/list?term=${term}`), defaultHeaders());
    }

    async listErrorsByUser(term) {
        return await axios.get( getCustomUrl(apiPrefix, `/list-by-user?term=${term}`), defaultHeaders());
    }

    async deleteError(id) {
        return await axios.delete( getCustomUrl(apiPrefix, `/delete/${id}`), defaultHeaders() )
    }
}

export default ErrorService;