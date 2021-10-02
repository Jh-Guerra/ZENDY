import ErrorService from "services/api/ErrorService";
import { ERROR } from "services/redux/common/Types";
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

export const confirmError = (id) => async dispatch => {
    const res = await service.confirmError(id);
    return res && res.data || [];
}

export const errorSolved = (id) => async dispatch => {
    const res = await service.errorSolved(id);
    return res && res.data || [];
}

export const updateError = (id, data) => async dispatch => {
    const res = await service.updateError(id, data);
    return res && res.data || [];
}

export const listErrors = (term) => async dispatch => {
    const res = await service.listErrors(term);
    dispatch({
        type: ERROR,
        payload: res.data
    })
    return res && res.data || [];
}

export const listErrorsByUser = (term) => async dispatch => {
    const res = await service.listErrorsByUser(term);
    dispatch({
        type: ERROR,
        payload: res.data
    })
    return res && res.data || [];
}

export const fakeError = (id) => async dispatch => {
    const res = await service.fakeError(id);
    return res && res.data || [];
}

export const deleteError = (id) => async dispatch => {
    const res = await service.deleteError(id);
    return res && res.data || [];
}

export const deleteImage = (imageLink,id) => async dispatch => {
    const res = await service.deleteImage(imageLink,id);
    return res && res.data || [];
}