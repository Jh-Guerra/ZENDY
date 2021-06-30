import ErrorService from "services/api/ErrorService";

const errorService = new ErrorService()

export const createError = (data) => async dispatch => {
    const res = await errorService.createError(data);
    return res && res.data || [];
}

export const updateError = (id, data) => async dispatch => {
    const res = await errorService.updateError(id, data);
    return res && res.data || [];
}

export const findError = (id) => async dispatch => {
    const res = await errorService.findError(id);
    return res && res.data || [];
}

export const listError = () => async dispatch => {
    const res = await errorService.listErrors();
    return res && res.data || [];
}

export const deleteError = (id) => async dispatch => {
    const res = await errorService.deleteError(id);
    return res && res.data || [];
}