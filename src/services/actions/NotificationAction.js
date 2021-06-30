import NotificationService from "services/api/NotificationService";

const notificationService = new NotificationService();

export const createNotification = (data) => async => {
    const res = await notificationService.createNotification(data);
    return res && res.data || [];
}

export const updateNotification = (idNotification, idUser, idError, data) => async => {
    const res = await notificationService.updateNotification(idNotification, idUser, idError, data);
    return res && res.data || [];
}

export const findNotification = (idNotification) => async => {
    const res = await notificationService.findNotification(idNotification);
    return res && res.data || [];
}

export const listNotification = () => async => {
    const res = await notificationService.listNotification();
    return res && res.data || [];
}