import ParticipantService from 'services/api/ParticipantService';

const participantService = new ParticipantService()

export const createParticipant = (idChat, data) => async dispatch => {
    const res = await participantService.createParticipant(idChat, data);
    return res && res.data || [];
}

export const updateParticipant = (idChat, data) => async dispatch => {
    const res = await participantService.updateParticipant(idChat, data);
    return res && res.data || [];
}

export const findParticipant = (idUser) => async dispatch => {
    const res = await participantService.findParticipant(idUser);
    return res && res.data || [];
}

export const listParticipant = (idChat) => async dispatch => {
    const res = await participantService.listParticipant(idChat);
    return res && res.data || [];
}

export const deleteParticipant = (data) => async dispatch => {
    const res = await participantService.deleteParticipant(data);
    return res && res.data || [];
}

export const resetPendingMessages = (idChat) => async dispatch => {
    const res = await participantService.resetPendingMessages(idChat);
    return res && res.data || [];
}

export const syncUser = () => async dispatch => {
    const res = await participantService.syncUser();
    return res && res.data || [];
}
