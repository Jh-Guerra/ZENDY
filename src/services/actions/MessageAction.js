import MessageService from "services/api/MessageService";
import { showBackdrop } from "./CustomAction";

const messageService = new MessageService();

export const createMessage = (data) => async dispatch => {
    const res = await messageService.createMessage(data);
    return res && res.data || [];
}

export const findMessage = (idChat, idUser) => async dispatch => {
    const res = await messageService.findMessage(idChat, idUser);
    return res && res.data || [];
}

export const listMessage = (idChat) => async dispatch => {
    const res = await messageService.listMessage(idChat);
    return res && res.data || [];
}

export const deleteMessage = (idChat, idUser) => async dispatch => {
    const res = await messageService.deleteMessage(idChat, idUser);
    return res && res.data || [];
}