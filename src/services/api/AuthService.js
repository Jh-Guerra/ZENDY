import axios from 'axios';
import config from "../../config/Config";

class AuthService {

    // async changeShopId(shopId) {
    //     return await axios.post(
    //         config.apiVersion + `mgmt/session/shop`, 
    //         { shopId:shopId },
    //         { headers: {
    //             ...config.headers, 
    //             Authorization: `token ${JSON.parse(localStorage.getItem('user')).accessToken || ''}` 
    //         } }
    // )}

    async renewToken() {
        return await axios.get(
            config.apiVersion + `mgmt/session/renew`,
            { 
                headers: {
                    ...config.headers, 
                    Authorization: `token ${JSON.parse(localStorage.getItem('user')).accessToken || ''}` 
                }
            }
    )}
   
}

export default AuthService;