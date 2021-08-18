import axios from '../../utils/axios';
import config from "../../config/Config";

class LoginService {

    async loginUser (body){
        return await axios.post(
            config.apiVersion + `login`,
            body,
            {
                headers: config.headers,
                //body: JSON.stringify({ email, password })
            }

        )
    }   

}


export default LoginService;
 
