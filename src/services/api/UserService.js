import axios from '../../utils/axios';
import config from "../../config/Config";
import { defaultHeaders, getCustomUrl } from 'utils/common';

const apiPrefix = config.apiVersion + "users";

class UserService {
    
    async createUser(data) {
        return await axios.post( getCustomUrl(apiPrefix, `/register`), data, defaultHeaders() );
    }

    async updateUser(id, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/update/${id}`), data, defaultHeaders());
    }

    async findUser(id) {
        return await axios.get( getCustomUrl(apiPrefix, `/find/${id}`), defaultHeaders() );
    }

    async findUserByUserName(username, rut="") {
        return await axios.get( getCustomUrl(config.apiVersion, `findUser/${username}?rut=${rut}`), defaultHeaders() );
    }

    async sendEmail(id, email) {
        return await axios.post( getCustomUrl(config.apiVersion, `sendEmail/${id}`), {email}, defaultHeaders());
    }

    async listUsers(term="",termCompany='',perPageData,pageData) {
        console.log(termCompany)
        return await axios.get( getCustomUrl(apiPrefix, `/list?term=${term}&termCompany=${termCompany}&per_page=${perPageData}&page=${pageData}`), defaultHeaders() );
    }

    async listAvailableUsers(type, term="", oldIdCompany) {
        return await axios.post( getCustomUrl(apiPrefix, `/list-available?term=${term}`), { roles: type }, defaultHeaders() );
    }

    async listAdmins(term="") {
        return await axios.get( getCustomUrl(apiPrefix, `/list-admins?term=${term}`), defaultHeaders() );
    }

    async listUsersByCompany(companyId="", term="") {
        return await axios.get( getCustomUrl(apiPrefix, `/list-by-company/${companyId}?term=${term}`), defaultHeaders() );
    }

    async deleteUser(id) {
        return await axios.delete( getCustomUrl(apiPrefix, `/delete/${id}`), defaultHeaders() )
    }

    async listUsersOnline() {
        return await axios.get( getCustomUrl(apiPrefix, `/listUserOnline`), defaultHeaders() );
    }

    async updateStatus(id, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/updateStatus/${id}`), data, defaultHeaders() );
    }

    async deleteImageUser(imageLink, id) {
        return await axios.post( getCustomUrl(apiPrefix, `/deleteImage`), {imageLink, id}, defaultHeaders() );
    }

    async listUsersSameCompany(term="") {
        return await axios.get( getCustomUrl(apiPrefix, `/list-same-company?term=${term}`), defaultHeaders() );
    }

    async listCompanyNotify(term="") {
        return await axios.get( getCustomUrl(apiPrefix, `/list-company-notify?term=${term}`), defaultHeaders() );
    }
    
    async getRoles() {
        return await axios.get( getCustomUrl(config.apiVersion, `roles/list`), defaultHeaders() );
    }

    async importErpUsers() {
        return await axios.post( getCustomUrl(apiPrefix, `/import-erp`), {}, defaultHeaders() );
    }

    async updatePassword(id, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/update-password/${id}`), data, defaultHeaders() );
    }

    async changeHelpDesk(idUser, helpdesk) {
        return await axios.post( getCustomUrl(apiPrefix, `/changeHelpDesk/${idUser}`), helpdesk, defaultHeaders() );
    }

    async VerifyUser(username,ruc)
    {
        return await axios.post(getCustomUrl(apiPrefix, `/existsUser?username=${username}&rut=${ruc}`), {}, defaultHeaders() );
    }

    async updateChangePasswordByErp(id, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/changePassword/${id}`), data, defaultHeaders() );
    }

    async RegisterNewUser()
    {
        return await axios.post( getCustomUrl(config.apiVersion, `syncUsers/sincronizarUsuarios`),{}, defaultHeaders() ); 
    }//modificar el endpoind

    async updateDeviceToken(id, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/updateDeviceToken/${id}`), data, defaultHeaders() );
    }

    async logoutLaravel() {
        return await axios.post( getCustomUrl(apiPrefix, `/logoutLaravel`), {}, defaultHeaders() );
    }

    async ResendPassword(row) {
        return await axios.get(getCustomUrl(apiPrefix, `/resend-password/${row.id}`), defaultHeaders());
    }

}

export default UserService;