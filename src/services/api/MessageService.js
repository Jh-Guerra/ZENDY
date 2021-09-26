import axios from '../../utils/axios';
import config from "../../config/Config";
import { defaultHeaders, getCustomUrl } from 'utils/common';

const apiPrefix = config.apiVersion + "messages";

class EntryQueryService {    
    async createMessage(data) {
        return await axios.post( getCustomUrl(apiPrefix, `/register`), data, defaultHeaders() );
    }

    async findMessage(id) {
        return await axios.get( getCustomUrl(apiPrefix, `/find/${id}`), defaultHeaders() );
    }

    async listMessages(idChat) {
        return await axios.get( getCustomUrl(apiPrefix, `/list/${idChat}`), defaultHeaders());
    }

    async deleteMessage(id) {
        return await axios.delete( getCustomUrl(apiPrefix, `/delete/${id}`), defaultHeaders() )
    }
}

export default EntryQueryService;