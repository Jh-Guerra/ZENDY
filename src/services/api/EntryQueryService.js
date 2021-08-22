import axios from '../../utils/axios';
import config from "../../config/Config";

const apiPrefix = config.apiVersion + "entry-queries";

const defaultHeaders = () => { 
    return {
        headers: {
            ...config.headers, 
            Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
        }
    }
};

const getCustomUrl = (url) => {
    return apiPrefix + url;
}

class EntryQueryService {    
    async createEntryQuery(data) {
        return await axios.post( getCustomUrl(`/register`), data, defaultHeaders() );
    }

    async findEntryQuery(id) {
        return await axios.get( getCustomUrl(`/find/${id}`), defaultHeaders() );
    }

    async listEntryQueries(term) {
        return await axios.get( getCustomUrl(`/list?term=${term}`), defaultHeaders());
    }

    async listPendingQueries(term) {
        return await axios.get( getCustomUrl(`/list-pendings?term=${term}`), defaultHeaders());
    }

    async deleteEntryQuery(id) {
        return await axios.delete( getCustomUrl(`/delete/${id}`), defaultHeaders() )
    }
}

export default EntryQueryService;