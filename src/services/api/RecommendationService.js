import axios from 'axios';
import config from "../../config/Config";

class RecommendationService {
    
    async createRecommendation(data) {
        return await axios.post(
            config.apiVersion + `recommendations/register`, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async updateRecommendation(id, data) {
        return await axios.post(
            config.apiVersion + `recommendations/update/` + id, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async findRecommendation(id) {
        return await axios.get(
            config.apiVersion + `recommendations/find/` + id,
            { 
                headers: config.headers
            }
    )}

    async listRecommendations() {
        return await axios.get(
            config.apiVersion + `recommendations/list`,
            { 
                headers: config.headers
            }
    )}

    async deleteRecommendation(id) {
        return await axios.delete(
            config.apiVersion + `recommendations/delete/` + id,
            { 
                headers: config.headers 
            }
    )}
   
}

export default RecommendationService;