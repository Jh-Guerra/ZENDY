import axios from '../../utils/axios';
import config from "../../config/Config";

class ModuleService {
    
    async findModule(id) {
        return await axios.get(
            config.apiVersion + `module/find/` + id,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            }
    )}

    async listModules() {
        return await axios.get(
            config.apiVersion + `module/list`,
            { 
                headers: { ...config.headers, Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` }
            }
    )}   
}

export default ModuleService;