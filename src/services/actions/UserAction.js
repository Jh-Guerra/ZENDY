import UserService from 'services/api/UserService';

const userService = new UserService()

export const listUsers = () => async dispatch => {
    try{
        const res = await userService.listUsers();
        return res && res.data || [];
    } catch(e){ }
}