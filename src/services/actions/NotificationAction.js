import NotificationService from "services/api/NotificationService";
import { NOTIFICATIONS } from "services/redux/common/Types";

const service = new NotificationService();

export const createCompanyNotification = (data) => async dispatch => {
    const res = await service.createCompanyNotification(data);
    return res && res.data;
}

export const createCompaniesNotification = (data) => async dispatch => {
    const res = await service.createCompaniesNotification(data);
    return res && res.data;
}

export const updateNotification = (id, data) => async dispatch => {
    const res = await service.updateNotification(id, data);
    return res && res.data;
}

export const updateListUsersNotified = (id, data) => async dispatch => {
    const res = await service.updateListUsersNotified(id, data);
    return res && res.data;
}

export const findNotification = (id) => async dispatch => {
    const res = await service.findNotification(id);
    return res && res.data;
}

export const listAdminNotifications = (term) => async dispatch => {
    const res = await service.listAdminNotifications(term);
    dispatch({
        type: NOTIFICATIONS,
        payload: res && res.data || []
    })
    return res && res.data || [];
}

export const listNotificationsByCompany = (term) => async dispatch => {
    const res = await service.listNotificationsByCompany(term);
    dispatch({
        type: NOTIFICATIONS,
        payload: res && res.data || []
    })
    return res && res.data || [];
}

export const listNotificationsByUser = (term) => async dispatch => {
    const res = await service.listNotificationsByUser(term);
    dispatch({
        type: NOTIFICATIONS,
        payload: res && res.data || []
    })
    return res && res.data || [];
}

export const deleteNotification = (id) => async dispatch => {
    const res = await service.deleteNotification(id);
    return res && res.data;
}

export const deleteImageNotification = (imageLink,id) => async dispatch => {
    const res = await service.deleteImage(imageLink,id);
    return res && res.data || [];
}

export const updateListCompaniesNotified = (id, data) => async dispatch => {
    const res = await service.updateListCompaniesNotified(id, data);
    return res && res.data;
}
