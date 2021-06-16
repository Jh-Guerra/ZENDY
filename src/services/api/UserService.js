import axios from 'axios';
import config from "../../config/Config";

class UserService {

    async listUsers() {
        return await axios.get(
            config.apiVersion + `users/list`,
            { 
                headers: config.headers
            }
    )}
   
}

export default UserService;