import OrganizationService from 'services/api/OrganizationService';

const service = new OrganizationService();

export const createOrganization = (data) => async dispatch => {
    const res = await service.createOrganization(data);
    return res && res.data || [];
}

export const updateOrganization = (id, data) => async dispatch => {
    const res = await service.updateOrganization(id, data);
    return res && res.data || [];
}

export const findOrganization = (id) => async dispatch => {
    const res = await service.findOrganization(id);
    return res && res.data || [];
}

export const listOrganizations = (term) => async dispatch => {
    const res = await service.listOrganizations(term);
    return res && res.data || [];
}

export const listOWithUsersCount = (term) => async dispatch => {
    const res = await service.listOWithUsersCount(term);
    return res && res.data || [];
}

export const deleteOrganization = (id) => async dispatch => {
    const res = await service.deleteOrganization(id);
    return res && res.data || [];
}

export const deleteImageOrganization = (imageLink,id) => async dispatch => {
    const res = await service.deleteImageOrganization(imageLink,id);
    return res && res.data || [];
}