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

export const findUserByUserName = (username, rut) => async dispatch => {
    const res = await userService.findUserByUserName(username, rut);
    return res && res.data || [];
}

export const sendEmail = (id,email) => async dispatch => {
    const res = await userService.sendEmail(id,email);
    return res && res.data || [];
}

export const listUsers = (term='',termCompany='',perPageData,pageData) => async dispatch => {
    console.log(termCompany)
    const res = await userService.listUsers(term,termCompany,perPageData,pageData);
    return res && res.data.data || [];
}

export const listAvailableUsers = (type, term, idCompany) => async dispatch => {
    const res = await userService.listAvailableUsers(type, term, idCompany);
    return res && res.data || [];
}

export const listAdmins = (term) => async dispatch => {
    const res = await userService.listAdmins(term);
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

export const listUsersOnline = () => async dispatch => {
    const res = await userService.listUsersOnline();
    return res && res.data || [];
}
export const updateStatus = (id, data) => async dispatch => {
    const res = await userService.updateStatus(id, data);
    return res && res.data || [];
}

export const deleteImageUser = (imageLink,id) => async dispatch => {
    const res = await userService.deleteImageUser(imageLink,id);
    return res && res.data || [];
}

export const listUsersSameCompany = (term) => async dispatch => {
    const res = await userService.listUsersSameCompany(term);
    return res && res.data || [];
}

export const listCompanyNotify = (term) => async dispatch => {
    const res = await userService.listCompanyNotify(term);
    return res && res.data || [];
}

export const getRoles = () => async dispatch => {
    const res = await userService.getRoles();
    return res && res.data || [];
}

export const importErpUsers = () => async dispatch => {
    const res = await userService.importErpUsers();
    return res && res.data || [];
}

export const updatePassword = (id, data) => async dispatch => {
    const res = await userService.updatePassword(id, data);
    return res && res.data || [];
}

export const changeHelpDesk = (idUser, helpdesk) => async dispatch => {
    const res = await userService.changeHelpDesk(idUser, helpdesk);
    return res && res.data || {};
}

export const VerifyUser = (username , ruc) => async dispatch => {
    const res = await userService.VerifyUser(username,ruc);
    return res && res.data || [];
}

export const updateChangePasswordByErp = (id, data) => async dispatch => {
    const res = await userService.updateChangePasswordByErp(id, data);
    return res && res.data || [];
}

export const RegisterNewUser = () => async dispatch => {
    const res = await userService.RegisterNewUser();
    return res && res.data || [];
}

export const updateDeviceToken = (id, data) => async dispatch => {
    const res = await userService.updateDeviceToken(id, data);
    return res && res.data || [];
}

export const logoutLaravel = () => async dispatch => {
    const res = await userService.logoutLaravel();
    return res && res.data || [];
}