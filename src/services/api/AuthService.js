import axios from '../../utils/axios';
import config from "../../config/Config";

class AuthService {

    async renewToken() {
        return await axios.get(
            config.apiVersion + `mgmt/session/renew`,
            { 
                headers: {
                    ...config.headers, 
                    Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
                }
            }
    )}
   
}

export default AuthService;