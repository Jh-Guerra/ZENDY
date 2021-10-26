 import LoginService from 'services/api/LoginService';

const loginService = new LoginService()

export const loginUser = (body) => async dispatch => {
  const res = await loginService.loginUser(body).then((response) => {
    if (response.data) {
      localStorage.setItem("session", JSON.stringify(response.data));
    }
    return response.data;
  });
  return res && res || {};
}

export const loginErp = (body) => async dispatch => {
  const res = await loginService.loginErp(body).then((response) => {
    if (response.data) {
      localStorage.setItem("session", JSON.stringify(response.data));
    }
    return response.data;
  });
  return res && res.data || {};
}