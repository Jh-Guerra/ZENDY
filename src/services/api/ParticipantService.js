import axios from '../../utils/axios';
import config from "../../config/Config";

class ParticipantService {
    
    async createParticipant(idChat, data) {
        return await axios.post(
            config.apiVersion + `participants/register/` + idChat, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async updateParticipant(idChat, data) {
        return await axios.post(
            config.apiVersion + `participants/update/` + idChat, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async findParticipant(idUser) {
        return await axios.get(
            config.apiVersion + `participants/find/` + idUser,
            { 
                headers: config.headers
            }
    )}

    async listParticipant(idChat) {
        return await axios.get(
            config.apiVersion + `participants/list` + idChat,
            { 
                headers: config.headers
            }
    )}

    async deleteParticipant(data) {
        return await axios.post(
            config.apiVersion + `participants/delete/`,
            data,
            { 
                headers: {...config.headers}
            }
    )}

    async resetPendingMessages(idChat) {
        return await axios.post(
            config.apiVersion + `participants/reset-pending-messages/${idChat}`,
            {},
            { 
                headers: {...config.headers}
            }
    )}
   
}

export default ParticipantService;