import axios from '../../utils/axios';
import config from "../../config/Config";

class AuthService {

    // async changeShopId(shopId) {
    //     return await axios.post(
    //         config.apiVersion + `mgmt/session/shop`, 
    //         { shopId:shopId },
    //         { headers: {
    //             ...config.headers, 
    //             Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
    //         } }
    // )}

    async renewToken() {
        return await axios.get(
            config.apiVersion + `mgmt/session/renew`,
            { 
                headers: {
                    ...config.headers, 
                    Authorization: `token ${JSON.parse(localStorage.getItem('user')).token || ''}` 
                }
            }
    )}
   
}

export default AuthService;