 import LoginService from 'services/api/LoginService';

const loginService = new LoginService()

export const loginUser = ({email='', password=''}) => async dispatch => {
    
        const body ={email:email, password:password}
        const res = await loginService.loginUser(body).then((response) => {
            if (response.data) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
      
            return response.data;
          });
        return res && res.data || {};

} 
