import UserService from 'services/api/UserService';

const userService = new UserService()

export const createUser = (data) => async dispatch => {
    const res = await userService.createUser(data);
    return res && res.data || [];
}

export const updateUser = (id, data) => async dispatch => {
    const res = await userService.updateUser(id, data);
    return res && res.data || [];
}

export const findUser = (id) => async dispatch => {
    const res = await userService.findUser(id);
    return res && res.data || [];
}

export const listUsers = (term) => async dispatch => {
    const res = await userService.listUsers(term);
    return res && res.data || [];
}

export const listUsersByCompany = (company, term) => async dispatch => {
    const res = await userService.listUsersByCompany(company, term);
    return res && res.data || [];
}

export const deleteUser = (id) => async dispatch => {
    const res = await userService.deleteUser(id);
    return res && res.data || [];
}