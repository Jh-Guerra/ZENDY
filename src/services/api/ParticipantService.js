import axios from 'axios';
import config from "../../config/Config";

class ParticipantService {
    
    async createParticipant(data) {
        return await axios.post(
            config.apiVersion + `registerParticipant`, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async updateParticipant(idChat, data) {
        return await axios.post(
            config.apiVersion + `Participant/update/` + idChat, 
            data,
            { 
                headers: config.headers 
            }
    )}

    async findParticipant(idUser) {
        return await axios.get(
            config.apiVersion + `Participant/find/` + idUser,
            { 
                headers: config.headers
            }
    )}

    async listParticipant(idChat) {
        return await axios.get(
            config.apiVersion + `Participant/list` + idChat,
            { 
                headers: config.headers
            }
    )}

    async deleteParticipant(idUser,idChat) {
        return await axios.delete(
            config.apiVersion + `Participant/delete/`,
            { 
                headers: {...config.headers},
                params: {
                    idUser: idUser,
                    idChat: idChat
                }
            }
    )}
   
}

export default ParticipantService;