import { showBackdrop } from "./CustomAction";
import { CURRENT_CHAT } from "services/redux/common/Types"
import ChatService from "services/api/ChatService";

const service = new ChatService();

export const updateActiveChats = payload => ({
    type: CURRENT_CHAT,
    payload: payload
})

export const listActiveChats = (term, status, isQuery) => async dispatch => {
    const res = await service.listActiveChats(term, status, isQuery);
    dispatch(updateActiveChats(res.data));
    return res && res.data || [];
}

export const createClientChat = (users) => async dispatch => {
    const res = await service.createClientChat(users);
    return res && res.data || [];
}

export const createCompanyChat = (users, company, allChecked) => async dispatch => {
    const res = await service.createCompanyChat(users, company, allChecked);
    return res && res.data || [];
}

export const createInternalChat = (users) => async dispatch => {
    const res = await service.createInternalChat(users);
    return res && res.data || [];
}

export const findChat = (id) => async dispatch => {
    const res = await service.findChat(id);
    return res && res.data || [];
}

export const findImages = (id) => async dispatch => {
    const res = await service.findImages(id);
    return res && res.data || [];
}

export const deleteChat = (id) => async dispatch => {
    const res = await service.deleteChat(id);
    return res && res.data || [];
}

export const finalizeChat = (idChat, data) => async dispatch => {
    const res = await service.finalizeChat(idChat, data);
    return res && res.data || [];
}

export const nameChatAction = (idChat, data) => async dispatch => {
    const res = await service.nameChat(idChat, data);
    return res && res.data || [];
}

export const listAvailableUsersByCompany = (roles, term) => async dispatch => {
    const res = await service.listAvailableUsersByCompany(roles, term);
    return res && res.data || [];
}

export const listFinalizeChats = (term, fromDate, toDate, isQuery) => async dispatch => {
    const res = await service.listFinalizeChats(term, fromDate, toDate, isQuery);
    return res && res.data || [];
}

export const listUserHD = () => async dispatch => {
    const res = await service.listUserHD();
    return res && res.data || [];
}

export const searchlistFinalize = (term, fromDate, toDate, isQuery, id , isHelpDesk) => async dispatch => {
    const res = await service.searchlistFinalize(term, fromDate, toDate, isQuery, id , isHelpDesk);
    return res && res.data || [];
}