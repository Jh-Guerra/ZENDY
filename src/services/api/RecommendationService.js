import axios from '../../utils/axios';
import config from "../../config/Config";
import { defaultHeaders, getCustomUrl } from 'utils/common';

const apiPrefix = config.apiVersion + "recommendations";

class RecommendationService {    
    async createRecommendation(data) {
        return await axios.post( getCustomUrl(apiPrefix, `/register`), data, defaultHeaders() );
    }

    async updateRecommendation(id, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/update/${id}`), data, defaultHeaders());
    }

    async findRecommendation(id) {
        return await axios.get( getCustomUrl(apiPrefix, `/find/${id}`), defaultHeaders() );
    }

    async listRecommendations(term) {
        return await axios.get( getCustomUrl(apiPrefix, `/list?term=${term}`), defaultHeaders());
    }

    async listMyRecommendations(term) {
        return await axios.get( getCustomUrl(apiPrefix, `/list-my-recommendations`), defaultHeaders());
    }

    async listRecommendationsByEntryQuery(idEntryQuery) {
        return await axios.get( getCustomUrl(apiPrefix, `/list-by-entry-query/` + idEntryQuery), defaultHeaders());
    }

    async deleteRecommendation(id) {
        return await axios.delete( getCustomUrl(apiPrefix, `/delete/${id}`), defaultHeaders() )
    }

}

export default RecommendationService;