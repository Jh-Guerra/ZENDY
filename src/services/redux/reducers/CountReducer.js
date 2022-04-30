import { 
    NUM_CONSULTAS_PENDIENTES,
    NUM_MENSAJES_CHATS,
    NUM_CONSULTAS,
    STATUS_PUSHER,
    ID_CHATS
 } from '../common/Types'

 const initialState = {
    count_queries_slopes: 0,
    count_chats:0,
    count_queries_actives:0,
    active_pusher: true,
    id_chats: 0,
 }

export default function (state = initialState, action) {
    switch (action.type) {
        case NUM_CONSULTAS_PENDIENTES:
            return {
                ...state,
                count_queries_slopes: action.payload
            }
        case NUM_MENSAJES_CHATS:
            return {
                ...state,
                count_chats: action.payload
            }
        case NUM_CONSULTAS:
            return {
                ...state,
                count_queries_actives: action.payload
            }
        case STATUS_PUSHER:
            return {
                ...state,
                active_pusher: action.payload
            }
        case ID_CHATS:
            return {
                ...state,
                id_chats: action.payload
            }
        default:
            return state;
    }
 }