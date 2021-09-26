import axios from '../../utils/axios';
import config from "../../config/Config";

class CompanyService {
    
    async findFrequentQuery(id) {
        return await axios.get(
            config.apiVersion + `frequentQueries/find/` + id,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            }
    )}

    async listFrequentQueries() {
        return await axios.get(
            config.apiVersion + `frequentQueries/list`,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            }
    )}   
}

export default CompanyService;