import axios from '../../utils/axios';
import config from "../../config/Config";
import { defaultHeaders, getCustomUrl } from 'utils/common';

const apiPrefix = config.apiVersion + "participants";

class ParticipantService {

    async createParticipant(idChat, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/register/${idChat}`), data, defaultHeaders());
    }

    async updateParticipant(idChat, data) {
        return await axios.post( getCustomUrl(apiPrefix, `/update/${idChat}`), data, defaultHeaders());
    }

    async updateParticipant(idUser) {
        return await axios.get( getCustomUrl(apiPrefix, `/find/${idUser}`), defaultHeaders());
    }

    async listParticipant(idChat) {
        return await axios.get( getCustomUrl(apiPrefix, `/list/${idChat}`), defaultHeaders());
    }

    async deleteParticipant(data) {
        return await axios.post( getCustomUrl(apiPrefix, `/delete`), data, defaultHeaders());
    }

    async resetPendingMessages(idChat) {
        return await axios.post( getCustomUrl(apiPrefix, `/reset-pending-messages/${idChat}`), {}, defaultHeaders());
    }
   
}

export default ParticipantService;