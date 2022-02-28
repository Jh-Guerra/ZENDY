import axios from '../../utils/axios';
import config from "../../config/Config";


class LoginService {

    async loginUser (body){
        return await axios.post(
            config.apiVersion + `login`,
            body,
            { headers: config.headers }

        )
    }

    async loginErp (body){
        return await axios.post(
            config.apiVersion + `login-erp`,
            body,
            { headers: config.headers }

        )
    }

    async UpdateToken(body, token_value) {
        return await axios.post(
            config.apiVersion + `device-token`,
            { body: body ,
             token: token_value },
            { headers: config.headers } 
        )
    }

}



export default LoginService;