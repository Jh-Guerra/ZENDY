import AuthService from 'services/api/AuthService';
import {
    AUTH_SUCCESS,
    AUTH_LOGOUT
} from '../redux/common/Types'

const authService = new AuthService()

export const authSuccess = payload => ({
    type: AUTH_SUCCESS,
    payload: payload
})

export const logOut = () => ({
    type: AUTH_LOGOUT
})

export const setCurrentSession = (user) => async dispatch => {
    try{
        dispatch(authSuccess(user));
        return user;
    }catch(e){
        
    }
}

export const renewToken = () => async dispatch => {
    try{
        const res = await authService.renewToken();
        dispatch(authSuccess(res.data));
    }
    catch(e){
    }
}