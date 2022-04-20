import { showBackdrop } from "./CustomAction";
import { NUM_CONSULTAS_PENDIENTES,NUM_MENSAJES_CHATS , NUM_CONSULTAS, STATUS_PUSHER,ID_CHATS} from "services/redux/common/Types"

export const count_queries_slopes = (count_queries_slopes) => async dispatch => {
    dispatch({
        type: NUM_CONSULTAS_PENDIENTES,
        payload: count_queries_slopes
    })
}

export const count_chats = (count_chats) => async dispatch => {
    dispatch({
        type: NUM_MENSAJES_CHATS,
        payload: count_chats
    })
}

export const count_queries_actives = (count_queries_actives) => async dispatch => {
    dispatch({
        type: NUM_CONSULTAS,
        payload: count_queries_actives
    })
}

export const active_pusher = (status) => async dispatch => {
    dispatch({
        type: STATUS_PUSHER,
        payload: status
    })
}

export const id_chats = (id_chats) => async dispatch => {
    dispatch({
        type: ID_CHATS,
        payload: id_chats
    })
}

// export const listActiveChats = (term, status, isQuery) => async dispatch => {
//     const res = await service.listActiveChats(term, status, isQuery);
//     dispatch(updateActiveChats(res.data));
//     return res && res.data || [];
// }