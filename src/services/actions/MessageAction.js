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

export const listMessages = (idChat, term) => async dispatch => {
    const res = await messageService.listMessages(idChat, term);
    return res && res.data || [];
}

export const deleteMessage = (idChat) => async dispatch => {
    const res = await messageService.deleteMessage(idChat);
    return res && res.data || [];
}