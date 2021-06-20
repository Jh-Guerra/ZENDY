import ParticipantService from 'services/api/ParticipantService';

const participantService = new ParticipantService()

export const createParticipant = (data) => async dispatch => {
    const res = await participantService.createParticipant(data);
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

export const deleteParticipant = (idUser,idChat) => async dispatch => {
    const res = await participantService.deleteParticipant(idUser,idChat);
    return res && res.data || [];
}