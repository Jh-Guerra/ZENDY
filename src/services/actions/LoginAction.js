 import LoginService from 'services/api/LoginService';

const loginService = new LoginService()

export const loginUser = (body, tokenFirebase) => async dispatch => {
  const res = await loginService.loginUser(body).then((response) => {
    if (response.data) {
      localStorage.setItem("session", JSON.stringify(response.data));
      UpdateToken(body, tokenFirebase);
    }
    return response.data;
  });
  return res && res || {};
}

export const loginErp = (body, tokenFirebase) => async dispatch => {
  const res = await loginService.loginErp(body).then((response) => {
    if (response.data) {
      localStorage.setItem("session", JSON.stringify(response.data));
      UpdateToken(body, tokenFirebase);
    }
    return response.data;
  });
  return res && res.data || {};
}

const UpdateToken= async (body, token_value)=>{
  const res = await loginService.UpdateToken(body, token_value).then((resp)=>{
    if(resp.data)
    {
      return resp;
    }
  })
}