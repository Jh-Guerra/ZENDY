import {
    NOTIFICATIONS_VIEWED
} from '../common/Types'

const initialState = {
    notificationsViewed: [],
}

export default function(state = initialState, action){
    switch(action.type){

        case NOTIFICATIONS_VIEWED:
            return {
                ...state,
                notificationsViewed: action.payload
            }
        default: return state
    }
}