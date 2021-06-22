import NotificationViewService from 'services/api/class NotificationViewService';

const notificationViewService = new NotificationViewService()

export const createNotificationView = (data) => async dispatch => {
    const res = await notificationViewService.createNotificationView(data);
    return res && res.data || [];
}

export const updateNotificationView = (idUsuario, idNotification) => async dispatch => {
    const res = await notificationViewService.updateNotificationView(idUsuario, idNotification);
    return res && res.data || [];
}

export const listNotificationView = (idNotification) => async dispatch => {
    const res = await notificationViewService.listNotificationView(idNotification);
    return res && res.data || [];
}