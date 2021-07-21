import CompanyService from 'services/api/CompanyService';

const companyService = new CompanyService()

export const createCompany = (data) => async dispatch => {
    const res = await companyService.createCompany(data);
    return res && res.data || [];
}

export const updateCompany = (id, data) => async dispatch => {
    const res = await companyService.updateCompany(id, data);
    return res && res.data || [];
}

export const findCompany = (id) => async dispatch => {
    const res = await companyService.findCompany(id);
    return res && res.data || [];
}

export const listCompanies = () => async dispatch => {
    const res = await companyService.listCompanies();
    return res && res.data || [];
}

export const listWithUsersCount = () => async dispatch => {
    const res = await companyService.listWithUsersCount();
    return res && res.data || [];
}

export const deleteCompany = (id) => async dispatch => {
    const res = await companyService.deleteCompany(id);
    return res && res.data || [];
}