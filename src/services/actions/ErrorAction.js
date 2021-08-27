import ErrorService from "services/api/ErrorService";
import { showBackdrop } from "./CustomAction";

const service = new ErrorService();

export const createError = (data) => async dispatch => {
    const res = await service.createError(data);
    return res && res.data || [];
}

export const findError = (id) => async dispatch => {
    const res = await service.findError(id);
    return res && res.data || [];
}

export const listErrors = (term) => async dispatch => {
    const res = await service.listErrors(term);
    return res && res.data || [];
}

export const listErrorsByUser = (term) => async dispatch => {
    const res = await service.listErrorsByUser(term);
    return res && res.data || [];
}

export const deleteError = (id) => async dispatch => {
    const res = await service.deleteError(id);
    return res && res.data || [];
}