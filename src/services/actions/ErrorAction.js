import ErrorService from "services/api/ErrorService";

const errorService = new ErrorService();

export const createError = (data) => async dispatch => {
    const res = await errorService.createError(data);
    return res && res.data || [];
}

export const findError = (id) => async dispatch => {
    const res = await errorService.findError(id);
    return res && res.data || [];
}

export const listErrors = (term) => async dispatch => {
    const res = await errorService.listErrors(term);
    return res && res.data || [];
}

export const listErrorsByUser = (term) => async dispatch => {
    const res = await errorService.listErrorsByUser(term);
    return res && res.data || [];
}

export const deleteError = (id) => async dispatch => {
    const res = await errorService.deleteError(id);
    return res && res.data || [];
}