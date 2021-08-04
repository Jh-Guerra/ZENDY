import ChatService from "services/api/ChatService";


const chatService = new ChatService()

export const createChat = (data) => async dispatch => {
    const res = await chatService.createChat(data);
    return res && res.data || [];
}

// CHAT - CLIENT ..................................................
export const createClientChat = (users) => async dispatch => {
    const res = await chatService.createClientChat(users);
    return res && res.data || [];
}

export const listClientChats = (term) => async dispatch => {
    const res = await chatService.listClientChats(term);
    return res && res.data || [];
}

// CHAT - COMPANY ..................................................
export const createCompanyChat = (userIds, companyId, allChecked) => async dispatch => {
    const res = await chatService.createCompanyChat(userIds, companyId, allChecked);
    return res && res.data || [];
}

// export const listClientChats = (term) => async dispatch => {
//     const res = await chatService.listClientChats(term);
//     return res && res.data || [];
// }


export const updateChat = (id, data) => async dispatch => {
    const res = await chatService.updateChat(id, data);
    return res && res.data || [];
}

export const findChat = (id) => async dispatch => {
    const res = await chatService.findChat(id);
    return res && res.data || [];
}

export const listChats = () => async dispatch => {
    const res = await chatService.listChats();
    return res && res.data || [];
}

export const deleteChat = (id) => async dispatch => {
    const res = await chatService.deleteChat(id);
    return res && res.data || [];
}